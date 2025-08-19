import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getZeroheightConfig, type ZeroheightConfig } from "./zeroheight-config.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface ZeroheightPage {
  id: number;
  uid: string;
  name: string;
  slug: string;
  url: string;
  hidden: boolean;
  locked: boolean;
  created_at: string;
  updated_at: string;
  status?: {
    id: string;
    name: string;
  };
  introduction?: string;
  content?: string;
  tabs?: Array<{
    id: number;
    name: string;
    order: number;
    hidden: boolean;
    content: string;
  }>;
}

interface ZeroheightPagesResponse {
  data: {
    pages: ZeroheightPage[];
  };
}

interface ZeroheightPageResponse {
  data: {
    page: ZeroheightPage;
  };
}

interface PageGroup {
  baseName: string;
  pages: ZeroheightPage[];
  combinedContent: string;
}

class ZeroheightExporter {
  private config: ZeroheightConfig;
  private headers: Record<string, string>;
  private pageGroups: Map<string, PageGroup> = new Map();

  constructor() {
    this.config = getZeroheightConfig();
    this.headers = {
      'Accept': 'application/json',
      'X-API-KEY': this.config.apiKey,
      'X-API-CLIENT': this.config.apiClient
    };
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9\-_\s]/g, '').replace(/\s+/g, '-');
  }

  private processMarkdownContent(content: string): string {
    if (!content) return content;
    
    // Remove image markdown links (both ![alt](url) and ![alt](url "title") formats)
    // This removes images since Zeroheight image URLs are temporary (7-day expiry)
    const imageRegex = /!\[([^\]]*)\]\([^)]+\)/g;
    let processed = content.replace(imageRegex, '');
    
    // Convert regular markdown links to plain text (keep the link text, remove URL)
    // This removes noise and improves LLM readability since most links won't be accessible anyway
    const linkRegex = /\[([^\]]+)\]\([^)]+\)/g;
    processed = processed.replace(linkRegex, '$1');
    
    return processed;
  }

  async fetchPages(): Promise<ZeroheightPage[]> {
    const url = `${this.config.baseUrl}/styleguides/${this.config.styleguideId}/pages`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.status} ${response.statusText}`);
      }

      const data: ZeroheightPagesResponse = await response.json();
      return data.data.pages;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  async fetchPageContent(pageId: number): Promise<ZeroheightPage> {
    const url = `${this.config.baseUrl}/pages/${pageId}?format=${this.config.format}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page ${pageId}: ${response.status} ${response.statusText}`);
      }

      const data: ZeroheightPageResponse = await response.json();
      return data.data.page;
    } catch (error) {
      console.error(`Error fetching page ${pageId}:`, error);
      throw error;
    }
  }

  private getBaseName(pageName: string): string {
    return this.sanitizeFilename(pageName);
  }

  private hasMinimalContent(page: ZeroheightPage): boolean {
    // Calculate total content length (excluding frontmatter)
    let totalContent = '';
    
    // Add introduction
    if (page.introduction?.trim()) {
      totalContent += this.processMarkdownContent(page.introduction);
    }
    
    // Add tab content or main content
    if (page.tabs && page.tabs.length > 0) {
      const visibleTabs = page.tabs.filter(tab => !tab.hidden);
      for (const tab of visibleTabs) {
        if (tab.content?.trim()) {
          totalContent += this.processMarkdownContent(tab.content);
        }
      }
    } else if (page.content?.trim()) {
      totalContent += this.processMarkdownContent(page.content);
    }
    
    // Remove whitespace and count meaningful characters
    const meaningfulContent = totalContent
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .replace(/#+\s*/g, '')  // Remove markdown headers
      .trim();
    
    // Skip if content is too short (less than 50 characters of meaningful content)
    return meaningfulContent.length < 50;
  }

  private formatSinglePageContent(page: ZeroheightPage, includeTitle: boolean = true): string {
    let content = '';
    
    // Add page title only if requested (for merged content we might skip it)
    if (includeTitle) {
      content += `# ${page.name}\n\n`;
    }
    
    // Add introduction if present
    if (page.introduction && page.introduction.trim()) {
      const processedIntro = this.processMarkdownContent(page.introduction);
      content += `${processedIntro}\n\n`;
    }
    
    // Handle pages with tabs
    if (page.tabs && page.tabs.length > 0) {
      page.tabs
        .filter(tab => !tab.hidden)
        .sort((a, b) => a.order - b.order)
        .forEach(tab => {
          content += `## ${tab.name}\n\n`;
          if (tab.content && tab.content.trim()) {
            const processedContent = this.processMarkdownContent(tab.content);
            content += `${processedContent}\n\n`;
          }
        });
    } else if (page.content && page.content.trim()) {
      // Handle pages without tabs
      const processedContent = this.processMarkdownContent(page.content);
      content += `${processedContent}\n\n`;
    }
    
    return content;
  }

  private formatCombinedPageContent(pageGroup: PageGroup): string {
    let content = '';
    
    // Sort pages by creation date to maintain some order
    const sortedPages = pageGroup.pages.sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    
    // Use the first page for frontmatter metadata
    const primaryPage = sortedPages[0];
    
    // Add YAML frontmatter
    content += '---\n';
    content += `title: "${primaryPage.name}"\n`;
    content += `combined_from_ids: [${sortedPages.map(p => p.id).join(', ')}]\n`;
    content += `primary_id: ${primaryPage.id}\n`;
    content += `slug: "${primaryPage.slug}"\n`;
    content += `url: "${primaryPage.url}"\n`;
    content += `created_at: "${primaryPage.created_at}"\n`;
    content += `updated_at: "${Math.max(...sortedPages.map(p => new Date(p.updated_at).getTime()))}"\n`;
    if (primaryPage.status) {
      content += `status_id: "${primaryPage.status.id}"\n`;
      content += `status_name: "${primaryPage.status.name}"\n`;
    }
    content += '---\n\n';
    
    // Add main title
    content += `# ${primaryPage.name}\n\n`;
    
    // Add content from all pages
    sortedPages.forEach((page, index) => {
      if (index > 0) {
        // Add separator between different page versions
        content += `---\n\n`;
      }
      
      // Add the page content without title (since we already have main title)
      const pageContent = this.formatSinglePageContent(page, false);
      if (pageContent.trim()) {
        content += pageContent;
      }
    });
    
    return content;
  }

  private async processPage(page: ZeroheightPage): Promise<void> {
    console.log(`Processing page: ${page.name} (ID: ${page.id})`);
    
    try {
      // Fetch full page content
      const fullPage = await this.fetchPageContent(page.id);
      
      // Skip pages with minimal content
      if (this.hasMinimalContent(fullPage)) {
        console.log(`  ↳ Skipped (minimal content): ${page.name}`);
        return;
      }
      
      // Group by base name
      const baseName = this.getBaseName(page.name);
      
      if (!this.pageGroups.has(baseName)) {
        this.pageGroups.set(baseName, {
          baseName,
          pages: [],
          combinedContent: ''
        });
      }
      
      this.pageGroups.get(baseName)!.pages.push(fullPage);
      console.log(`  ↳ Added to group: ${baseName}`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`  ✗ Failed to process ${page.name}:`, errorMessage);
    }
  }

  private async exportPageGroup(pageGroup: PageGroup): Promise<{ success: boolean; fileName?: string; error?: string }> {
    try {
      const fileName = `${pageGroup.baseName}.md`;
      const filePath = path.join(dirname, '../', this.config.outputDir, fileName);
      
      // Generate combined content
      const content = this.formatCombinedPageContent(pageGroup);
      
      // Write file
      fs.writeFileSync(filePath, content, 'utf8');
      
      const pageCount = pageGroup.pages.length;
      const pageInfo = pageCount > 1 ? ` (combined ${pageCount} pages)` : '';
      console.log(`✓ Exported: ${fileName}${pageInfo}`);
      
      return { success: true, fileName };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`✗ Failed to export ${pageGroup.baseName}:`, errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  private async generateIndex(successfulExports: Array<{ fileName: string }>): Promise<void> {
    const totalPagesCombined = Array.from(this.pageGroups.values()).reduce((sum, group) => sum + group.pages.length, 0);
    
    const indexContent = `# Exported Zeroheight Pages

Generated on: ${new Date().toISOString()}
Styleguide ID: ${this.config.styleguideId}
Total files exported: ${successfulExports.length}
Total pages combined: ${totalPagesCombined}

## Files

${successfulExports.map(exp => `- [${exp.fileName}](./${exp.fileName})`).join('\n')}

## Combination Summary

${Array.from(this.pageGroups.values())
  .map(group => `- **${group.baseName}.md**: ${group.pages.length} page${group.pages.length > 1 ? 's' : ''} combined`)
  .join('\n')}
`;
    
    const indexPath = path.join(dirname, '../', this.config.outputDir, 'README.md');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('✓ Generated index file: README.md');
  }

  async exportAll(): Promise<void> {
    console.log('Starting Zeroheight pages export with deduplication...\n');
    
    try {
      // Clear and recreate output directory
      const outputPath = path.join(dirname, '../', this.config.outputDir);
      if (fs.existsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true, force: true });
        console.log('✓ Cleared existing export directory');
      }
      fs.mkdirSync(outputPath, { recursive: true });
      console.log('✓ Created fresh export directory');
      
      // Fetch all pages
      console.log('Fetching pages list...');
      const pages = await this.fetchPages();
      console.log(`Found ${pages.length} pages\n`);
      
      // Process each page (group by name, filter minimal content)
      console.log('Processing pages...');
      for (const page of pages) {
        if (!page.hidden) { // Only process visible pages
          await this.processPage(page);
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          console.log(`Skipping hidden page: ${page.name}`);
        }
      }
      
      console.log(`\n✓ Grouped into ${this.pageGroups.size} unique page groups`);
      
      // Export combined page groups
      console.log('\nExporting combined files...');
      const results: Array<{ success: boolean; fileName?: string; error?: string }> = [];
      
      for (const pageGroup of this.pageGroups.values()) {
        const result = await this.exportPageGroup(pageGroup);
        results.push(result);
      }
      
      // Generate summary
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);
      const totalPagesProcessed = Array.from(this.pageGroups.values()).reduce((sum, group) => sum + group.pages.length, 0);
      
      console.log('\n' + '='.repeat(50));
      console.log(`Export Summary:`);
      console.log(`📄 Total pages processed: ${totalPagesProcessed}`);
      console.log(`📁 Files created: ${successful.length}`);
      console.log(`✗ Failed exports: ${failed.length}`);
      console.log(`📁 Output directory: ${outputPath}`);
      
      if (failed.length > 0) {
        console.log('\nFailed exports:');
        failed.forEach(r => {
          console.log(`  - ${r.error}`);
        });
      }
      
      // Generate index file
      if (successful.length > 0) {
        await this.generateIndex(successful);
      }
      
    } catch (error) {
      console.error('Export failed:', error);
      process.exit(1);
    }
  }
}

// Run the export
if (import.meta.url === `file://${filename}`) {
  const exporter = new ZeroheightExporter();
  exporter.exportAll().catch(console.error);
}
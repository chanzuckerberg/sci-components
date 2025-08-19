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

class ZeroheightExporter {
  private config: ZeroheightConfig;
  private headers: Record<string, string>;
  private usedFilenames: Set<string> = new Set();

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
    return content.replace(imageRegex, '');
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

  generateFileName(pageName: string): string {
    const sanitized = this.sanitizeFilename(pageName);
    let fileName = `${sanitized}.md`;
    let counter = 1;
    
    // Handle duplicate filenames by appending -1, -2, etc.
    while (this.usedFilenames.has(fileName)) {
      fileName = `${sanitized}-${counter}.md`;
      counter++;
    }
    
    this.usedFilenames.add(fileName);
    return fileName;
  }

  formatPageContent(page: ZeroheightPage): string {
    let content = '';
    
    // Add YAML frontmatter
    content += '---\n';
    content += `title: "${page.name}"\n`;
    content += `id: ${page.id}\n`;
    content += `uid: "${page.uid}"\n`;
    content += `slug: "${page.slug}"\n`;
    content += `url: "${page.url}"\n`;
    content += `hidden: ${page.hidden}\n`;
    content += `locked: ${page.locked}\n`;
    content += `created_at: "${page.created_at}"\n`;
    content += `updated_at: "${page.updated_at}"\n`;
    if (page.status) {
      content += `status_id: "${page.status.id}"\n`;
      content += `status_name: "${page.status.name}"\n`;
    }
    content += '---\n\n';
    
    // Add page title
    content += `# ${page.name}\n\n`;
    
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

  async exportPage(page: ZeroheightPage): Promise<{ success: boolean; fileName?: string; pageId: number; error?: string }> {
    console.log(`Exporting page: ${page.name} (ID: ${page.id})`);
    
    try {
      // Fetch full page content
      const fullPage = await this.fetchPageContent(page.id);
      
      // Generate content
      const content = this.formatPageContent(fullPage);
      
      // Generate filename
      const fileName = this.generateFileName(page.name);
      const filePath = path.join(dirname, '../', this.config.outputDir, fileName);
      
      // Write file
      fs.writeFileSync(filePath, content, 'utf8');
      
      console.log(`✓ Exported: ${fileName}`);
      return { success: true, fileName, pageId: page.id };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`✗ Failed to export ${page.name}:`, errorMessage);
      return { success: false, pageId: page.id, error: errorMessage };
    }
  }

  async generateIndex(successfulExports: Array<{ fileName: string; pageId: number }>): Promise<void> {
    const indexContent = `# Exported Zeroheight Pages

Generated on: ${new Date().toISOString()}
Styleguide ID: ${this.config.styleguideId}
Total pages exported: ${successfulExports.length}

## Files

${successfulExports.map(exp => `- [${exp.fileName}](./${exp.fileName})`).join('\n')}
`;
    
    const indexPath = path.join(dirname, '../', this.config.outputDir, 'README.md');
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('✓ Generated index file: README.md');
  }

  async exportAll(): Promise<void> {
    console.log('Starting Zeroheight pages export...\n');
    
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
      
      // Export each page
      const results: Array<{ success: boolean; fileName?: string; pageId: number; error?: string }> = [];
      for (const page of pages) {
        if (!page.hidden) { // Only export visible pages
          const result = await this.exportPage(page);
          results.push(result);
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } else {
          console.log(`Skipping hidden page: ${page.name}`);
        }
      }
      
      // Generate summary
      const successful = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);
      
      console.log('\n' + '='.repeat(50));
      console.log(`Export Summary:`);
      console.log(`✓ Successful: ${successful.length}`);
      console.log(`✗ Failed: ${failed.length}`);
      console.log(`📁 Output directory: ${outputPath}`);
      
      if (failed.length > 0) {
        console.log('\nFailed exports:');
        failed.forEach(r => {
          console.log(`  - Page ID ${r.pageId}: ${r.error}`);
        });
      }
      
      // Generate index file
      if (successful.length > 0) {
        await this.generateIndex(successful.map(r => ({ fileName: r.fileName!, pageId: r.pageId })));
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
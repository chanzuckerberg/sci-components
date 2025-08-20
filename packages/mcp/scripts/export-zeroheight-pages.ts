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

interface CachedPage {
  page: ZeroheightPage;
  cachedAt: string;
  lastUpdated: string;
}

interface CacheData {
  pages: Record<number, CachedPage>;
  lastFetch: string;
}

class ZeroheightExporter {
  private config: ZeroheightConfig;
  private headers: Record<string, string>;
  private pageGroups: Map<string, PageGroup> = new Map();
  private cacheFilePath: string;
  private cache: CacheData;

  constructor() {
    this.config = getZeroheightConfig();
    this.headers = {
      'Accept': 'application/json',
      'X-API-KEY': this.config.apiKey,
      'X-API-CLIENT': this.config.apiClient
    };
    this.cacheFilePath = path.join(dirname, '../data/zeroheight-cache.json');
    this.cache = this.loadCache();
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9\-_\s]/g, '').replace(/\s+/g, '-');
  }

  private loadCache(): CacheData {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const cacheContent = fs.readFileSync(this.cacheFilePath, 'utf8');
        const cache = JSON.parse(cacheContent) as CacheData;
        console.log(`✓ Loaded cache with ${Object.keys(cache.pages).length} pages (last fetch: ${cache.lastFetch})`);
        return cache;
      }
    } catch (error) {
      console.warn('⚠️  Could not load cache, starting fresh');
    }
    
    return {
      pages: {},
      lastFetch: ''
    };
  }

  private saveCache(): void {
    try {
      // Update last fetch time only when we actually save new data
      this.cache.lastFetch = new Date().toISOString();
      
      // Ensure data directory exists
      const dataDir = path.dirname(this.cacheFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.cache, null, 2));
      console.log(`✓ Saved cache with ${Object.keys(this.cache.pages).length} pages`);
    } catch (error) {
      console.warn('⚠️  Could not save cache:', error);
    }
  }

  private isPageCacheValid(pageId: number, lastUpdated: string): boolean {
    const cachedPage = this.cache.pages[pageId];
    if (!cachedPage) return false;
    
    // Check if the page was updated after we cached it
    const cacheTime = new Date(cachedPage.cachedAt).getTime();
    const updateTime = new Date(lastUpdated).getTime();
    
    return updateTime <= cacheTime;
  }

  private processMarkdownContent(content: string): string {
    if (!content) return content;
    
    // Remove image markdown links (both ![alt](url) and ![alt](url "title") formats)
    // This removes images since Zeroheight image URLs are temporary (7-day expiry)
    const imageRegex = /!\[([^\]]*)\]\([^)]+\)/g;
    let processed = content.replace(imageRegex, '');
    
    // Convert regular markdown links to plain text (keep the link text, remove URL)
    // This removes noise and improves LLM readability since the AI will most likely
    // not fetch the URL anyway (and should call the tool)
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

  async fetchPageContent(pageId: number, lastUpdated: string): Promise<ZeroheightPage> {
    // Check if we have a valid cached version
    if (this.isPageCacheValid(pageId, lastUpdated)) {
      console.log(`  ↳ Using cached version of page ${pageId}`);
      return this.cache.pages[pageId].page;
    }

    const url = `${this.config.baseUrl}/pages/${pageId}?format=${this.config.format}`;
    
    try {
      console.log(`  ↳ Fetching fresh data for page ${pageId}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page ${pageId}: ${response.status} ${response.statusText}`);
      }

      const data: ZeroheightPageResponse = await response.json();
      const page = data.data.page;
      
      // Cache the page
      this.cache.pages[pageId] = {
        page,
        cachedAt: new Date().toISOString(),
        lastUpdated
      };
      
      return page;
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
    
    // Use the first page for main title
    const primaryPage = sortedPages[0];
    
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
      // Fetch full page content (with caching)
      const fullPage = await this.fetchPageContent(page.id, page.updated_at);
      
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
      
      // Hardcoded fixes: Merge plural versions with singular versions (to avoid separate files)
      // As of 2025-08-20, these pairs contain related content that should be combined
      const mergePairs = [
        { plural: 'Tables', singular: 'Table' },
        { plural: 'Accordions', singular: 'Accordion' },
        { plural: 'Banners', singular: 'Banner' },
        { plural: 'Callouts', singular: 'Callout' },
        { plural: 'Dialogs', singular: 'Dialog' },
        { plural: 'Dropdown-Inputs', singular: 'Dropdown-Input' },
        { plural: 'Dropdown-Menus', singular: 'Dropdown-Menu' },
        { plural: 'Loading-Indicators', singular: 'Loading-Indicator' },
        { plural: 'Notifications', singular: 'Notification' },
        { plural: 'Panels', singular: 'Panel' }
      ];
      
      const mergePair = mergePairs.find(pair => 
        pageGroup.baseName === pair.plural && this.pageGroups.has(pair.singular)
      );
      
      if (mergePair) {
        // Merge plural content into the singular group
        const singularGroup = this.pageGroups.get(mergePair.singular)!;
        singularGroup.pages.push(...pageGroup.pages);
        console.log(`🔗 Merging ${pageGroup.baseName} content into ${mergePair.singular}.md`);
        return { success: true, fileName: `${mergePair.singular}.md`, error: 'Merged content' };
      }
      
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

  /**
   * Maps a component name to the corresponding Zeroheight file using manual mapping
   */
  private mapComponentToFile(componentName: string): string | null {
    const exportedFiles = Array.from(this.pageGroups.keys());
    
    // Manual mapping of component names to Zeroheight file names
    const componentToFileMap: Record<string, string> = {
      // Button components
      'Button': 'Buttons',
      'ButtonDropdown': 'Buttons', 
      'ButtonIcon': 'Buttons',
      'ButtonToggle': 'Buttons',
      
      // Table components
      'TableHeader': 'Table',
      'TableRow': 'Table',
      
      // Input components
      'InputCheckbox': 'Control-Inputs',
      'InputRadio': 'Control-Inputs',
      'InputToggle': 'Control-Inputs',
      'InputText': 'Field-Inputs',
      'InputDropdown': 'Dropdown-Input',
      'InputSearch': 'Search-Input',
      'InputSlider': 'Control-Inputs',
      
      // Dropdown components
      'Dropdown': 'Dropdown-Menu',
      'DropdownMenu': 'Dropdown-Menu',
      
      // Content components
      'ContentCard': 'Content-Card',
      'LoadingIndicator': 'Loading-Indicator',
      
      // Navigation components
      'NavigationFooter': 'Navigation',
      'NavigationHeader': 'Navigation',
      'NavigationJumpTo': 'Navigation',
      
      // Control components
      'SegmentedControl': 'Segmented-Control',
      
      // List and menu components
      'List': 'Lists',
      'Menu': 'Dropdown-Menu',
      'MenuItem': 'Dropdown-Menu',
      'MenuSelect': 'Dropdown-Menu',
      
      // Tag components
      'Tag': 'Tags',
      'TagFilter': 'Tags',
      
      // Tooltip components
      'Tooltip': 'Tooltips',
      'TooltipCondensed': 'Tooltips',
      'TooltipTable': 'Tooltips',
      
      // Table Cell components
      'CellBasic': 'Table',
      'CellComponent': 'Table', 
      'CellHeader': 'Table',
      
      // Filter components
      'ComplexFilter': 'Filters',
      
      // Other components
      'Icon': 'Icons',
      'Chip': 'Tags', // Chips are often similar to tags
      'Pagination': 'Navigation', // Pagination is often part of navigation
    };
    
    // Check manual mapping first
    const mappedFile = componentToFileMap[componentName];
    if (mappedFile && exportedFiles.includes(mappedFile)) {
      return `${mappedFile}.md`;
    }
    
    // Fallback to exact match only
    if (exportedFiles.includes(componentName)) {
      return `${componentName}.md`;
    }
    
    return null; // No match found
  }

  private async validateComponentAlignment(): Promise<void> {
    const componentListPath = path.join(dirname, '../data/component-list.json');
    
    try {
      const componentListData = fs.readFileSync(componentListPath, 'utf8');
      const componentList = JSON.parse(componentListData);
      const allComponents = [...componentList.components, ...componentList['data-viz']];
      
      console.log('\n🔍 Component Documentation Mapping:');
      
      let found = 0;
      let notFound = 0;
      
      allComponents.forEach(component => {
        const mappedFile = this.mapComponentToFile(component);
        if (mappedFile) {
          console.log(`✓ ${component} → ${mappedFile}`);
          found++;
        } else {
          console.log(`✗ ${component} → No documentation found`);
          notFound++;
        }
      });
      
      console.log(`\n📊 Documentation Coverage: ${found}/${allComponents.length} components have docs (${Math.round(found/allComponents.length*100)}%)`);
      
    } catch (error) {
      console.warn('⚠️  Could not validate component alignment:', error instanceof Error ? error.message : 'Unknown error');
    }
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
      let fetchCount = 0;
      let cacheHits = 0;
      
      for (const page of pages) {
        if (!page.hidden) { // Only process visible pages
          const wasCached = this.isPageCacheValid(page.id, page.updated_at);
          if (wasCached) cacheHits++;
          else fetchCount++;
          
          await this.processPage(page);
          
          // Add delay to avoid rate limiting (only for API calls)
          if (!wasCached) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } else {
          console.log(`Skipping hidden page: ${page.name}`);
        }
      }
      
      console.log(`\n📊 Cache Performance: ${cacheHits} cache hits, ${fetchCount} API calls`);
      
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
      const merged = successful.filter(r => r.error === 'Merged content');
      const exported = successful.filter(r => r.error !== 'Merged content');
      const failed = results.filter(r => !r.success);
      const totalPagesProcessed = Array.from(this.pageGroups.values()).reduce((sum, group) => sum + group.pages.length, 0);
      
      console.log('\n' + '='.repeat(50));
      console.log(`Export Summary:`);
      console.log(`📄 Total pages processed: ${totalPagesProcessed}`);
      console.log(`📁 Files created: ${exported.length}`);
      if (merged.length > 0) {
        console.log(`🔗 Content merged: ${merged.length} plural versions merged into singular files`);
      }
      if (failed.length > 0) {
        console.log(`✗ Failed exports: ${failed.length}`);
      }
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
      
      // Validate component alignment
      await this.validateComponentAlignment();
      
      // Save cache for next time
      this.saveCache();
      
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

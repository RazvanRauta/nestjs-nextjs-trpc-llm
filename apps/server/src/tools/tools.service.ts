import { Injectable } from '@nestjs/common';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@server/config/config.type';

@Injectable()
export class ToolsService {
  private readonly searchService: TavilySearchResults;
  private readonly LINKEDIN_REGEX =
    /^https:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const apiKey = this.configService.get('tools.tavilyApiKey', {
      infer: true,
    });

    this.searchService = new TavilySearchResults({ apiKey });
  }

  async getProfileUrlTavily(name: string): Promise<string> {
    //  Searches for a LinkedIn profile using Tavily
    const res = (await this.searchService.invoke(`${name}`)) as string;
    return res;
  }

  async testLinkedInProfileUrl(url: string): Promise<boolean> {
    //  Tests if a given URL is a LinkedIn profile URL
    await new Promise((resolve) => setTimeout(resolve, 0));
    return this.LINKEDIN_REGEX.test(url);
  }

  async cleanLinkedInUrl(url: string): Promise<string> {
    // Remove country code and trailing elements
    const match = url.match(/linkedin\.com\/in\/([A-z0-9_-]+)/);
    if (!match) return url;
    await new Promise((resolve) => setTimeout(resolve, 0));
    return `https://linkedin.com/in/${match[1]}`;
  }
}

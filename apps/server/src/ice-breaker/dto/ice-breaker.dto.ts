import { ScrapeResult } from '@server/linkedin/interfaces/scrape-result';
import { IsObject, IsString, ValidateNested } from 'class-validator';

export class IceBreakerDTO {
  @IsString()
  linkedinProfileUrl: string;

  @IsString()
  linkedInData: ScrapeResult['person'];

  @IsObject()
  @ValidateNested({
    each: true,
  })
  result: {
    summary: string;
    facts: string[];
  };
}

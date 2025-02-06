import { LinkedInProfile } from '@server/linkedin/scrape-profile.service';
import { IsObject, IsString, ValidateNested } from 'class-validator';

export class IceBreakerDTO {
  @IsString()
  linkedinProfileUrl: string;

  @IsString()
  linkedInData: LinkedInProfile;

  @IsObject()
  @ValidateNested({
    each: true,
  })
  result: {
    summary: string;
    facts: string[];
  };
}

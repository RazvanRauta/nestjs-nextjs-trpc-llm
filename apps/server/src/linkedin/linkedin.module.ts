import { Module } from '@nestjs/common';
import { ScrapeProfileService } from './scrape-profile.service';

@Module({
  providers: [ScrapeProfileService],
  exports: [ScrapeProfileService],
})
export class LinkedinModule {}

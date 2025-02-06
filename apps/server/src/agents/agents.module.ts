import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { ToolsModule } from '@server/tools/tools.module';

@Module({
  imports: [ToolsModule],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}

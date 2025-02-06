import { Module } from '@nestjs/common';
import { IceBreakerService } from './ice-breaker.service';
import { AgentsModule } from '@server/agents/agents.module';
import { LinkedinModule } from '@server/linkedin/linkedin.module';

@Module({
  imports: [AgentsModule, LinkedinModule],
  providers: [IceBreakerService],
  exports: [IceBreakerService],
})
export class IceBreakerModule {}

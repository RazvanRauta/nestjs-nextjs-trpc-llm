import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ToolsModule } from './tools/tools.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { ConfigModule } from '@nestjs/config';
import { AgentsModule } from './agents/agents.module';
import { IceBreakerModule } from './ice-breaker/ice-breaker.module';
import appConfig from './config/app.config';
import toolsConfig from './tools/config/tools.config';
import linkedinConfig from './linkedin/config/linkedin.config';
import openaiConfig from './openai/config/openai.config';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, toolsConfig, linkedinConfig, openaiConfig],
    }),
    CoreModule,
    ToolsModule,
    LinkedinModule,
    AgentsModule,
    IceBreakerModule,
    TrpcModule,
  ],
})
export class AppModule {}

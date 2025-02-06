import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { IceBreakerRouter } from '../ice-breaker/ice-breaker.router';
import { IceBreakerModule } from '@server/ice-breaker/ice-breaker.module';

@Module({
  imports: [IceBreakerModule],
  providers: [TrpcService, TrpcRouter, IceBreakerRouter],
})
export class TrpcModule {}

import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { IceBreakerRouter } from '../ice-breaker/ice-breaker.router';
import { IceBreakerModule } from '@server/ice-breaker/ice-breaker.module';
import { GetTextLengthRouter } from '@server/get-text-length/get-text-length.router';
import { GetTextLengthModule } from '@server/get-text-length/get-text-length.module';

@Module({
  imports: [IceBreakerModule, GetTextLengthModule],
  providers: [TrpcService, TrpcRouter, IceBreakerRouter, GetTextLengthRouter],
})
export class TrpcModule {}

import { Injectable } from '@nestjs/common';
import { IceBreakerService } from '@server/ice-breaker/ice-breaker.service';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';

@Injectable()
export class IceBreakerRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly iceBreakerService: IceBreakerService,
  ) {}

  get router() {
    if (!this.trpc) {
      throw new Error('trpc service not initialized');
    }

    return this.trpc.router({
      getIceBreaker: this.trpc.procedure
        .input(
          z.object({
            name: z.string(),
          }),
        )
        .query(async ({ input }) => {
          if (!input.name) {
            return null;
          }
          const res = await this.iceBreakerService.iceBreakWith(input.name);
          return res;
        }),
    });
  }
}

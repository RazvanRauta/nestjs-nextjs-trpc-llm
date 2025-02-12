import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import { GetTextLengthService } from './get-text-length.service';

@Injectable()
export class GetTextLengthRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly service: GetTextLengthService,
  ) {}

  get router() {
    if (!this.trpc) {
      throw new Error('trpc service not initialized');
    }

    return this.trpc.router({
      getTextLength: this.trpc.procedure
        .input(
          z.object({
            text: z.string(),
          }),
        )
        .query(async ({ input }) => {
          if (!input.text) {
            return null;
          }
          const res = await this.service.getTextLength(input.text);
          return res;
        }),
    });
  }
}

import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

@Injectable()
export class TrpcService {
  private readonly trpc;

  constructor() {
    this.trpc = initTRPC.context<CreateFastifyContextOptions>().create({
      transformer: superjson,
    });
  }

  get procedure() {
    return this.trpc.procedure;
  }

  get router() {
    return this.trpc.router;
  }

  get mergeRouters() {
    return this.trpc.mergeRouters;
  }
}

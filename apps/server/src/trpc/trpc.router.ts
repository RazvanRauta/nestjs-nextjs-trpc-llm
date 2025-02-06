import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import { FastifyInstance } from 'fastify';
import { createContext } from './context';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { IceBreakerRouter } from '@server/ice-breaker/ice-breaker.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly iceBreakerRouter: IceBreakerRouter,
  ) {}

  appRouter = this.trpc.router({
    iceBreaker: this.iceBreakerRouter.router,
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),
  });

  async applyMiddleware(app: INestApplication) {
    const fastifyApp = app.getHttpAdapter().getInstance() as FastifyInstance;

    await fastifyApp.register(fastifyTRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: {
        router: this.appRouter,
        createContext,
      },
    });
  }
}

export type AppRouter = TrpcRouter[`appRouter`];

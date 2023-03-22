import { PrismaClient } from '@prisma/client';

declare global {
  namespace globalThis {
    var prismadb: PrismaClient; // eslint-disable-line no-var
  }
}
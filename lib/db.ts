// Prisma Learning, do this before doing Prisma init, after add this, do Prisma init

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

/**
 * In production, Prisma only uses  --> export const db = new PrismaClient()
 * In development,  instead of create primsaclient everytime, we save (hotreload)
 *  it uses globalThis.prisma  for prismaClient, hotreload is not affected
 */

if (process.env.NODE_ENV !== "production") globalThis.prisma = db; // Nextjs hotreload will use the globalThis.prisma

// export const db = new PrismaClient(); it is for production

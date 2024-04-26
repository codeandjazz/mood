import { Pool, neonConfig } from '@neondatabase/serverless'

import { PrismaNeon } from '@prisma/adapter-neon'

import { PrismaClient } from '@prisma/client'

import dotenv from 'dotenv'

import ws from 'ws'

dotenv.config()

neonConfig.webSocketConstructor = ws

// Singleton pattern to ensure only one Prisma client instance is used
const globalForPrisma = globalThis as {
  prismaConnection?: PrismaClient;
};

// create a new connection if it doesn't exist

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })

const adapter = new PrismaNeon(pool)

export const prismaConnection =
  globalForPrisma.prismaConnection ??
  new PrismaClient({
    adapter,
    log: ['query'], // Log Prisma queries for debugging
  })

// If not in production, set the global instance to avoid multiple connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaConnection = prismaConnection
}

export default prismaConnection

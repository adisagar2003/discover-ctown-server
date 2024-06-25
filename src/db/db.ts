import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool: Pool = new Pool({ connectionString })
const adapter: PrismaPg = new PrismaPg(pool)
const prisma = new PrismaClient({
    datasources: {
        
    }
})
import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    email: 'email@email.com',
    name: 'Matheus',
  },
})

export const app = fastify()

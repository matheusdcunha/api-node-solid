import { z } from 'zod'
import { AuthenticateService } from '@/services/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/services/erros/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(userRepository)
    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}

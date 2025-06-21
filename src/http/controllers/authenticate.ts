import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/erros/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-services'

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
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}

import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService()
  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}

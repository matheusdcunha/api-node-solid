import { verifyJWT } from '@/middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { FastifyInstance } from 'fastify'

export async function useRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

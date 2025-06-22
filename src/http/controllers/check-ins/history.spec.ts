import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -22.8041951,
        longitude: -43.0180924,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    
    // Verificar se os check-ins contêm as propriedades esperadas
    response.body.checkIns.forEach((checkIn: any) => {
      expect(checkIn).toMatchObject({
        gym_id: gym.id,
        user_id: user.id,
      })
      expect(checkIn).toHaveProperty('id')
      expect(checkIn).toHaveProperty('created_at')
      expect(checkIn).toHaveProperty('validated_at')
    })
  })
})

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsService } from './search-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Fetch User Check-in History Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(checkInsRepository)

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'JavaScript Gym',
    //   description: 'My JavaScript Gym',
    //   phone: '123123',
    //   latitude: -22.8041951,
    //   longitude: -43.0180924,
    // })
  })

  it('should be able to search for gyms', async () => {
    await checkInsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.8041951,
      longitude: -43.0180924,
    })

    await checkInsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -22.8041951,
      longitude: -43.0180924,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8041951,
        longitude: -43.0180924,
      })
    }
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})

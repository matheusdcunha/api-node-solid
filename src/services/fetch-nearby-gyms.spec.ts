import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(checkInsRepository)

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'JavaScript Gym',
    //   description: 'My JavaScript Gym',
    //   phone: '123123',
    //   latitude: -22.8041951,
    //   longitude: -43.0180924,
    // })
  })

  it('should be able to fetch nearby gyms', async () => {
    await checkInsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.8041951,
      longitude: -43.0180924,
    })

    await checkInsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.74206,
      longitude: -43.493857,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.8041951,
      userLongitude: -43.0180924,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

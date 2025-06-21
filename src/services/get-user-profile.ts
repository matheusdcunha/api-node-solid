import type { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}

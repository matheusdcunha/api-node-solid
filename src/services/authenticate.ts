import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

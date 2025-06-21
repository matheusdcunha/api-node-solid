import { UsersRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './erros/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterServiceRequest {
  email: string
  name: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}

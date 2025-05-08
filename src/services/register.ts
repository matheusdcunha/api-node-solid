import type { UsersRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  email: string
  name: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: RegisterServiceParams) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({ email, name, password_hash })
  }
}

import type { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../user-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    if (!data.name) {
      data.name = 'Teste'
    }

    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }

  // const registerService = new RegisterService({
  //       async findByEmail(email) {
  //         email.toLowerCase()
  //         return null
  //       },

  //       async create(data) {
  //         return {
  //           id: 'user-1',
  //           name: data.name,
  //           email: data.email,
  //           password_hash: data.password_hash,
  //         }
  //       },
  //     })
}

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const userRepository = new PrismaUsersRepository()
  const service = new RegisterService(userRepository)

  return service
}

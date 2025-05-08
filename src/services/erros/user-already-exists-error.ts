export class UserAlreadyExistError extends Error {
  constructor() {
    super('E-email already exists')
  }
}

import fastify from 'fastify'
import { appRoutes } from './http/appRoutes'

export const app = fastify()

app.register(appRoutes)

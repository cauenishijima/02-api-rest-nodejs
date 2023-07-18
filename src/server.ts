import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import { fastifyCookie } from '@fastify/cookie'

const app = fastify()

app.register(fastifyCookie)

app.addHook('preHandler', async (request) => {
  console.log(`Prehandles in the global context`)
  console.log(`[${request.method}] ${request.url}`)
})

app.get('/hello', async () => {
  return { hello: 'world' }
})

app.register(transactionsRoutes, {
  prefix: '/transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running 🚀')
  })

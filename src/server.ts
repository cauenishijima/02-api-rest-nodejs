import fastify from 'fastify';
import { knex } from './database';
import { randomUUID } from 'node:crypto';

const app = fastify();

app.get('/hello', async (request, reply) => {
  const transactions = await knex('transactions').
  where('amount', 1000).select('*')

  return transactions
})

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP Server running 🚀')
})
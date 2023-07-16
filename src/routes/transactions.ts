import { FastifyInstance, FastifyRegister, FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "crypto"

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.coerce.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = createTransactionBodySchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1
    })

    reply.status(201).send();

  })
}
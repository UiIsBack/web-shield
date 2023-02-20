

import Fastify from 'fastify';
import { createClient } from '@supabase/supabase-js'
let i 
const supabase = createClient('<url>', '<key>')
const fastify = Fastify({ logger: false });
await fastify.register(import('@fastify/rate-limit'), {
  max: 3, // max alowed requests within time
  timeWindow: '30 seconds', //time

})
fastify.delete('/:id', async (request, reply, next ) => {
    let id = request.params.id
    
    const { data, error } = await supabase
        .from('users')
        .select("webhook")
        .eq("id", id)
   ;
    const e = {
      title: 'WebShield',
      description: `${request.ip} attempted to delete your webhook!`,
        };
    let webhook =  data[0]['webhook']
    const body = {
        embeds: [e]
    }
    const r = await fetch(webhook, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
    })

    reply.send({
        "hello":"world"
    })
  })


fastify.post('/:id', {
  config: {
    rateLimit: {
      max: 3, // max alowed requests within time
  timeWindow: '30 seconds', //time
  onExceeded: async function (req, key) {


    console.log('\x1b[32m%s\x1b[0m \x1b[31m%s\x1b[0m',`${req.ip}`,  ` is attempting to spam your webhook!`)


  }
    }
  }
}, async (request, reply, next ) => {
    let id = request.params.id
    
    const { data, error } = await supabase
        .from('users')
        .select("webhook")
        .eq("id", id)
    let webhook =  data[0]['webhook']
    
    const body = request.body;
    console.log(body); 
    const r = await fetch(webhook, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
    })

    reply.send({
        "hello":"world"
    })
  })


  
const start = async () => {
    try {
      await fastify.listen({ port: 3030 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()

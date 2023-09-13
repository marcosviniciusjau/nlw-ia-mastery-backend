import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import {fastifyMultipart} from '@fastify/multipart'
import path from "node:path"
import { randomUUID } from "node:crypto"
export async function getAllPromptsRoute(app: FastifyInstance) {
  app.register(fastifyMultipart,{
     limits:{
      fileSize:1_048_576 * 25,
     }
  })

  app.post("/videos", async (request, reply) => {
      const data= await request.file()

      if(!data){
        return reply.status(400).send({error:'Missing file input.'})
      }

      const extension = path.extname(data.filename)

      if(extension != '.mp3'){
        return reply.status(400).send({ error: "Invalid input type, pleasse upload a MP3." })
      }

     const fileBaseName = path.basename(data.filename, extension)
     const fileUploadName= `${fileBaseName}-${randomUUID()}${extension}`
  })
}

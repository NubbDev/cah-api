import fastify, { FastifyInstance } from 'fastify'
import fs from 'fs'
import path from 'path'
import { IMethod, ServerMethod } from './types'
import fastifySecureSession from '@fastify/secure-session'
import fastifyPassport from '@fastify/passport'
import fastifyWebsocket from '@fastify/websocket'
import fastifyCors from '@fastify/cors'


const server = fastify()
server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
})
server.register(fastifySecureSession, {
    key: fs.readFileSync(path.join(__dirname, '..', 'secret_key')),
})
server.register(fastifyWebsocket, {
    options: {
        clientTracking: true,
        // server: server.server,
    
    },
    
})
server.register(fastifyPassport.initialize())
server.register(fastifyPassport.secureSession())

server.get('/socket/chat/global', { websocket: true }, (conn, req) => {

    conn.socket.on('connectToChat', (data) => {
        console.log("CONNECTED", data)
    })

    conn.socket.on('message', (message) => {
        const data = message
        try {
            console.log(data)
            server.websocketServer.clients.forEach((client) => {
                if (client.readyState != conn.socket.OPEN) return;
                client.send(JSON.stringify(data))
            })
        } catch (err) {
            console.log(err)
        }
    })
})

const init = async (serv: FastifyInstance) => {
    ['sockets', 'services'].forEach((file) => {
        const service = require(path.join(__dirname, 'handlers', file)).default
        service(serv)
    })

    return serv
}

init(server).then((serv) => {
    serv.listen({host: "192.168.1.90", port:8080}, (err, address) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
})

export default server;
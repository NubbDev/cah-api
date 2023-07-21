import fastify from "fastify";
import { IRoute, ISocketRoute } from "../types";
import server from "..";

export default {
    path: '/chat/global',
    handler: async (conn, req) => {

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
    }

} as ISocketRoute;
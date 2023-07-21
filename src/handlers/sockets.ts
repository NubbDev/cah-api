import { FastifyInstance } from "fastify";
import path from "path";
import fs from "fs";
import { IMethod, ISocketMethod, ServerMethod } from "../types";

export default async (server: FastifyInstance) => {
    const servicePath = path.join(__dirname, '..', 'sockets')
    const file:ISocketMethod = require(path.join(servicePath, 'index')).default
    const routes = file.handlers
    for (const route of routes) {
        server.get(route.path, { websocket: true }, route.handler)
        console.log("watching for WEBSOCKET", route.path)
    }

}
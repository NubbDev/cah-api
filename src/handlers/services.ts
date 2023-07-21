import { FastifyInstance } from "fastify";
import path from "path";
import fs from "fs";
import { IMethod, ServerMethod } from "../types";

export default async (server: FastifyInstance) => {
    const servicePath = path.join(__dirname, '..', 'services')
    for (const Service of fs.readdirSync(servicePath)) {
        const service: IMethod = require(path.join(servicePath, Service)).default
        const routes = service.handlers
        for (const route of routes) {
            if (route.method == ServerMethod.GET){
                server.get(route.path, route.handler)
                console.log("watching for GET", route.path)
            }
            else if (route.method == ServerMethod.POST) {
                server.post(route.path, route.handler)
                console.log("watching for POST", route.path)
            }
            else if (route.method == ServerMethod.PUT) {
                server.put(route.path, route.handler)
                console.log("watching for PUT", route.path)
            }
            else if (route.method == ServerMethod.DELETE) {
                server.delete(route.path, route.handler)
                console.log("watching for DELETE", route.path)
            }
            else if (route.method == ServerMethod.OPTIONS) {
                server.options(route.path, route.handler)
                console.log("watching for OPTIONS", route.path)
            }
            else if (route.method == ServerMethod.HEAD) {
                server.head(route.path, route.handler)
                console.log("watching for HEAD", route.path)
            }
            else if (route.method == ServerMethod.PATCH) {
                server.patch(route.path, route.handler)
                console.log("watching for PATCH", route.path)
            } 
        }
    }
}
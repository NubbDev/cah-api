import { SocketStream } from "@fastify/websocket";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestType } from "fastify/types/type-provider";

export interface AuthBody {
    username: string;
    // email: string;
    password: string;
    // dateOfBirth: string;
}

export enum ServerMethod {
    GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH, WEBSOCKET
}

export interface IMethod {
    handlers: IRoute[]
}

export interface IMethod {
    handlers: IRoute[]
}

export interface IRoute {
    method: ServerMethod;
    path: string;
    handler: (req: FastifyRequest, res: FastifyReply) => Promise<any>
}

export interface ISocketMethod {
    handlers: ISocketRoute[]
}

export interface ISocketRoute {
    method: ServerMethod;
    path: string;
    handler: (connection: SocketStream, req: FastifyRequest) => Promise<any>
}
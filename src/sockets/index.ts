import { IMethod, ISocketMethod } from "../types";
import globalchat from "./globalchat";

export default {
    handlers: [
        globalchat
    ]
} as ISocketMethod;
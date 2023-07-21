import { IRoute, ServerMethod } from "../../types";
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'



export const SignIn = {
    method: ServerMethod.POST,
    path: '/auth/signin',
    handler: async (req, res) => {
        const storagePath = path.join(__dirname, '..', '..', '..', 'storage.json')
        const storage = JSON.parse(fs.readFileSync(storagePath, 'utf-8')) as {passwords: any[], salts: any[]}

        const username = (req.body as any)["username"]
        const password = (req.body as any)["password"]
        if (!storage.passwords.find((e) => e.username === username)) {
            res.status(400).send("username does not exist")
            return
        }

        const saltRounds = 10;

        // const salt = storage.salts.find((e) => e.username === username).salt
        const hash = storage.passwords.find((e) => e.username === username).hash

        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send("error")
            }

            if (result) {
                res.status(200).send("success")
                console.log("success")
            } else {
                res.status(400).send("incorrect password")
                console.log("incorrect password")
            }
        })

    }

} as IRoute;
import { IRoute, ServerMethod } from "../../types";
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'



export const Register = {
    method: ServerMethod.POST,
    path: '/auth/register',
    handler: async (req, res) => {

        const storagePath = path.join(__dirname, '..', '..', '..', 'storage.json')
        const storage = JSON.parse(fs.readFileSync(storagePath, 'utf-8')) as {passwords: any[], salts: any[]}

        
        
        const username = (req.body as any)["username"]
        const password = (req.body as any)["password"]
        if (storage.passwords.find((e) => e.username === username)) {
            res.status(400).send("username already exists")
            return
        }

        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.log(err)
                res.status(500).send("error")
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.log(err)
                    res.status(500).send("error")
                }

                storage.passwords.push({
                    username: username,
                    hash: hash
                });
                storage.salts.push({
                    username: username,
                    salt: salt
                })

                fs.writeFileSync(storagePath, JSON.stringify(
                    storage
                ))

                res.status(200)
                return {
                    "username": username,
                    "password": password,
                    "hash": hash,
                    "salt": salt
                }
            });
        });
    }

} as IRoute;
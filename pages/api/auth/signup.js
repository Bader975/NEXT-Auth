import { ConnectToDB } from "../../../lib/db";
import argon2 from 'argon2';

export default async function handler(req, res) {
    if (req.method === 'POST') {


        const data = req.body;
        const { email, password } = data;
        if (!email || !password || !email.includes('@')) {
            res.status(422).json({ message: "Invalid email or password" });
            return;
        }

        const client = await ConnectToDB();
        const db = client.db();

        const isUserExist = await db.collection('users').findOne({ email: email });
        if(isUserExist) {
           res.status(422).json({ message: "User already exists"});
           client.close();
           return;
        }

        try {
            const hashedPassword = await argon2.hash(password);
            const result = await db.collection('users').insertOne({ email: email, password: hashedPassword });
            res.status(201).json({ message: "Created User ! " })
            client.close();
        } catch (err) {
            req.status(422).json({ message: err.message });
        }
    }

}
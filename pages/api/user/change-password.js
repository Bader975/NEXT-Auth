import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import { ConnectToDB } from '../../../lib/db';
import argon2 from 'argon2';

export default async function handler(req, res) {
    
    if (req.method !== 'PATCH') {
        return;
    }
    // const session = await  getServerSession({ req: req })
    const session = await getServerSession(req, res, authOptions);
    console.log("session-------------");
    console.log(session.user.email);
    console.log("session-------------");
    if (!session) {
        res.status(401).json({ message: "Unauthorized " });
        return;
    }


    const userEmail = session?.user.email;
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword


    const client = await ConnectToDB();
        const db = client.db()
        
    const userCollections = await db.collections('users');
    const user = await db.collection('users').findOne({ email: userEmail });

    // const user = await userCollections.findOne({ email: userEmail });
    if (!user) {
        client.close();
        res.status(404).json({ message: "User Not Found" });
        return;

    }

    // const currentPassword = user.password;

    if (!(await argon2.verify(user.password, oldPassword))) {
        client.close();
        res.status(403).json({ message: " no password was found" });
        return;
    }

    const hashedPassword = await argon2.hash(newPassword);
    const result = await db.collection('users').updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    client.close();
    console.log(result);
    res.status(200).json({ message: " Updated Successfully " })




}


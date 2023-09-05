import NextAuth from "next-auth";
import { ConnectToDB } from "../../../lib/db";
import CredentialsProvider from "next-auth/providers/credentials"
import argon2 from 'argon2';

export const authOptions  = {

    session: {
        strategy: "jwt",

    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await ConnectToDB();
                const userCollention = client.db().collection('users');
                const user = await userCollention.findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error("Could not find user With Email " + credentials.email);
                }

                if (!(await argon2.verify(user.password, credentials.password))) {
                    client.close();
                    throw new Error(" no passwordor email ware found");
                }

                // If the user is already authenticated     
                client.close();
                return {
                    email: user.email,

                };



            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};




export default NextAuth(authOptions)
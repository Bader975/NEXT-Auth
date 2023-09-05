import { MongoClient } from 'mongodb';



export async function ConnectToDB() {
   const client = await MongoClient.connect("mongodb+srv://bader:Mt4Cmua7IekR40BD@cluster0.7voolcp.mongodb.net/?retryWrites=true&w=majority");

   return client;
}
import clientPromise from "@/lib/db";
import {Collection} from "mongodb";

const client = await clientPromise;

if(!(client)){
    throw new Error("MongoDb not connected");
}

const db = client.db("todo");

declare global {
    var users : Collection | undefined;
}

if(!(global.users)){
    const userCollection = db.collection("users");
    await userCollection.createIndex({email:1,password:1},{unique:true});
    global.users = userCollection;
}

const Users : Collection = global.users;

export {Users};

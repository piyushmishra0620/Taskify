import clientPromise from "@/lib/db";
import {Collection} from "mongodb";

const client = await clientPromise;

if(!(client)){
    console.error("Error connecting to mongodb");
    throw new Error("MongoDb not connected");
}

const db = client.db("todo");
declare global{
    var users : Collection | undefined;
}

if(!(global.users)){
    const collection = await db.listCollections({name:"users"}).toArray();
    if((collection.length)==0){
        db.createCollection("users");
    }
    const userCollection = db.collection("users");
    const indexes = await userCollection.indexes();
    const emailIndex = indexes.some((idx: any) => idx.key && idx.key.email === 1);
    const passwordIndex = indexes.some((idx: any) => idx.key && idx.key.password === 1);
    if(!emailIndex){
        await userCollection.createIndex({email:1},{unique:true});
    }
    if(!passwordIndex){
        await userCollection.createIndex({password:1},{unique:true});
    }
    global.users = userCollection;
} 

const Users : Collection = global.users;

export {Users};

import clientPromise from "@/lib/db";
import {Collection} from "mongodb";

const client = await clientPromise;

if(!(client)){
    console.error("Error connecting to mongodb")
    throw new Error("MongoDb not connected");
}

const db = client.db("todo");

declare global{
    var tasks : Collection | undefined;
}

if(!(global.tasks)){
    const collection = await db.listCollections({name:"tasks"}).toArray();
    if((collection.length)==0){
        db.createCollection("tasks");
    }
    const tasksCollection = db.collection("tasks");
    const indexes = tasksCollection.indexes();
    
    global.tasks = tasksCollection;
}

const tasks : Collection = global.tasks;
export {tasks};
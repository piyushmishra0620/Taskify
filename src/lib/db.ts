import {MongoClient} from "mongodb";

const uri : string = process.env.MONGODB_URI!;


let client : MongoClient;
let clientPromise : Promise<MongoClient> | null = null;

declare global{
    var mongoClient : Promise<MongoClient> | undefined;
}



if(!(global.mongoClient)){
    client = new MongoClient(uri);
    global.mongoClient = client.connect();
}

clientPromise = global.mongoClient!;

export default clientPromise;

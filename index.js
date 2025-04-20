let express=require("express")
let cors=require("cors")
let{MongoClient}=require("Mongodb")
let app=express();
app.use(cors());
app.use(express.json());
//const url=""
const url = "mongodb+srv://aaryanjoshi1705:nGhOWwGYGBFGZMq3@cluster0.s1ilkv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.post("/add",(request,response)=>{
    let client=new MongoClient(url);
    client.connect();
    let db=client.db("mern");
    let collec=db.collection("bookings")
    let obj={
        name:request.body.name,
        event:request.body.event,
        time:request.body.time,
        phone:request.body.phone
    }
    collec.insertOne(obj)
    .then((result)=>{response.send(result)})
    .catch((error)=>{response.send(error)});
});
app.get("/get",(request,response)=>{
    let client=new MongoClient(url);
    client.connect();
    let db=client.db("mern");
    let collec=db.collection("bookings");
   collec.find().toArray()
    .then((result)=>{response.send(result)})
    .catch((error)=>{response.send(error)});
});
app.listen(9000,()=>{console.log("Express is Running")})

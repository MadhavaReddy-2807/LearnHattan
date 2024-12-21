const express = require('express')
var cors = require('cors')
const bodyparser=require('body-parser');
const {MongoClient}=require('mongodb');
const app = express()
app.use(cors())
app.use(bodyparser.json())
const port = 3000
const url=process.env.MONGO
const client=new MongoClient("mongodb://localhost:27017/");

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/space',async (req,res)=>{
  const {id}=req.query
  const dbname="Spaces";
    const db=client.db(dbname);
    const collection=db.collection("spaces");
    const space=await collection.findOne({id:id});
    res.json(space);
})
app.post('/spaces',async (req,res)=>{
    const space=req.body;
    const dbname="Spaces";
    const db=client.db(dbname);
    const collection=db.collection("spaces");
    const insert=await collection.insertOne(space);
    res.send({"success":"true"});
})
app.get('/spaces', async (req, res) => {
  const dbname = "Spaces";
  const db = client.db(dbname);
  const collection = db.collection("spaces");
  const spaces = await collection.find({}).toArray();
  res.json(spaces);
});
app.put('/spaces',async(req,res)=>{
  const { id, space } = req.body;
  const {_id,...updateddata}=space;
  const dbname = "Spaces";
  const db = client.db(dbname);
  const collection = db.collection("spaces");
  const result=await collection.updateOne({id},{$set:updateddata})
  res.status(200).send({success:true});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
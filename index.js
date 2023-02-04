const express = require('express')
const app = express()
const port = process.env.PORT || 5500;
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, CURSOR_FLAGS } = require('mongodb');
// fFgYkwIHB73hWI7b pass 
const uri = `mongodb+srv://${process.env.nameUser}:${process.env.password}@cluster0.ckb7hbl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dataBase = client.db('checking')
const userCollection = dataBase.collection('checking');
const ordersCollection = client.db('checking').collection('Orders')
async function run() {
    try {
        // console.log('inside func');
        app.get('services', function named(req, res) {

        })

        // app.post('/services/:id', async (req, res) => {
        //     const user = req.body

        //     // const result = await haiku.insertOne(doc);
        //     // console.log(user,'user');
        //     const result = await userCollection.insertOne(user)
        //     console.log(result, 'rsult');
        //     const send = res.send(result)
        // })

        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            // console.log(id, 'ididid');
            const data = await userCollection.findOne({_id:ObjectId(id)})
            // console.log(data, 'datadatadata');
            res.send(data)
        })
      
        app.get('/services', async (req, res) => {
            const data = await userCollection.find({}).toArray();
            res.send(data)
        })
        app.get('/orders', async function (req, res){
            let query = {}
           if(req.query.email){
            query ={ email:req.query.email}
           };
           console.log(query, 'queryrs');
            const response =await ordersCollection.find(query).toArray();
            res.send(response);
        })
        app.post('/orders', async (req, res)=>{
            const user = req.body;
            const response = await ordersCollection.insertOne(user)
            res.send(response)
        })
        app.delete('/orders/:id', function(req, res){
            const id = req.params.id;
            console.log(id, 'delate id');
            const lete =   ordersCollection.deleteOne({_id:ObjectId(id)})
            lete.then(result=>{
                res.send(result)
            })

        })
        app.patch('/order/:id', async function(req, res){
            const id = req.params.id;
            console.log(id, 'pacth id');
            const status = req.body.status;
            const updateDoc = {
                $set:{
                    status:status,
                }
            }
           
            const response =await ordersCollection.updateOne({_id:ObjectId(id)},updateDoc )
            console.log(response, 'response patch 2');
            res.send(response)
        })
    }
    finally {

    }

}
run().catch(err => console.log(err));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;


//middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m0zh9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        // const tasksCollection = client.db("toDoList").collection("tasks");

        console.log('db connected');
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('to do app  Server is running')
});

app.listen(port, () => {
    console.log(`Port is:  ${port}`)
});

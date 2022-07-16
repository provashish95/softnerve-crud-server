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
        const studentCollection = client.db("toDoList").collection("studentDetails");
        console.log('db connected');

        //add data on database
        app.post('/student', async (req, res) => {
            const newStudent = req.body;
            const result = await studentCollection.insertOne(newStudent);
            res.send(result)
        });

        //get all data from database...
        app.get('/student', async (req, res) => {
            const allStudents = await studentCollection.find({}).toArray();
            res.send(allStudents);
        });

        //update  by id 
        app.put('/student/:id', async (req, res) => {
            const id = req.params.id;
            const studentInfo = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: studentInfo
            }
            const updatedOrders = await studentCollection.updateOne(filter, updateDoc);
            res.send(updatedOrders);
        });

        //Delete  by id api 
        app.delete('/student/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            result = await studentCollection.deleteOne(query);
            res.send(result)
        });

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Softnerve Technology Private Limited  Server is running')
});

app.listen(port, () => {
    console.log(`Port is:  ${port}`)
});

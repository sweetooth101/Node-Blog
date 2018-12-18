
const express = require('express');

const db = require('./data/helpers/postDb');
const server = express();

const PORT = 4000;


server.get('/', (req, res) =>{
    db.get()
        .then((post) =>{
            res.json(posts)
        })
        .catch(err=>{
            res.status(500)
                .json({error:'The posts information could not be retreieved.'})
        })
})


server.listen(PORT, ()=> {
    console.log(`server is up and runing on port ${PORT}`)
})
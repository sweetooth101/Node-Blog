
const express = require('express');
const helmet = require('helmet')

const db2 = require('./data/helpers/userDb')
const db = require('./data/helpers/postDb');
const server = express();

const PORT = 4000;


server.use(helmet());

server.get('/', (req, res) =>{
    db.get()
        .then((posts) =>{
            res.json(posts)
        })
        .catch(err=>{
            res.status(500)
                .json({error:'The posts information could not be retreieved.'})
        })
})

server.get('/posts/:id', (req,res) =>{
    const { id } = req.params;
    db2.getUserPosts(id)
        .then(post =>{
            console.log(post.length)
            if(post.length > 0){
                res.json(post);
            } else{
                res.status(404)
                .json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The post information could not be retrieved."})
        })
})


server.listen(PORT, ()=> {
    console.log(`server is up and runing on port ${PORT}`)
})
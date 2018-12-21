
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const postDB = require('./data/helpers/userDb')
const userDB = require('./data/helpers/postDb');
const server = express();

const PORT = 4000;

server.use(express.json())
server.use(helmet());
server.use(logger('tiny'))


server.get('/', (req, res) =>{
    userDB.get()
        .then((posts) =>{
            res.json(posts)
        })
        .catch(err=>{
            res.status(500)
                .json({error:'The posts information could not be retreieved.'})
        })
})

server.get('/user/:id', (req,res) =>{
    const { id } = req.params;
    postDB.getUserPosts(id)
        .then(post =>{
            
            if(post.length > 0){
                res.json(post);
            } else{
                res.status(404)
                .json({message: "The post(s) with the specified user ID does not exist."})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The post information could not be retrieved."})
        })
})

server.get('/post/:id', (req,res) =>{
    const { id } = req.params;
    
    userDB.get(id)
        .then(post =>{
            
            res.json(post);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "The post with the specified ID does not exist."})
        })
})


server.post('/api/users', (req,res) => {
    const user = req.body;
    console.log(user)
    if (user.name){
        postDB.insert(user)
    .then(info => {
        postDB.get(info.id).then(response => {
            res
            .status(201)
            .json(response)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get user"})
    })
    }

    else {
        res
        .status(400)
        .json({message: "missing name"})
    }
    
})

server.post('/api/posts', (req,res) => {
    const post = req.body;
    if (post.text && post.userID){
        userDB.insert(post)
    .then(info => {
        userDB.get(info).then(response => {
            res
            .status(201)
            .json(response)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
    }

    else {
        res
        .status(400)
        .json({message: "missing text or user id"})
    }
    
})

server.listen(PORT, ()=> {
    console.log(`server is up and runing on port ${PORT}`)
})
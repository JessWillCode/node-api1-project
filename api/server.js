const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

//ENDPOINTS 

//POST '/api/users' creates a user from req.body
server.post('/api/users', (req, res) => {
    User.insert(req.body)
    .then(user => {
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
            } else {
                res.status(201).json(user)
            }
        })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error while saving the user to the database'
        })
    })
})

//GET  '/api/users returns array of all users
server.get('/api/users', (req,res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'The users information could not be retrieved'
        })
    })
})

//GET  '/api/users/:id' get user by id
server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(404).json({
            message: 'The user with the specified ID does not exist'
        })
    })
})
    
//DELETE '/api/users/:id' delete user by id
server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
    .then(deletedUser => {
        if (!deletedUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        }
    })
    .catch(err => {
            res.status(500).json({
            message: 'The user could not be removed'
        })
    })
})
 
//PUT '/api/users/:id' update user from req.body
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    User.update(id, body)
    .then(updatedUser => {
        if(!updatedUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else if(!body.name || !body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            res.status(200).json(updatedUser);
        }
    })
    .catch(err => {
            res.status(500).json({
            message: 'The user information could not be modified'
        })
    })
})
 
module.exports = server; 

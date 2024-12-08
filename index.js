const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

JWT_SECRET = 'password123'

//db 
const users = []

app.post('/signup', (req, res) => {
    const username = req.body.username 
    const password = req.body.password
    users.push({
        username: username, 
        password: password
    })
    res.json({
        message: "user added", 
        users: users
    })

})


app.post('/signin', (req, res) => {
    const username = req.body.username 
    const password = req.body.password
    let foundUser = null
    for(let i=0; i<users.length; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i]
        }
    }
    if(!foundUser){
        res.json({
            message:"invalid credentials"
        })
        return
    }
    else{
        const token = jwt.sign(username, JWT_SECRET)
        res.json({
            token: token
        })      
    }
})


app.post('/me', (req, res) => {
    
})


app.listen(3000, () => console.log('server on...'))
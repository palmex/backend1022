// import statements
const express = require('express')

// define app & port 
const app = express()
const port = 3000

// we want our app to be able to handle JSON and URLs
app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)

//our first REST API Endpoint 
app.get('/', (req,res) => {
    res.json({"welcome": "Class of Stellantis OU Module 3!!!!!"})
})

// Post ECHO endpoint
app.post('/echo', (req,res) => {
    echoBody = req.body
    console.log('printout of request body', echoBody)
    res.json(echoBody)
})



// start listening on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// import statements
const express = require('express')
const db = require('./db')
const carsRouter = require('./routes/cars')
const usersRouter = require('./routes/users')

// define app & port 
const app = express()
const port = 3000

// we want our app to be able to handle JSON and URLs
app.use(express.json())
app.use(
    express.urlencoded({extended:true})
)
app.use('/cars',carsRouter)
app.use('/users', usersRouter)

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

// db - async endpoint 
app.get('/async', (req, res) => {

    // 1
    console.log("BEFORE callback function")

    db.query("SELECT * FROM cars;", 
        (error, results) =>{
            if (error) {
                res.status(500).json(error)
            }

            // 1
            console.log("inside callback function")
            result = results.rows
            res.status(200).json(result)
        }
    )

    // 2
    console.log("AFTER callback function")
})



// start listening on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


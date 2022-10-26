

const express = require('express')

const db = require('../db')



var usersRouter = express.Router()

usersRouter.use(express.json())

// localhost:3000/users/update



// Get ALL users endpoint

// usersRouter.get("", ()=>{})

// 2 parameters, endpoint URL & callback function



usersRouter.get("/all", (req,res)=>{

    // we will need a query 

    if (req.headers.admin){

        dbQueryStatement = "SELECT * FROM users;"

        dbQuery(dbQueryStatement, req,res)

    } else {

        res.status(401).json({"authorization":"not granted. You are not authorized."})

    }

})



usersRouter.post("/new", (req,res)=>{

    console.log("req body:", req.body)

    

    var name = req.body.name

    var email = req.body.email

    var phone = req.body.phone

    

    var dbQueryStatement = `INSERT INTO users (name, email, phone) VALUES ('${name}','${email}','${phone}') RETURNING *;`



    console.log(dbQueryStatement)

    dbQuery(dbQueryStatement, req,res)

})



// User specific endpoints 

usersRouter.get("/:userId", (req,res)=>{

    console.log("userId:", req.params.userId)

    dbQueryStatement = `SELECT * FROM users WHERE user_id = '${req.params.userId}';`

    dbQuery(dbQueryStatement, req, res)

})



usersRouter.post("/:userId", (req,res)=>{

    var date = req.body.date

    console.log("userId:", req.params.userId)

    dbQueryStatement = `UPDATE users SET

        WHERE user_id = '${req.params.userId}' RETURNING *;`

    console.log(dbQueryStatement)

    dbQuery(dbQueryStatement, req,res)

})



usersRouter.delete("/:userId", (req,res)=>{

    console.log("userId:", req.params.userId)

    dbQueryStatement =`DELETE FROM users WHERE users_id = '${req.params.userId}';`

    dbQuery(dbQueryStatement, req,res)

})



const dbQuery = (queryStatment, request, response) =>{

    db.query(queryStatment, 

        (error, results) =>{

            if (error) {

                response.status(500).json(error)

            }

            result = results.rows

            response.status(200).json(result)

        })

}





module.exports = usersRouter;
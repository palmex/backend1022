const express = require('express')
const db = require('../db')

var carsRouter = express.Router()
carsRouter.use(express.json())
// localhost:3000/cars/update

// Get ALL cars endpoint
// carsRouter.get("", ()=>{})
// 2 parameters, endpoint URL & callback function

carsRouter.get("/all", (req,res)=>{
    // we will need a query 
    if (req.headers.admin){
        db.query("SELECT * FROM cars;", 
        (error, results) =>{
            if (error) {
                res.status(500).json(error)
            }
            result = results.rows
            res.status(200).json(result)
        }
        )
    } else {
        res.status(401).json({"authorization":"not granted. You are not authorized."})
    }
})

carsRouter.post("/new", (req,res)=>{
    console.log("req body:", req.body)
    var make = req.body.make
    var model = req.body.model
    var year = req.body.year
    var odometer = req.body.odometer

    var dbQueryStatement = `INSERT INTO cars (make, model, year, odometer
        ) VALUES ('${make}','${model}',${year},${odometer}) RETURNING *;`

    console.log(dbQueryStatement)
    db.query(dbQueryStatement, 
    (error, results) =>{
        if (error) {
            res.status(500).json(error)
        }
        result = results.rows
        res.status(200).json(result)
    }
    )
    
})


module.exports = carsRouter;
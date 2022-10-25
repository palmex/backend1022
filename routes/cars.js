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
        dbQueryStatement = "SELECT * FROM cars;"
        dbQuery(dbQueryStatement, req,res)
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
    dbQuery(dbQueryStatement, req,res)
})

// Car specific endpoints 
carsRouter.get("/:carId", (req,res)=>{
    console.log("carId:", req.params.carId)
    dbQueryStatement = `SELECT * FROM cars WHERE car_id = '${req.params.carId}';`
    dbQuery(dbQueryStatement, req,res)
})

carsRouter.post("/:carId", (req,res)=>{
    var odometer = req.body.odometer
    console.log("carId:", req.params.carId)
    dbQueryStatement = `UPDATE cars SET
        odometer=${odometer}
        WHERE car_id = '${req.params.carId}' RETURNING *;`
    console.log(dbQueryStatement)
    dbQuery(dbQueryStatement, req,res)
})

carsRouter.delete("/:carId", (req,res)=>{
    console.log("carId:", req.params.carId)
    dbQueryStatement =`DELETE FROM cars WHERE car_id = '${req.params.carId}';`
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


module.exports = carsRouter;
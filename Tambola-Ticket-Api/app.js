const http = require("http");
const path = require("path");
const fs = require("fs");
const User = require('./models/users-create');
const Users = require ("./Api/user");
const Login = require("./Api/login");
const Tickets = require("./Api/tambula-tickets")

//import mongoose from "mongoose";
const mongoClient = require("mongoose").mongoClient;
const url = "mongodb://0.0.0.0/Tambola";
mongoClient.connect(url, function(err, client) {
    if(err){
        console.log("Error while connecting to MongoDB", err);
    }
    console.log("connected to MongoDB successfully!");
    client.close();
});
const db = client.db();
const collection = db.collection({Users});
collection.find({}).toArray(function(err, docs) {
    if(err){
        console.log("Error executing query", err);
        return;
    } 
})

const app = http.createServer((req,res) => {
    app.use(Node.json());
    res.end("Hello I Am Back-End Welcome to Node.js");
    console.log("Listing to Node.js");
});
app.listen(3000,() => {
    console.log("Listing on port 3000");
})
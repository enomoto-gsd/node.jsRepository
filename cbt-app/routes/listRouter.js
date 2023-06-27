const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const { URL, DATABASE, OPTIONS } = require("../config/dbConfig");

router.get(".columnlist",(req,res)=>{
  redirect("columnlist.ejs",)
})
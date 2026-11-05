var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");

require("dotenv").config({ path: "./config.env" }); 
const { MongoClient } = require("mongodb"); 
const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" + 
process.env.MONGODB_PASSWORD + process.env.MONGODB_URL; 
const client = new MongoClient(uri); 
const db = client.db("LessonsDB");

app.use(express.json());
app.use(cors());


app.use(function (request, response, next) {
    console.log("In comes a request to " + request.method + " to URL " + request.url);
    next();
});

app.listen(3000, function () {
    console.log("App started on port 3000");
});


app.get("/lessons", async function (request, response) {
   let collection = await db.collection("Lessons");
   let results = await collection.find({}).toArray();
   response.send(results);
});

var publicPath = path.resolve(__dirname, "images");

app.use("/images", express.static(publicPath));

app.use("/images", function (request, response) {
    response.status(404).send("images not found");
});

app.post("/orders", function (request, response) {
    var order = request.body;
    console.log("New Order received: " 
        + "\nCustomer: " + order.name 
        + "\nPhoneNo: " + order.phone
    );
    console.log();
    console.log("Order Details:");
    
    order.lessons.forEach(lesson => {
        console.log(
            "ID: " + lesson.id +
            "\nTitle: " + lesson.title +
            "\nPrice: £" + lesson.price +
            "\nQuantity: " + lesson.quantity
        );
        console.log();
    });
    response.json({message: "Order received!"});
});

app.use(function (request, response, next) {
    response.status(404).send("Request not recognised");
});


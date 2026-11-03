var express = require("express");
var cors = require("cors");
var app = express();
var path = require("path");

app.use(express.json());
app.use(cors());


app.use(function (request, response, next) {
    console.log("In comes a request to " + request.method + " to URL " + request.url);
    next();
});

app.listen(3000, function () {
    console.log("App started on port 3000");
});


app.get("/lessons", function (request, response) {
    response.json([
        {
            Subject: "Computer Science",
            Id: 2005,
            Location: "Hendon",
            Price: 60,
            Availability: 5,
            Image: "cs.img.jpg",
            ImageAlt: "Computer Science"
        },
        {
            Subject: "Maths",
            Id: 2006,
            Location: "Hendon",
            Price: 55,
            Availability: 7,
            Image: "math.webp",
            ImageAlt: "Maths"
        },
        {
            Subject: "English",
            Id: 2007,
            Location: "Hendon",
            Price: 50,
            Availability: 5,
            Image: "english.webp",
            ImageAlt: "English"
        }
    ]);
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


var express = require("express");
var cors=require("cors"); 
var app = express();
app.use(cors()); 

app.use(function (request, response) {
    console.log("In comes a request to: " + request.url);
    response.json([
        {
            Subject: "Computer Science",
            Id: 2005,
            Location: "Hendon",
            Price: "£60",
            Availability: 5,
            Image: "images/cs.img.jpg",
            ImageAlt: "Computer Science"
        },
        {
            Subject: "Maths",
            Id: 2006,
            Location: "Hendon",
            Price: "£55",
            Availability: 7,
            Image: "images/math.webp",
            ImageAlt: "Maths"
        },
        {
            Subject: "English",
            Id: 2007,
            Location: "Hendon",
            Price: "£50",
            Availability: 5,
            Image: "images/english.webp",
            ImageAlt: "English"
        }
    ])

});

app.listen(3000, function () {
    console.log("App started on port 3000");
});
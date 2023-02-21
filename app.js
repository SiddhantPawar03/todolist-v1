const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var newItems = [];
var workItems = [];

app.get("/", function (req, res) {
    // res.sendFile(__dirname + '/index.html');
    let day = date();

    // var currentDay = today.getDay();
    // var day = "";
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Invalid!");
    // }
    //here res.render is used instead of res.send() as in whole aapp.js we can use
    //only once res.send() also res.render() can directly talk with various componenets at same time.
    //res.render("filename", {variable name (from list.ejs): localvariablename})

    res.render("list", { listTitle: day, newListItem: newItems});

});


app.post("/", function(req, res) {
    var newItem = req.body.todo;
    if(req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else{
        newItems.push(newItem);
    res.redirect("/");
    }
    
});


app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItem: workItems});
});

app.post("/work", function(req, res) {
    let item = req.body.todo;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
})
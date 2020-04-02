let express = require("express");
let bodyParser = require("body-parser");
let PORT = 3001;

let app = express();


//to access a public folder
app.use(express.static("public"));

//to use the bodyParser and convert the body to an object and view the req.body
app.use(bodyParser.urlencoded({extended: true}));

//to use the ejs shortcut
app.set("view engine", "ejs");


app.get("/", function(req, res){
    console.log("hello")

    res.send("hello")
})



app.get("*", function(req, res){
    console.log("hello")

    res.send("PAGE NOT FOUND")
})


app.listen(PORT, function(){
    console.log("listening to http://localhost:" + PORT)
})
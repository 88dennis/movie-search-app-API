let express = require("express");
let bodyParser = require("body-parser");
let PORT = 3001;
let app = express();

let searchThisMovie = "wars"
//SEE DEPENDENCIES
//to access a public folder
app.use(express.static("public"));

//to use the bodyParser and convert the body to an object and view the req.body
app.use(bodyParser.urlencoded({extended: true}));

//to use the ejs shortcut
app.set("view engine", "ejs");


//http://www.omdbapi.com/?s=start&apikey=thewdb

app.get("/", function(req, res){
    console.log("hello")
    res.render("home")
})


app.get("/results", function(req, res){
//for GET METHOD you will use req.query
console.log(req);
console.log(req.query);
//searchTerm is the name we got from the FORM
console.log(req.query.searchTerm);

searchThisMovie = req.query.searchTerm;

    let rp = require("request-promise");

rp("http://www.omdbapi.com/?s=" + searchThisMovie + "&apikey=thewdb")
    .then((body)=>{
        console.log(body)
        //the body is still a string
        //you need to convert it to an OBJECT using JSON.parse
                let parsedData = JSON.parse(body);
    
                // console.log(parsedData);

                // res.send(parsedData["Search"])

                let parsedDataArr = parsedData["Search"];

                //res.send so you can see it in the browser
                
                res.render("movies", {parsedDataEjs: parsedDataArr})

        //         for(let i = 0; i < parsedData.length; i++){
        //     console.log(parsedData[i]["name"] + ": \n"  + parsedData[i]["email"]) 
        //     // console.log('${parsedData[i]["name"]} - ${parsedData[i]["email"]}') 
        // } 
    })
    .catch(function(err){
        console.log("Erroe", err)
    });

});

app.get("*", function(req, res){
    console.log("hello")

    res.send("PAGE NOT FOUND")
})

app.listen(PORT, function(){
    console.log("listening to http://localhost:" + PORT)
})
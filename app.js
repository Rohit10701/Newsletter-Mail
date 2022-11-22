const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/f29eb8b3be";
    const options = {
        method : "POST",
        auth: "Rk10701:04a008684792e8d4870ad4d9875c8a14-us21"

    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
});
//Api key
//04a008684792e8d4870ad4d9875c8a14-us21
//f29eb8b3be

app.listen(process.env.PORT || 3000,function(){
    console.log("server runnning on port 3000");
});
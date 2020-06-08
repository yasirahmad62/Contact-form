const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app .post ("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
    }
  ]
};
const jasonData = JSON.stringify(data);
const url = "https://us10.api.mailchimp.com/3.0/lists/9f2d11d6b8";
const option ={
  method: "POST",
  auth:"yasir62:06d41bb1a287b3993c63bf578a1fab78-us10"

}
const request = https.request(url,option,function(response){


  if (response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})
request.write(jasonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT|| 8000,function(){
  console.log("Server is running on port 8000");
});


// appi key
// 06d41bb1a287b3993c63bf578a1fab78-us10
// list id
// 9f2d11d6b8

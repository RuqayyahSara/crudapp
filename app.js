var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Login = require("./login");
mongoose.connect('mongodb://localhost/logindb');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));
app.get("/registers",function(req,res){
  Login.find({})
      .exec(function(err,register){
      if(err){
      res.send("error has occured");
      } else {
          console.log(register);
          res.json(register);
      }
      });
});
app.post("/registers",function (req,res) {
  const newlogin = new Login();
  newlogin.username = req.body.username;
  newlogin.password = req.body.password;
  newlogin.save(function(err,registers){
      if(err) {
          res.send("error saving registration");
      } else{
          console.log(registers);
          res.send(registers);
      }
  });
});
/*app.post("/registers1",function(err,registers){
    Login.create(req.body,function(err,registers) {
        if (err) {
            res.send("error saving registration");
        } else {
            console.log(registers);
            res.send(registers);
        }
    });
});*/
app.put("/registers/:id",function(req,res){
 Login.findOneAndUpdate({
     _id: req.params.id
     },
     { $set: {username: req.body.username}},
     {$upsert: true},
     function(err,newLogin){
 if(err) {
     console.log("error occured");
 } else {
     console.log(req.params.id);
          console.log(newLogin);
           res.send(newLogin);
    }
  });
});
app.delete("/registers/:id",function(req,res){
    Login.findOneAndRemove({
        _id:req.params.id
    },
        function(err,registers) {
            if (err) {
                console.log("error occured");
            } else {
                console.log(registers);
                res.send(registers);
            }
    });
});
app.listen(8080,function () {
  console.log("hey listening to port 8080");
});

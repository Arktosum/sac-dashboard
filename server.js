let express=require('express');
let app=express();
app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
  });
app.use(express.static("public\home\index.html"));
app.get("/index",function(req,res){
    res.send("index");
});



const express = require('express')
const cors = require('cors')
const path=require('path') // used to take the path for making public as static folder 
let sql=require('./sql');
const { deflate } = require('zlib');
const app = express()

app.use(cors())
app.use(express.json())


//serving our files
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.static(path.join(__dirname, '..','public','login'),{index: 'index.html'})) //for making this as default when it is loaded with '/' endpoint

db=sql.connect_db();
//sql.print_userdata(db)
//login
app.post('/login',(req,res)=>{
    
    //console.log("data login",req.body.username,req.body.id,req.body.password)
    // check whether the user exits or not with the given credentials
    sql.check_userdata_exits(db,req.body.id,req.body.username,req.body.password,(state)=>{
        if(state==true){
            console.log("proceed to next page");
            return res.status(200).send("user exits")
        }
        else{
            console.log("not found");
            return res.status(404).send("not found");
        }
    })

});


//home

//signup
app.post("/signup",(req,res)=>{
    //first check if the user already exists 
    sql.check_userdata_exits_signup(db,req.body.id,req.body.username,(state)=>{
        if(state==true){
            console.log("redirect to the login page");
            return res.status(200).send("already exits")
        }
        else{
            //if not then create a new one
            //sql.print_userdata(db);
            sql.add_row_to_userdata(db,req.body.id,req.body.username,req.body.password);
            //sql.print_userdata(db);
            return res.status(200).send("redirect to the login page after creating")
        }
    })
    
});

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Started server on | http://localhost:${PORT}`)
})

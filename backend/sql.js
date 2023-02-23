
const sqlite3 = require('sqlite3').verbose();

function connect_db(){
    const db=new sqlite3.Database('./database.db',sqlite3.OPEN_READWRITE,(err)=>{
        if(err) return console.error(err.message);
    });
    console.log("connected to db");
    return db;
}

function close_db(db){
    db.close();
}

function create_database_table(db){ //used to create the userdata database
    db.run("CREATE TABLE USERDATA (ID int,NAME varchar(255),PASSWORD varchar(255))");

}
function add_row_to_userdata(db,id,name,password){ // used for adding data to userdata while signup
    db.run(`INSERT INTO USERDATA (ID,NAME,PASSWORD) VALUES (?,?,?)`,[id,name,password],(err)=>{
        if(err){
            return console.log(err.message);
        }
    });
}



function print_userdata(db){
    db.all(`SELECT * FROM USERDATA`,[],(err,rows)=>{
        if(err) return console.log(err.message);
        rows.forEach((row)=>{
            console.log(row);
        });
    })
}

function check_userdata_exits(db,id,name,password,callback){ //used to check whether the user data is present
    
    db.all(`SELECT * FROM USERDATA WHERE ID=? AND NAME=? AND PASSWORD=?`,[id,name,password],(err,rows)=>{
        if(err) return console.log(id,name,password,err.message);
        if (rows.length===0){
            
            console.log("USER NOT FOUND");
            callback(false)
            return 
            
        }
        else{
            callback(true)
            console.log("USER FOUND");
            
        
        }

    })
    
}

function check_userdata_exits_signup(db,id,name,callback){ //used to check whether the user data is present
    
    db.all(`SELECT * FROM USERDATA WHERE ID=? AND NAME=?`,[id,name],(err,rows)=>{
        if(err) return console.log(id,name,err.message);
        if (rows.length===0){
            
            console.log("USER NOT FOUND");
            callback(false)
            return 
            
        }
        else{
            callback(true)
            console.log("USER FOUND");
            
        
        }

    })
    
}

db=connect_db();
//create_database_table(db);
//add_row_to_userdata(db,2,"prane","1234");
//print_userdata(db)


// console.log(check_userdata_exits(db,1,"pran","123",(state)=>{
//     console.log(state)
    
// }));


module.exports={connect_db,close_db,create_database_table,add_row_to_userdata,check_userdata_exits,print_userdata,check_userdata_exits_signup};

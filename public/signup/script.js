import { POST } from "../../Utils.js";

function $(id){
    return document.getElementById(id);
}

$('signup-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    e.target.reset();
    console.log("Added data!");
    POST('/api/add', data);
})
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

app.post('/api/add',(req, res) => {
    console.log(req.body);
})
app.listen(PORT,()=>{
    console.log(`Started server on | http://localhost:${PORT}`)
})

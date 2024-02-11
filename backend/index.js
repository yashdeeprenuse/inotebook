const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')



connectToMongo();
const app = express()
const port = 5000

app.use(cors())

//for accessing req.body we have to use this midddleware
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})



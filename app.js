require('./db/connect')
require('dotenv').config()
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const path = require('path')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.json())


// routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI_03)
        app.listen(port, console.log(`Server is listenin on port ${port}`))        
    } catch (error) {
        console.log(error)
    }
}

start()
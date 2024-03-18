import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/dbConnection.js'
import UserRoutes from './Routes/user.routes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = process.env.PORT

// middlewares 

app.use(express.json())
app.use(cors())
app.use('/api/', UserRoutes)

// Set up the static files serving for the client build directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, './client/build')))
// user routes

// Serve index.html for all other routes (React Router)
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
  })

async function connect(){
    try {
        await connectDB();
        app.listen(port, ()=>{
            console.log(`server is listing on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

connect();



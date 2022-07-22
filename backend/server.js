const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

dotenv.config({path: './backend/config/config.env'})
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

const userRoute = require('./routes/userRoute')
const ticketRoute = require('./routes/ticketRoute')

app.use('/api/users', userRoute)
app.use('/api/tickets', ticketRoute)


app.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to the ticket-app'})
} )

app.listen(PORT, () => console.log(`app is running on port ${PORT}`))
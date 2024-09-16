
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')

// express app
const app = express()
//middleware
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
// app.get('/', (req, res) => {
// 	res.json({msg:'welcome to the app'})
// })

app.use('/api/workout', workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URI)
	.then(() => {
		console.log('Connected')
	}).catch((error) => {
		console.log(error)
	})

//listen for requests
app.listen(process.env.PORT, () => {
	console.log('listening on port 4000')
})

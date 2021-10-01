const express = require('express')
const app = express()
const mongoose = require('mongoose')

const motorAPI = require('./routes/motorAPI')

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dbURL = 'mongodb://127.0.0.1:27017/partspro'

const connect = async () => {
  try {
    await mongoose.connect(dbURL)
    console.log(`MongoDB Connected: ${dbURL}`)
  } catch (err) {
    console.error(err)
  }
}

connect()

app.get('/', (req, res) => {
  res.send('Home')
})

app.use('/api', motorAPI)

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('Node server is running on port 5000')
})

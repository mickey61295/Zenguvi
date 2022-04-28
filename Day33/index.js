// obvious requirement
import express from 'express'
// environment variables
import dotenv from 'dotenv'
// filesystem
import * as fs from 'fs'

// Create Express App
const app = express()

// Load local environment variables
dotenv.config()

// Read Port from .env file
const PORT = process.env.PORT || 4001

// Get unix Time stamp
const ts_ms = +new Date()

// Get time and date as a string
const ts_str = new Date()

// add 5.5 hours to ts_str
ts_str.setHours(ts_str.getHours() + 5.5)

// convert ts_str to ISO String for file name
const date = ts_str.toISOString()

// Getting only date and time from date string
const date_str = date.slice(0, 10) + 'T' + date.slice(11, 19).replace(/:/g, ' ')

app.get('/', (req, res) => {
	res.send('Welcome to Day 33 Task')
})

// Create a file with the current time and date
app.get('/writetime', (req, res) => {
	fs.writeFile(
		`./Timestamp/${date_str}.txt`,
		`Unix_Timestamp: ${ts_ms}\nDate-Time: ${ts_str}`,
		{ flag: 'w' },
		(err) => {
			if (err) {
				throw err
			} else {
				console.log('File created')
			}
			res.send(`${ts_ms}\n${ts_str}`)
		}
	)
})

// Read all files 'txt' from the Timestamp directory
app.get('/allfiles', (req, res) => {
	const files = fs
		.readdirSync('./Timestamp')
		.filter((file) => file.includes('.txt'))
	res.send(files)
})

// Start the server on the given port
app.listen(PORT, () => {
	console.log('Day33 listening on port ' + PORT)
})

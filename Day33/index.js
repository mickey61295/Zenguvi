import express from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 4001

const ts_ms = +new Date()
const ts_str = new Date()
// add 5.5 hours to ts_str
ts_str.setHours(ts_str.getHours() + 5.5)
const date = ts_str.toISOString()

// slice date upto 10th character
const date_str = date.slice(0, 10) + 'T' + date.slice(11, 19).replace(/:/g, ' ')

console.log(date)

app.get('/', (req, res) => {
	res.send('Welcome to Day 33 Task')
})

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

app.get('/allfiles', (req, res) => {
	const files = fs
		.readdirSync('./Timestamp')
		.filter((file) => file.includes('.txt'))
	res.send(files)
})

app.listen(PORT, () => {
	console.log('Example app listening on port ' + PORT)
})

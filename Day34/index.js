import express from 'express'
import dotenv from 'dotenv'
import { rooms } from './rooms.js'

const app = express()

app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 4001

app.get('/', (req, res) => {
	res.send("Welcome to Day 34's Task")
})

let bookedRooms = []

app.post('/createroom', (req, res) => {
	const { name, numberOfSeats } = req.body
	let key = []
	for (let i = 0; i < rooms.length; i++) {
		key.push(rooms[i].name)
	}
	if (key.includes(name)) {
		res.send('Room already exists')
	} else {
		rooms.push({
			name: name,
			numberOfSeats: numberOfSeats,
			booked: false,
			bookedBy: null,
			priceperhour: '$' + (numberOfSeats * 10).toString(),
		})
		res.send(rooms)
	}
})

app.post('/bookroom', (req, res) => {
	const { name, date, startTime, endTime, roomId } = req.body
	let key = []
	for (let i = 0; i < rooms.length; i++) {
		key.push(rooms[i].name)
	}
	if (key.includes(roomId)) {
		rooms.forEach((room) => {
			if (room.name === roomId) {
				if (room.booked === false) {
					room.booked = true
					room.bookedBy = name
					room.bookedDate = date
					room.bookedStartTime = startTime
					room.bookedEndTime = endTime
					res.send(rooms)
				} else {
					res.send('Room is already booked')
				}
			}
		})
	} else {
		res.send('Room does not exist')
	}
})

app.get('/bookedrooms', (req, res) => {
	let bookedRooms = []
	rooms.forEach((room) => {
		if (room.booked === true) {
			bookedRooms.push({
				name: room.name,
				booked: room.booked,
				bookedBy: room.bookedBy,
				bookedDate: room.bookedDate,
				bookedStartTime: room.bookedStartTime,
				bookedEndTime: room.bookedEndTime,
			})
		}
	})
	res.send(bookedRooms)
})

app.get('/bookedcustomers', (req, res) => {
	let bookedCustomers = []
	rooms.forEach((room) => {
		if (room.booked === true) {
			bookedCustomers.push({
				name: room.bookedBy,
				room: room.name,
				date: room.bookedDate,
				startTime: room.bookedStartTime,
				endTime: room.bookedEndTime,
			})
		}
	})
	res.send(bookedCustomers)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

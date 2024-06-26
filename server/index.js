const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const route = require('./route')
const {addUser, findUser, getRoomUsers, removeUser} = require("./users");


const app = express()
app.use(cors({origin: '*'}))
app.use(route)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})

io.on('connection', (socket) => {
    socket.on('join', ({name, room}) => {
        socket.join(room)

        const {user, isExist} = addUser({name, room})
        let useMessage = isExist ? `${user.name}, уже в чате` : `Добро пожаловать в чат ${user.name}`
        socket.emit('message', {
            data: {user: {name: "Admin", message: useMessage}}
        });

        socket.broadcast.to(user.room).emit('message', {
            data: {user: {name: "Admin", message: `${user.name} присоединил(ся/ась)`}}
        })

        io.to(user.room).emit('room', {
            data: {users: getRoomUsers(user.room)}
        })
    })

    socket.on('sendMessage', ({message, params}) => {
        const user = findUser(params)

        if (user) {
            io.to(user.room).emit('message', {data: {user: user, message}})
        }
    })

    socket.on('leftRoom', ({params}) => {
        const user = removeUser(params)

        if (user) {
            const {room, name} = user
            io.to(room).emit('message', {data: {user: {name: "Admin",message: `${name} вышел из чата`}}})
            io.to(room).emit('room', {data: {users: getRoomUsers(room)}})
        }
    })


    io.on('disconnect', () => {
        console.log('Отключение')
    })
})

server.listen('5000', () => {
    console.log('Сервер запущен')
})
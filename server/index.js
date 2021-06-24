const http = require('http').createServer()
const io = require('socket.io')(http,{
    cors:{origin:'*'}
})

var users = {}

io.on('connection',(socket)=>{
    console.log('User connected')
    socket.emit('userConnect','A new user has arrived')
    socket.on('addUser',userName=>{
        users[socket.id] = userName
    })
    socket.on('message',content=>{
        io.emit('message', `${users[socket.id]}(${socket.id}) said ${content}`)
    })
})

http.listen(8080,()=>console.log('App started'))
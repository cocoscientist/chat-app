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
        io.emit('userFinalConnect',Object.keys(users).length)
    })
    socket.on('message',content=>{
        io.emit('message', `${users[socket.id]}(${socket.id.substr(0,4)}) said ${content}`)
    })
    socket.on('disconnect',()=>{
        let userName = users[socket.id]
        delete users[socket.id]
        io.emit('exit', {message:`${userName}(${socket.id.substr(0,4)}) disconnected`,count:Object.keys(users).length})
    })
})

http.listen(8080,()=>console.log('App started'))
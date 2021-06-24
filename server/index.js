const http = require('http').createServer()
const io = require('socket.io')(http,{
    cors:{origin:'*'}
})

var users = []

io.on('connection',(socket)=>{
    console.log('User connected')

})

http.listen(8080,()=>console.log('App started'))
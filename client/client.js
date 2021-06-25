const socket = io('ws://localhost:8080')
socket.on('userConnect',receiveData=>{
    const listElem = document.createElement('li')
    listElem.innerText = receiveData
    document.querySelector('ul').appendChild(listElem)
    socket.emit('addUser',prompt("Enter your name:"))
})
socket.on('message',text=>{
    const listElem = document.createElement('li');
    listElem.innerText = text
    document.getElementById('mainChat').appendChild(listElem)
})
socket.on('exit',exitMsg=>{
    const listElem = document.createElement('li');
    listElem.innerText = exitMsg
    document.getElementById('mainChat').appendChild(listElem)
})

document.querySelector('button').onclick = () =>{
    const text = document.querySelector('input').value
    socket.emit('message',text)
}
const socket = io('ws://localhost:8080')

function makeListItem(innText,idOfList){
    const listElem = document.createElement('li')
    listElem.innerText = innText
    document.getElementById(idOfList).appendChild(listElem)
}

socket.on('userConnect',receiveData=>{
    makeListItem(receiveData,'usersStore')
    socket.emit('addUser',prompt("Enter your name:"))
})
socket.on('userFinalConnect',receiveData=>{
    makeListItem(receiveData,'usersStore')
})
socket.on('message',text=>{
    makeListItem(text,'mainChat')
})
socket.on('exit',exitMsg=>{
    makeListItem(exitMsg,'mainChat')
})

document.querySelector('button').onclick = () =>{
    const text = document.querySelector('input').value
    socket.emit('message',text)
}
const socket = io('ws://localhost:8080')

function makeListItem(innText,idOfList){
    const listElem = document.createElement('li')
    listElem.innerText = innText
    document.getElementById(idOfList).appendChild(listElem)
}

function changeCount(num,idOfList){
    document.getElementById(idOfList).innerText = num
}

socket.on('userConnect',receiveData=>{
    makeListItem(receiveData,'mainChat')
    socket.emit('addUser',prompt("Enter your name:"))
})
socket.on('userFinalConnect',userSize=>{
    changeCount(userSize,'numUsers')
})
socket.on('message',text=>{
    makeListItem(text,'mainChat')
})
socket.on('exit',exitMsg=>{
    makeListItem(exitMsg.message,'mainChat')
    changeCount(exitMsg.count,'numUsers')
})

document.querySelector('button').onclick = () =>{
    const text = document.querySelector('input').value
    socket.emit('message',text)
}
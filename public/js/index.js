
let $ = require('jquery')


let io = require('socket.io-client')
let socket = io('http://127.0.0.1:8000')

// ESNext in the browser!!!
socket.on('connect', () => console.log('connected'))



// Enable the form now that our code has loaded
$('#send').removeAttr('disabled')


let $template = $('#template')

socket.on('im', msg => {
    let $li = $template.clone().show()
    $li.children('span').text(msg)
    $('#messages').append($li)
})
$('form').submit(() => {
    socket.emit('im', $('#m').val())
    $('#m').val('')
    return false
})
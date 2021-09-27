function fazpost(url, body) {
    var request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }
    window.document.getElementById('username').value = ''
    window.document.getElementById('password').value = ''
    return request.responseText
}


function enviar() {
    event.preventDefault()
    var url = "http://127.0.0.1:5000/api/auth/"
    var username = window.document.getElementById('username').value
    var password = window.document.getElementById('password').value

    body = {
        "username": username,
        "password": password
    }

    fazpost(url, body)
}

const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFunc(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}


inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
});

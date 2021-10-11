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



// Recebe todos os usuários
// async function readUsers(){
//     const response = await axios.get('http://127.0.0.1:5000/api/users/')

//     console.log(response.data)
// }


function setCookie(cname,cvalue,days) {
    let expires = "";
    if (days != 0) {
        let age = days*24*60*60; // tempo em segundos
        expires = `Max-Age = ${age};`;
    }
    else {
        expires = "";
    }
    document.cookie = `${cname} = ${cvalue}; ${expires}; Path=/`;
}

async function readForm(){
    let formEmail = window.document.getElementById('email')
    let formPassword = window.document.getElementById('password')
    let body = {
        email: formEmail.value,
        password: formPassword.value
      }
    axios.post('https://mitmirror.herokuapp.com/api/auth/', body).then((response) => {
        let status = response.status
        let token = response.data['Authorization']

        if (token && status === 200) {
            setCookie('Authorization-token', token, 0)
            window.location.href='welcome.html'
        }
    }).catch((error) => {
        console.log(error);
        console.log('Ops, algo deu errado!');
        window.location.href='erro.html'
    });
}

// Função para enviar os dados para a API
// function makePost(url, body) {
//     let request = new XMLHttpRequest()
//     request.open("POST", url, true)
//     request.setRequestHeader("Content-type", "application/json")
//     request.send(JSON.stringify(body))

//     request.onload = function() {
//         console.log(this.responseText)
//     }
//     window.document.getElementById('username').value = ''
//     window.document.getElementById('password').value = ''
//     return request.responseText
// }


// function readForm() {
//     event.preventDefault()
//     var url = "http://127.0.0.1:5000/api/auth/"
//     var username = window.document.getElementById('username').value
//     var password = window.document.getElementById('password').value

//     body = {
//         "username": username,
//         "password": password
//     }

//     fazpost(url, body)
// }


// Animações nos campos de formulário
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


// Seta cookies no navegador
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
    let loading = document.querySelector('.loading')
    let register = document.querySelector('#notfound')
    let formEmail = window.document.getElementById('email')
    let formPassword = window.document.getElementById('password')
    let body = {
        email: formEmail.value,
        password: formPassword.value
      }
    loading.style.display = "flex"

    await axios.post('https://mitmirror.herokuapp.com/api/auth/', body, {headers: {"Permissions-Policy": "interest-cohort=()"}})
    .then((response) => {
        let status = response.status
        let headers = response.headers
        let token = response.data['Authorization']

        if (token && status === 200) {
            loading.style.display = "none"
            console.log(`Deu tudo certo graças a Deus!`)
            window.location.href='welcome.html'
            // setCookie('Authorization-token', token, 0)
        }
    }).catch((error) => {
        if (error == 'Error: Request failed with status code 403' ||
            error == 'Error: Request failed with status code 401') {
            register.style.display = "block"
            loading.style.display = "none"
        } else if (error == 'Error: Request failed with status code 500') {
            readForm()
        }

        // window.location.href='erro.html'
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


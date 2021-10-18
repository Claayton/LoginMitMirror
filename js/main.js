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

// Validando Formulário
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const submitButton = document.querySelector('.btn');

const icons = document.querySelectorAll('.i i');
const labels = document.querySelectorAll('h5');
const loading = document.querySelector('.loading')
const register = document.querySelector('#notfound')

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    if (emailValue === '' && passwordValue === '') {
        emailInput.blur()
        register.style = 'display: block;'
        register.textContent = 'please, fill out the fields!'
        icons.forEach (icon => {
            icon.style = 'color: hsla(0, 100%, 50%, 0.294);';
        })
        labels.forEach (label => {
            label.style = 'color: hsla(0, 100%, 50%, 0.294);';
        })
        setTimeout(() => {
            emailInput.focus()
            icons.forEach (icon => {
                icon.style = 'color: #bbbbbb;';
            })
            labels.forEach (label => {
                label.style = 'color: #eee;';
            })
        }, 500);
        setTimeout(() => {
            register.style = 'display: none;'
            register.textContent = 'incorrect credentials!'
        }, 4000);
    } else if (emailValue === '') {
        emailInput.blur()
        register.style = 'display: block;'
        register.textContent = 'please, fill out the fields!'
        icons[0].style = 'color: hsla(0, 100%, 50%, 0.294);';
        labels[0].style = 'color: hsla(0, 100%, 50%, 0.294);';

        setTimeout(() => {
            emailInput.focus()
            icons[0].style = 'color: #bbbbbb;';
            labels[0].style = 'color: #eee;';
        }, 500);
        setTimeout(() => {
            register.style = 'display: none;'
            register.textContent = 'incorrect credentials!'
        }, 4000);
    } else if (passwordValue === '') {
        passwordInput.blur()
        register.style = 'display: block;'
        register.textContent = 'please, fill out the fields!'
        icons[1].style = 'color: hsla(0, 100%, 50%, 0.294);';
        labels[1].style = 'color: hsla(0, 100%, 50%, 0.294);';

        setTimeout(() => {
            passwordInput.focus()
            icons[1].style = 'color: #bbbbbb;';
            labels[1].style = 'color: #eee;';
        }, 500);
        setTimeout(() => {
            register.style = 'display: none;'
            register.textContent = 'incorrect credentials!'
        }, 4000);
    } else {
        readForm()
    }
})

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
    loading.style.display = "flex"

    await axios.post('https://mitmirror.herokuapp.com/api/auth/',   {
        email: emailInput.value,
        password: passwordInput.value
    }, {
        headers:{
            "Permissions-Policy": "interest-cohort=()"
        }
    }).then((response) => {
        let status = response.status
        let headers = response.headers
        let token = response.data['Authorization']
        
        if (token && status === 200) {
            loading.style.display = "none"
            console.log(`Deu tudo certo graças a Deus!`)
            window.location.href='welcome.html'
            setCookie('Authorization-token', token, 0)
        }
    }).catch((error) => {
        if (error == 'Error: Request failed with status code 403' ||
        error == 'Error: Request failed with status code 401') {
            emailInput.value = ''
            passwordInput.value = ''
            icons.forEach (icon => {
                icon.style = 'color: hsla(0, 100%, 50%, 0.294);';
            })
            labels.forEach (label => {
                label.style = 'color: hsla(0, 100%, 50%, 0.294);';
            })
            loading.style.display = "none"
            register.style.display = "block"
            setTimeout(() => {
                icons.forEach (icon => {
                    icon.style = 'color: #bbbbbb;';
                })
                labels.forEach (label => {
                    label.style = 'color: #eee;';
                })                
                passwordInput.focus()
                passwordInput.blur()
                emailInput.focus()
            }, 500);
            setTimeout(() => {
                register.style.display = "none"
            }, 4000);
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
                
                
// Recebe todos os usuários
// async function readUsers(){
//     const response = await axios.get('http://127.0.0.1:5000/api/users/')

//     console.log(response.data)
// }

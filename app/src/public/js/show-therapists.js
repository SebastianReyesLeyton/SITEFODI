const password = document.querySelector('.password')
let passwd = password.innerHTML
let tmp = '';
password.innerHTML = '';

for( let i = 0; i < passwd.length ; i++) {
    password.innerHTML += '•';
}

console.log(tmp)
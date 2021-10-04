const avatars = [
    '/img/avatar-astr.png',
    '/img/avatar-boss.png',
    '/img/avatar-baby1.png',
    '/img/avatar-baby2.png',
    '/img/avatar-babygirl.png',
    '/img/avatar-dog.png',
    '/img/avatar-fox.png',
    '/img/avatar-girl.png',
    '/img/avatar-girl2.png',
    '/img/avatar-hams.png',
    '/img/avatar-sonic.png',
    '/img/avatar-tiger.png',
    '/img/avatar-unicorn.png'
];
const avatar_div = document.querySelector('#avatar');
const avatar_options = document.querySelector('.avatar-options');
const avatar_file = document.querySelector('#avatar-file');

let avatar = Math.floor((Math.random() * 10)) % avatars.length;

for (let i = 0; i < avatars.length; i++) {
    avatar_options.innerHTML += `<img src="${avatars[i]}" class="avatar-option" onclick="assing_avatar(${i})">`
}

function initiatizate(id) {
    avatar_div.src = `${avatars[id]}`;
    avatar_file.value = `${avatars[id]}`;
    document.querySelector('.container-avatars').hidden = true;
}

function assing_avatar(id) {
    avatar_div.src = `${avatars[id]}`;
    avatar_file.value = `${avatars[id]}`;
    document.querySelector('.container-avatars').style.animation = 'visiblenow 1s';
    document.querySelector('.container-avatars').hidden = true;
}

function show_options() {
    document.querySelector('.container-avatars').style.animation = 'aparecer 1s';
    document.querySelector('.container-avatars').hidden = false;
}

initiatizate(avatar)
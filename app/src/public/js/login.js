const avatars = ['/img/avatar-boy.png', '/img/avatar-dog.png', '/img/avatar-girl.png', '/img/avatar-girl2.png', '/img/avatar-astr.png', '/img/avatar-hams.png'];
const avatar_div = document.querySelector('#avatar');
const avatar_options = document.querySelector('.avatar-options');
const avatar_file = document.querySelector('#avatar-file');

let avatar = Math.floor((Math.random() * 10)) % avatars.length;

for (let i = 0; i < avatars.length; i++) {
    avatar_options.innerHTML += `<img src="${avatars[i]}" class="avatar-option" onclick="assing_avatar(${i})">`
}

function assing_avatar(id) {
    avatar_div.src = `${avatars[id]}`;
    avatar_file.value = `${avatars[id]}`;
}

assing_avatar(avatar)
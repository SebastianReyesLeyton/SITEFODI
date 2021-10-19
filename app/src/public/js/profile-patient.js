const btn = document.querySelector('.disable-buttons');

const gender = document.querySelector('#gender');
const fullname = document.querySelector('#fullname');
const numDoc = document.querySelector('#docNum');
const documentType = document.querySelector('#documentType');
const age = document.querySelector('#age');
const email = document.querySelector('#email');
const leftHearingAid = document.querySelector('#leftHearingAid');
const rightHearingAid = document.querySelector('#rightHearingAid');
const passwd = document.querySelector('#passwd');

const values = {
    gender: gender.value,
    fullname: fullname.value,
    numDoc: numDoc.value,
    documentType: documentType.value,
    age: age.value,
    email: email.value,
    leftHearingAid: leftHearingAid.value,
    rightHearingAid: rightHearingAid.value,
    passwd: passwd.value
}

console.log(values)

function notShowButtons() {
    btn.style.display = 'none';
}

function createFills(){}

function showButtons() {
    btn.style.display = 'flex';
    gender.disabled = false;
    fullname.disabled = false;
    numDoc.disabled = false;
    documentType.disabled = false;
    age.disabled = false;
    email.disabled = false;
    leftHearingAid.disabled = false;
    rightHearingAid.disabled = false;
    passwd.disabled = false;

    gender.required = true;
    fullname.required = true;
    numDoc.require = true;
    documentType.require = true;
    age.require = true;
    email.require = true;
    leftHearingAid.require = true;
    rightHearingAid.require = true;
    passwd.require = true;
}

function cancel() {

    notShowButtons();

    gender.value = values.gender
    fullname.value = values.fullname
    numDoc.value = values.numDoc
    documentType.value = values.documentType
    age.value = values.age
    email.value = values.email
    leftHearingAid.value = values.leftHearingAid
    rightHearingAid.value = values.rightHearingAid
    passwd.value = values.passwd

    gender.disabled = true;
    fullname.disabled = true;
    numDoc.disabled = true;
    documentType.disabled = true;
    age.disabled = true;
    email.disabled = true;
    leftHearingAid.disabled = true;
    rightHearingAid.disabled = true;
    passwd.disabled = true;

    gender.required = false;
    fullname.required = false;
    numDoc.require = false;
    documentType.require = false;
    age.require = false;
    email.require = false;
    leftHearingAid.require = false;
    rightHearingAid.require = false;
    passwd.require = false;
}

notShowButtons()
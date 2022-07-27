const password = document.querySelector('.password');
const passConfirm = document.querySelector('.pass-confirm');
const btnSubmit = document.querySelector('.btn-submit');

passConfirm.addEventListener('input',(e) => {
    if (password.value == e.target.value){
        btnSubmit.removeAttribute('disabled','')
    }else{
        btnSubmit.setAttribute('disabled','')
    }
})

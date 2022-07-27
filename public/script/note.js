// navbar
const inputSearch = document.querySelector('.input-search')
const logout = document.querySelector('.logout');
let id ;
// cards
const cards = document.querySelectorAll('.cards');
const icPlus = document.querySelector('.ic-plus');
const btnAct = document.querySelectorAll('.btn-act');
const colors = document.querySelector('.colors');
const allColors = document.querySelectorAll('.color');
const inputColor = document.querySelector('.inpt-color');

// text area
const titleInput = document.querySelectorAll('.title-input')
const textInput = document.querySelectorAll('.text-input')
const cardSect = document.querySelector('.cards-section');

window.addEventListener('load',() => {
    id = logout.getAttribute('data-id')
    allColors.forEach(el => {
        const dataColor = el.getAttribute('data-color');
        el.style.color = dataColor;
    })
})

window.addEventListener('click',(e) => {
    if (e.target.nodeName !== 'INPUT'){
        inputSearch.value = 'search note'
    }
})

cardSect.addEventListener('keyup',(e) => {
    if (e.target.nodeName == 'TEXTAREA' && e.target.classList.contains('title-input')){
        const textValue = e.target.value
        if (e.key == 'Enter'){
            // remove enter character
            e.target.value = textValue.split('').filter(e => e !== '\n').join('');
            e.target.nextElementSibling.focus()
        }
    }
})

inputSearch.addEventListener('focus',() => {
    inputSearch.value = ''
})

logout.addEventListener('click',(e) => {
    window.location.href = `/logout?id=${id}`;
})

allColors.forEach(el => {
    el.addEventListener('click',(e) => {
        const dataColor = el.getAttribute('data-color');
        cards[0].style.backgroundColor = dataColor;
        cards[0].setAttribute('data-color',dataColor);
    })
})

icPlus.addEventListener('mouseover',() => {
    icPlus.style.opacity = 1
    cards[0].style.opacity = 1
})
icPlus.addEventListener('mouseout',() => {
    icPlus.style.opacity = 0.8
    cards[0].style.opacity = 0.8
})
icPlus.addEventListener('click',() => {
    const dataColor = cards[0].getAttribute('data-color');
    const dataUser = cards[0].getAttribute('data-user');
    cards[0].innerHTML = `
    <form action="/note" method="post" class="d-flex flex-column"">
        <textarea class="title-input" name="title" id="" cols="30" rows="1" spellcheck="false"></textarea>
        <textarea class="text-input" name="text" id="" cols="30" rows="10"spellcheck="false"></textarea>
        <input class="inpt-color" type="hidden" name="color" value=${dataColor}>
        <input class="inpt-user" type="hidden" name="user" value=${dataUser}>
        <div class="action">
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk btn-act" data-act="save"></i></button>        
            <i class="fa-solid fa-pen-to-square btn-act" data-act="edit"></i>
            <i class="fa-solid fa-trash btn-act" data-act="delete"></i>
        </div>
    </form>
    `
})

btnAct.forEach(el => {
    el.addEventListener('click',(e) => {
        const action = e.target.getAttribute('data-act');
        const id = e.target.getAttribute('data-id');
        if (action == 'delete'){
            Swal.fire({
                title: 'Are you sure?',
                text: "Delete this Note",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success',
                ).then(result => window.location.href = `/note/delete?id=${id}`)
                    // window.location.href = `/note/delete?id=${id}`
                }
              })
            // if(confirm('delete this note')){
            //     window.location.href = `/note/delete?id=${id}`
            // }
        }
    })
})
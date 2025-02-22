const formCreate = document.querySelector('.create_form');
const formEdit = document.querySelector('.edit_form');
const addBtn = document.querySelector('.add_user');
const sortBtn = document.querySelector('.sort_user');
const message = document.querySelector('.message');
const messageEdit = document.querySelector('.message_edit');
const overflow = document.querySelector('.overflow');
const overflowEdit = document.querySelector('.overflow_edit');
const table = document.querySelector('table');

let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
let editId ;

// add to local storage
function addLocal() {
  localStorage.setItem('users', JSON.stringify(data))
}

// add person
function addPerson() {
  table.innerHTML = ``
  data.forEach((item, i) => {
    table.innerHTML += `
      <tr>
        <td class="oneItem">${i + 1}</td>
        <td class="first_name">${item.Fname}</td>
        <td class="second_name">${item.Lname}</td>
        <td class="bal">${item.score}</td>
        <td onclick="delet(${i})" class="delete_item"><i class="fa-solid fa-trash"></i></td>
        <td onclick="editUser(${i})" class="edit_item"><i class="fa-solid fa-pen"></i></td>
      </tr>
    `
  })
}

// adding modal overflow
addBtn.addEventListener('click', () => {
  overflow.classList.toggle('d-none')
})
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('overflow')) {
    overflow.classList.add('d-none')
  }
})
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('overflow_edit')) {
    overflowEdit.classList.add('d-none')
  }
})




// event submit
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()

  let First_name = formCreate.Fname.value;
  let Last_name = formCreate.Lname.value;
  let scoreOf = formCreate.score.value;

  if(First_name.length && Last_name.length && scoreOf.length) {
    data.push({Fname: First_name, Lname: Last_name, score: scoreOf})
    addPerson()
    addLocal()
    hundleBtn()
    formCreate.reset();
    overflow.classList.add('d-none')
  } else {
    message.classList.remove('d-none')
    setTimeout(() => {
        message.classList.add('d-none')
    }, 2500);
  }
})
addPerson()

// edit form
formEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  let First_name = formEdit.Fname_edit.value;
  let Last_name = formEdit.Lname_edit.value;
  let scoreOf = formEdit.score_edit.value;

  
  if(First_name.length && Last_name.length && scoreOf.length) {
    let newUser = data.map((user, i) => {
      if(editId == i) {
        return {...user, Fname: First_name, Lname: Last_name, score: scoreOf}
      } else {
        return {...user}
      }
    })
    data = newUser;
    addPerson()
    addLocal()
    hundleBtn()
    formEdit.reset();
    overflowEdit.classList.add('d-none')
  } else {
    messageEdit.classList.remove('d-none')
    setTimeout(() => {
        messageEdit.classList.add('d-none')
    }, 2500);
  }
})


// delete btn
function delet(id) {
  let filterdData = data.filter((item, i) => {
    return i != id
  })
  data = filterdData
  addPerson()
  addLocal()
  hundleBtn()
}

// edit user
function editUser(id) {
  overflowEdit.classList.remove('d-none')
  editId = id;
}

// hunde Function
function hundleBtn()  {
  if(!data.length) {
    table.innerHTML = `<h1 class="no_user">No Users Yet :(</h1>`
    addBtn.style.width = '300px'
    document.querySelector('.sort_user').classList.add('hidden')
  } else {
    addBtn.style.width = '150px'
    document.querySelector('.sort_user').classList.remove('hidden')
  }
}
document.addEventListener('DOMContentLoaded', ()=> {
  hundleBtn()
})

// sort user 
sortBtn.addEventListener('click', () => {
  const newData = data.sort((a, b) => {
    return b.score - a.score
  })
  data = newData;
  addPerson()
  addLocal()
  hundleBtn()
})

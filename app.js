const formCreate = document.querySelector('form');
const result = document.querySelector('ul');
const message = document.querySelector('.message');

let data = []




function addPerson() {
  result.innerHTML = ``
  data.forEach((item, i) => {
    result.innerHTML += `
    <li>
    <h5>${item.Fname} ${item.Lname}</h5>
    <div class="info">
      <i class="fa-solid fa-user"></i>
      <span>${item.age}-yosh</span>
    </div>
    <div class="info">
      <i class="fa-solid fa-phone"></i>
      <a href="tel:${item.phone}">${item.phone}</a>
    </div>
    <div class="info">
      <i class="fa-solid fa-envelope"></i>
      <a href="https://${item.email}">${item.email}</a>
    </div>
    <div class="delete" onclick="delet(${i})">
      <i class="fa-solid fa-delete-left "></i>
    </div>
  </li>
    `
  })

}

formCreate.addEventListener('submit', (e) => {
  e.preventDefault()

  let First_name = formCreate.Fname.value;
  let Last_name = formCreate.Lname.value;
  let ageOf = formCreate.age.value;
  let emailOf = formCreate.email.value;
  let phoneOf = formCreate.phone.value;



  if(First_name.length && Last_name.length && ageOf.length && emailOf.length && phoneOf.length) {
    data.push({Fname: First_name, Lname: Last_name, age: ageOf, email: emailOf, phone: phoneOf})
    addPerson()
    formCreate.reset();
  } else {
    message.classList.remove('d-none')
    setTimeout(() => {
        message.classList.add('d-none')
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
}
if(!data.length) {
  result.innerHTML = `<h1 class="text-secondary text-center">No users</h1>`
}
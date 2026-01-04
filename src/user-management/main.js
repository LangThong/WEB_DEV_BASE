const form = document.getElementById("userForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const roleSelect = document.getElementById("role")
const btnCancel = document.getElementById("btnCancel")

const errorName = document.getElementById("errorName")
const errorEmail = document.getElementById("errorEmail")
const errorRole = document.getElementById("errorRole")

const userList = document.getElementById("userList")

const roles = [
    {id: 1, name: "Admin"},
    {id: 2, name: "Editor"},
    {id: 3, name: "User"}

]

let users = []
let editId = null

function renderRoleOptions(){
    roleSelect.innerHTML  = ""
    const optionSelect = document.createElement("option")
    optionSelect.textContent = "---Chọn vai trò---"
    optionSelect.value = ""
    roleSelect.appendChild(optionSelect)

    roles.forEach(r =>{
        const option = document.createElement("option")
        option.value = r.name
        option.textContent = r.name
        roleSelect.appendChild(option)
    })
}
//init
function init(){
    renderRoleOptions()
    users = getAllUsers()
    renderList(users)
}
init()
//rederList
function renderList(list){
    userList.innerHTML = ""
    list.forEach(user =>{
        const li = document.createElement("li")
        li.innerHTML = `
            ${user.name} |  ${user.role} | ${user.email}
            <button data-action="edit" data-id="${user.id}">Sửa</button>
            <button data-action="delete" data-id="${user.id}">Xóa</button>
        `
        userList.appendChild(li)
    })
}
function validate(){
    let valid = true

    errorName.textContent= ""
    errorEmail.textContent= ""
    errorRole.textContent= ""

    if(nameInput.value.trim().length < 3){
        errorName.textContent = "Tên tối thiểu 3 ký tự"
        valid = false
    }
    const email = emailInput.value.trim().toLowerCase() 
    const emailExists = users.some( // users.some trả về true có ít nhất 1 user thỏa điều kiện
        u => u.email === email && u.id !== editId // .id !== editId  và Không phải user đang sửa
    )
    if(!email){
        errorEmail.textContent = "Vui lòng nhập email"
        valid = false
    }else if(!emailInput.checkValidity()){
        errorEmail.textContent = "email không hợp lệ"
        valid = false
    }else if(emailExists){
        errorEmail.textContent = "email đã tồn tại"
        valid = false
    }
    if(!roleSelect.value){
        errorRole.textContent = "Vui lòng chọn vại trò"
    }
    return valid

}
form.addEventListener("submit", function(e) {
    e.preventDefault()
    if(!validate()) return
    
    const user = {
        id: editId || Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        role: roleSelect.value
    }
    if(editId){
        uppdateUser(user)
    }else {
        addUser(user)
    }
    users = getAllUsers()
    renderList(users)
    resetForm()
})
function resetForm(){
    form.reset()
    console.log("trước",editId)
    editId = null // không sửa quay lại thêm
    console.log("Sau",editId)
    btnCancel.hidden = true
}
userList.addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return

  const id = Number(e.target.dataset.id)
  const action = e.target.dataset.action
  const user = users.find(u => u.id === id)
  if (action === "edit") {
    nameInput.value = user.name
    emailInput.value = user.email
    roleSelect.value = user.role
    editId = id
    btnCancel.hidden = false
  }

  if (action === "delete") {
    if (confirm(`Bạn chắc chắn muốn xóa ${user.name}?`)) {
      removeUser(id)
      users = getAllUsers()
      renderList(users)
    }
  }
});
btnCancel.addEventListener("click", function () {
  resetForm()
})
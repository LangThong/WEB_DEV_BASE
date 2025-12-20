const Storage_Key = "envent-registration"

function getRegistrations(){
  return JSON.parse(localStorage.getItem(Storage_Key)) || []
}
function  saveRegistration(data){
  const list = getRegistrations() // lấy ds hiên tại
  list.push(data)
  localStorage.setItem(Storage_Key, JSON.stringify(list))
}
function deleteRegistration(id){
  const list = getRegistrations().filter(item => item.id !== id) // Lọc bỏ phần tử có id trùng
  localStorage.setItem(Storage_Key, JSON.stringify(list))
}
function  clearRegistrations(){
  localStorage.removeItem(Storage_Key)
}
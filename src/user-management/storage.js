const storageKey = "users"
function getAllUsers(){
    return JSON.parse(localStorage.getItem(storageKey)) || []
}
function saveUsers(users){
    localStorage.setItem(storageKey, JSON.stringify(users))
}
function  addUser(user){
    const users = getAllUsers()
    users.push(user)
    saveUsers(users)
}
function updateUser(user){
    const users = getAllUsers().map(
        u => u.id === user.id ? user : u
    )
    saveUsers(users)
}
function removeUser(id){
    const users = getAllUsers().filter(u => u.id !== id)
    saveUsers(users)
}
function clearUsers(){
    localStorage.removeItem(storageKey)
}

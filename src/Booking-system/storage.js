const storageKey = "bookingList"

function getBookings(){
  return JSON.parse(localStorage.getItem(storageKey)) || []
}

function saveBooking(booking){
  const list = getBookings()
  list.push(booking)
  localStorage.setItem(storageKey, JSON.stringify(list))
}

function deleteBooking(id){
  const list = getBookings().filter(item => item.id !== id)
  localStorage.setItem(storageKey, JSON.stringify(list))
}
function clearBookings(){
  localStorage.removeItem(storageKey)
}
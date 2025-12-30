const STORAGE_KEY = "booking_list"

function getBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

function saveBooking(booking) {
  const list = getBookings()
  list.push(booking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function deleteBooking(id) {
  const list = getBookings().filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function clearBookings() {
  localStorage.removeItem(STORAGE_KEY)
}

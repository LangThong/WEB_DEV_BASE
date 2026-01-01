const stepLocation = document.getElementById("stepLocation")

const bookingState = {
  step: 1,
  service: "",
  date: "",
  timeSlot: "",
  name: "",
  email: "",
  phone: "",
  note: ""
}

const step1 = document.getElementById("step1")
const step2 = document.getElementById("step2")
const step3 = document.getElementById("step3")

const back = document.getElementById("back")
const next = document.getElementById("next")

const errorService = document.getElementById("errorService")
const errorTime = document.getElementById("errorTime")
const errorSlotTime = document.getElementById("errorSlotTime")
const errorName = document.getElementById("errorName")
const errorEmail = document.getElementById("errorEmail")
const errorPhone = document.getElementById("errorPhone")

const nameInput =document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const noteInput = document.getElementById("note")

const btnNew = document.getElementById("btnNew")
const btnList = document.getElementById("btnList")

const bookingList = document.getElementById("bookingList")
const btnclearAll = document.getElementById("clearAll")
const btnBookingBack = document.getElementById("bookingback")

function renderStep(){
  if(!step1 || !step2 || !step3) return

  step1.hidden = bookingState.step !== 1
  step2.hidden = bookingState.step !== 2
  step3.hidden = bookingState.step !== 3

  back.hidden = bookingState.step === 1
  next.textContent = bookingState.step === 3 ? "Xác nhận" : "tiếp tục"

  stepLocation.textContent = `
    Step 1 ${bookingState.step === 1 ? "(current)" : ""} |
    Step 2 ${bookingState.step === 2 ? "(current)" : bookingState.step < 2 ? "(locked)": ""} |
    Step 3 ${bookingState.step === 3? "(current": bookingState.step < 3 ? "(locked)": ""}
  `
}
renderStep()

function validate(){
  if(bookingState.step === 1){
    const checked = document.querySelector(
      'input[name="service"]:checked'
    )
    if(!checked){
      errorService.textContent="Vui lòng chọn dịch vụ"
      return false
    }
    bookingState.service = checked.value
    bookingState.step++
    return true
  }
  if(bookingState.step === 2){
    const dateInput = document.getElementById("date").value
    const timeChecked = document.querySelector(
      'input[name="slotTime"]:checked'
    )
    if(!dateInput){
      errorTime.textContent ="Vui lòng chọn ngày"
      return false
    }
    const today = new Date()
    today.getHours(0,0,0,0)
    if(new Date(dateInput) < today){
      errorTime.textContent = "Không được chọn ngày trong quá khứ"
      return false
    }
    if(!timeChecked){
      errorSlotTime.textContent = "Vui lòng chọn khung giờ"
      return false
    }
    bookingState.date = dateInput
    bookingState.timeSlot = timeChecked.value
    bookingState.step++
    return true
  }
  if (bookingState.step === 3) {
    let valid = true
    const nameValue = nameInput.value.trim()
    const emailValue = emailInput.value.trim()
    const phoneValue = phoneInput.value.trim()
    const noteValue = noteInput.value.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10,11}$/
    if(nameValue < 3){
      errorName.textContent = "tối thiểu 3 ký tự"
      valid = false
    }
    if(!emailPattern.test(emailValue)){
      errorEmail.textContent = "nhập đúng dịnh dạng"
      valid = false
    }
    if(!phoneRegex.test(phoneValue)){
      errorPhone.textContent = "10–11 chữ số"
      valid = false
    }
    if(!valid){
      return false
    }
    saveBooking({
      id: Date.now(),
      service: bookingState.service,
      date: bookingState.date,
      timeSlot: bookingState.timeSlot,
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      note: noteValue
    })

    window.location.href= "success.html"

    return false // không render nữa
  }

}
function clearErrors(){
  errorService.textContent = "",
  errorTime.textContent = "",
  errorSlotTime.textContent = "",
  errorName.textContent = "",
  errorEmail.textContent = "",
  errorPhone.textContent = ""
}
back?.addEventListener("click", () =>{
  clearErrors()
  if(bookingState.step > 1){
    const currentStep = bookingState.step
    bookingState.step = currentStep - 1
    renderStep()
  }
})
next?.addEventListener("click", () =>{
  clearErrors()
  if(!validate()) return
  renderStep()
})
if(btnNew){
  btnNew.onclick = () => {
    return location.href = "index.html"
  }
}
if(btnList){
  btnList.onclick = () => {
    return location.href = "list.html"
  }
}
function renderBookingList() {
  // Xóa danh sách cũ
  bookingList.innerHTML = ""

  const list = getBookings()

  if (list.length === 0) {
    const li = document.createElement("li")
    li.textContent = "Chưa có lịch nào"
    bookingList.appendChild(li)
    return
  }

  list.forEach(item => {
    const li = document.createElement("li")
    li.innerHTML = `
      <b>Dịch vụ: ${item.service}</b> |
      Ngày hẹn: ${item.date} |
      Họ và tên: ${item.name}
      <button data-action="view" data-id="${item.id}">Xem chi tiết</button>
      <button data-action="delete" data-id="${item.id}">Xóa</button>
    `
    bookingList.appendChild(li)
  })
}
bookingList?.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return

  const id = Number(e.target.dataset.id)
  const action = e.target.dataset.action
  const item = getBookings().find(b => b.id === id)

  if (!item) return

  if (action === "delete") {
    if (confirm("Xóa lịch này?")) {
      deleteBooking(id)
      renderBookingList()
    }
  } else if (action === "view") {
    alert(`
      Dịch vụ: ${item.service}
      Ngày: ${item.date}
      Khung giờ: ${item.timeSlot}
      Tên: ${item.name}
      Email: ${item.email}
      SĐT: ${item.phone}
      Ghi chú: ${item.note}
    `)
  }
})
if (bookingList) {
  renderBookingList()
}

if(btnBookingBack){
  btnBookingBack.onclick = () => {
    return location.href = "index.html"
  }
}
if(btnclearAll){
  btnclearAll.addEventListener("click", () =>{
    if(confirm("Hủy tất cả lịch!")){
      clearBookings()
      renderBookingList()
    }
  })
}
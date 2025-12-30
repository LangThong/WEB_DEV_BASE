const stepLocation = document.getElementById("stepLocation")
const step1 =document.getElementById("step1")
const step2 =document.getElementById("step2")
const step3 =document.getElementById("step3")

const back = document.getElementById("back")
const next = document.getElementById("next")

const errorName = document.getElementById("errorName")
const errorEmail = document.getElementById("errorEmail")
const errorPhone = document.getElementById("errorPhone")
const errorTime = document.getElementById("errorTime")

const bookingList = document.getElementById("bookingList")
const btnClearAll = document.getElementById("clearAll")
const btnBookingBack = document.getElementById("bookingback")
const btnNew = document.getElementById("new")
const btnList = document.getElementById("list")

const bookingstate = {
  step: 1,
  service: "",
  date : "",
  timeSlot: "",
  personalInfo: {
      name: "",
      email: "",
      phone: "",
      note: ""
  }
}

function renderStep(){
  if (!step1 || !step2 || !step3) return
  step1.hidden = bookingstate.step !== 1
  step2.hidden = bookingstate.step !== 2
  step3.hidden = bookingstate.step !== 3

  back.hidden = bookingstate.step === 1 // nếu đang step 1 thì ẩn luôn

  next.textContent = bookingstate.step === 3 ? "Xác nhận": "Tiếp tục"

  stepLocation.textContent = `
    Step 1 ${bookingstate.step === 1 ? "(current)" : ""}
    | Step 2 ${bookingstate.step === 2 ? "(current)" : bookingstate.step < 2 ? "(locked)" : ""}
    | Step 3 ${bookingstate.step === 3 ? "(current)" : bookingstate.step < 3 ? "(locked)" : ""}
  `
}
renderStep()

function validate(){
  if(bookingstate.step === 1){
    const checked = document.querySelector(
      'input[name="service"]:checked'
    )
    if (!checked) {
      document.getElementById("errorService").textContent ="Vui lòng chọn dịch vụ"
      return false
    }
    bookingstate.service = checked.value
    bookingstate.step++
    return true
  }
  if (bookingstate.step === 2) {
    const dateInput = document.getElementById("date").value
    const timeChecked = document.querySelector(
      'input[name="timeSlot"]:checked'
    )

    if (!dateInput || !timeChecked) {
      errorTime.textContent ="Vui lòng chọn ngày và khung giờ"
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (new Date(dateInput) < today) {
      errorTime.textContent ="Không được chọn ngày trong quá khứ"
      return false
    }

    bookingstate.date = dateInput
    bookingstate.timeSlot = timeChecked.value
    bookingstate.step++
    return true
  }

  // ===== STEP 3 =====
  if (bookingstate.step === 3) {
    bookingstate.personalInfo.name = document.getElementById("name").value.trim()
    bookingstate.personalInfo.email = document.getElementById("email").value.trim()
    bookingstate.personalInfo.phone = document.getElementById("phone").value.trim()
    bookingstate.personalInfo.note = document.getElementById("note").value.trim()

    let valid = true

    if (bookingstate.personalInfo.name.length < 3) {
      errorName.textContent = "Tên tối thiểu 3 ký tự"
      valid = false
    }

    if (!/^\S+@\S+\.\S+$/.test(bookingstate.personalInfo.email)) {
      errorEmail.textContent = "Email không hợp lệ"
      valid = false
    }

    if (!/^\d{10,11}$/.test(bookingstate.personalInfo.phone)) {
      errorPhone.textContent = "SĐT không hợp lệ"
      valid = false
    }

    if (!valid) return false

    saveBooking({
      id: Date.now(),
      service: bookingstate.service,
      date: bookingstate.date,
      timeSlot: bookingstate.timeSlot,
      ...bookingstate.personalInfo
    })

    window.location.href = "success.html"
    
    return false // không renderStep nữa
  }
}

function clearErrors() {
  errorService.textContent = ""
  errorTime.textContent = ""
  errorName.textContent = ""
  errorEmail.textContent = ""
  errorPhone.textContent = ""
}

next?.addEventListener("click", () =>{
  clearErrors()// xóa lỗi cũ
  if(!validate()) return
  renderStep()
})

back?.addEventListener("click", () => {
  clearErrors() 
  if (bookingstate.step > 1) {
    const currentStep = bookingstate.step
    bookingstate.step = currentStep - 1
    renderStep()
  }
})

if (btnNew) {
  btnNew.onclick = () => location.href = "index.html"
}

if (btnList) {
  btnList.onclick = () => location.href = "list.html"
}

if (bookingList) {
  const list = getBookings()

  if (list.length === 0) {
    const li = document.createElement("li")
    li.textContent = "Chưa có lịch nào"
    bookingList.appendChild(li)
  } else {
    list.forEach(item => {
      const li = document.createElement("li")
      li.innerHTML = `
        <b>${item.service}</b> |
        ${item.date} |
        ${item.timeSlot} |
        ${item.name}
        <button data-action="view" data-id="${item.id}">Xem chi tiết</button>
        <button data-action="delete" data-id="${item.id}">Xóa</button>
      `
      bookingList.appendChild(li)
    })
  }

  bookingList.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return

    const id = Number(e.target.dataset.id)
    const action = e.target.dataset.action
    const item = getBookings().find(b => b.id === id)
    
    if(!item) return
    if(action === "delete"){
      deleteBooking(id)
      location.reload()
    }else if(action === "view"){
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
}

if(btnBookingBack){
  btnBookingBack.onclick = () =>  location.href = "index.html"
}
if (btnClearAll) {
  btnClearAll.addEventListener("click", () => {
    if (confirm("Hủy tất cả lịch?")) {
      clearBookings()
      location.reload()
    }
  })
}


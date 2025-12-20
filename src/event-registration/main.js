const stepLocation = document.querySelector("#step-location")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")

const confirmInfo= document.getElementById("confirm-info")

const errorName = document.getElementById("error-Name")
const errorEmail = document.getElementById("error-Email")
const errorPhone = document.getElementById("error-Phone")
const errorTicket = document.getElementById("error-ticket")

const btnStep1 = document.getElementById("btnStep1")
const btnStep2 = document.getElementById("btnStep2")
const btnConfirm = document.getElementById("btnConfirm")

const btnBack2 = document.getElementById("btnBack2")
const btnBack3 = document.getElementById("btnBack3")
const btnNew = document.getElementById("btnNew")
const btnList = document.getElementById("btnList")

const registerState = {
    step: 1,
    personalInfo: {
        name: "",
        email: "",
        phone: ""
    },
    ticket: "",
    services: []
}

function renderStepLocation(){
    let html = ""
    for(let i=1; i<= 3; i++){
        if(i === registerState.step){
            html += `Step ${i} (current) | `
        }else if ( i < registerState.step){
            html += `Step ${i} | `
        }else {
            html += `Step ${i} (locked) | `
        }
    }
    stepLocation.textContent = html.slice(0,-3) // xóa 3 ký tự cuối cho đẹp
}
/**registerState.step = 2 
    i=1 → 1 !== 2 → hidden = true → Step 1 ẩn

    i=2 → 2 !== 2 → false → Step 2 hiện

    i=3 → 3 !== 2 → true → Step 3 ẩn
 */
function renderStep(){ 
    for(let i=1; i<=3; i++){
        const stepSection = document.getElementById(`step-${i}`) 
        stepSection.hidden = i !== registerState.step
    }
    renderStepLocation()
}

function validate(){
    let isValid = true
    if(registerState.step === 1){
        // reset các thông báo lỗi
        errorName.textContent = ""
        errorEmail.textContent = ""
        errorPhone.textContent = ""

        const nameValue = nameInput.value.trim()
        const emailValue = emailInput.value.trim()
        const phoneValue = phoneInput.value.trim()
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10,11}$/
        
        if(nameValue.length < 3){
            errorName.textContent = "Tên tối thiểu 3 ký tự"
            isValid = false
        }
        if(!emailPattern.test(emailValue)){
            errorEmail.textContent = "Email không hợp lệ"
            isValid = false
        }
        if(!phoneRegex.test(phoneValue)){
            errorPhone.textContent = "chỉ chứa số, độ dài 10 - 11 ký tự"
            isValid = false
        }
        if(isValid){
            // cập nhật lại registerState.personalInfo
            registerState.personalInfo = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue
            }
        }
    }
    if(registerState.step === 2){
        errorTicket.textContent = ""
        //Có chọn vé → trả về thẻ <input>
        // Không chọn vé → trả về null
        
        const ticketChecked = document.querySelector(
            "input[name='ticket']:checked"
        ) // :checked → chỉ chọn input đang được chọn (checked)
       
        if(!ticketChecked){
            errorTicket.textContent = "Vui lòng chọn loại vé"
            isValid = false
        }else{
            registerState.ticket = ticketChecked.value
        }
        const services = []
        // biến lấy tất cả users chọn
        const checkboxes = document.querySelectorAll("#step-2 input[type='checkbox']:checked") // trả về NodeList
        for(let i=0; i < checkboxes.length; i++){
            services.push(checkboxes[i].value)
        }
        registerState.services = services
        
    }
    return isValid
}

btnStep1?.addEventListener("click", () => {
    if(validate()){
        registerState.step = 2
        renderStep()
    }
});

btnStep2?.addEventListener("click", () =>{
    if(validate()){
        registerState.step = 3
        renderStep()
        renderConfirm()
    }
})

btnBack2?.addEventListener("click", () => {
  registerState.step = 1
  renderStep()
})

function renderConfirm() {
  const { personalInfo, ticket, services } = registerState

  confirmInfo.innerHTML = `
    <p>Họ tên: ${personalInfo.name}</p>
    <p>Email: ${personalInfo.email}</p>
    <p>SĐT: ${personalInfo.phone}</p>
    <p>Loại vé: ${ticket}</p>
    <p>Dịch vụ: ${services.length ? services.join(", ") : "Không có"}</p>
  `
}

btnBack3?.addEventListener("click", () => {
  registerState.step = 2
  renderStep()
})

btnConfirm?.addEventListener("click", () => {
  saveRegistration({
    id: Date.now(), // kiểm number
    name: registerState.personalInfo.name,
    email: registerState.personalInfo.email,
    phone: registerState.personalInfo.phone,
    ticket: registerState.ticket,
    services: registerState.services
  })
  window.location.href = "success.html"
})
btnNew?.addEventListener("click", () => {
    location.href = "index.html"
})
btnList?.addEventListener("click", () => {
    location.href = "list.html" 
})

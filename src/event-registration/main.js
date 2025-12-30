const stepLocation = document.querySelector("#step-location")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const addressInput = document.getElementById("address")

const confirmInfo= document.getElementById("confirm-info")

const errorName = document.getElementById("error-Name")
const errorEmail = document.getElementById("error-Email")
const errorPhone = document.getElementById("error-Phone")
const errorTicket = document.getElementById("error-ticket")
const errorBusTicket = document.getElementById("error-BusTicket")
const errorAddress = document.getElementById("error-Address")

const btnStep1 = document.getElementById("btnStep1")
const btnStep2 = document.getElementById("btnStep2")
const btnStep3 = document.getElementById("btnStep3")
const btnConfirm = document.getElementById("btnConfirm")

const btnBack2 = document.getElementById("btnBack2")
const btnBack3 = document.getElementById("btnBack3")
const btnBack4 = document.getElementById("btnBack4")
const btnNew = document.getElementById("btnNew")
const btnList = document.getElementById("btnList")

const busRadios = document.querySelectorAll("input[name='busTicket']")

const registerState = {
    step: 1,
    personalInfo: {
        name: "",
        email: "",
        phone: ""
    },
    ticket: "",
    busTicket:"",
    address:"",
    services: []
}

function renderStepLocation(){
    let html = ""
    for(let i=1; i<= 4; i++){
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
    for(let i=1; i<=4; i++){
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
    if(registerState.step === 3){
        errorBusTicket.textContent = ""
        const busTicketChecked = document.querySelector(
            "input[name='busTicket']:checked"
        ) // :checked → chỉ chọn input đang được chọn (checked)
       
        if(!busTicketChecked){
            errorBusTicket.textContent = "Vui lòng chọn Có hoặc Không"
            isValid = false
        }else if (busTicketChecked.value === "Co"){
            const addressValue = addressInput.value.trim()
            errorAddress.textContent = ""
            if(!addressValue){
                errorAddress.textContent = "vui lòng nhập địa chỉ"
                isValid = false
            }else {
                registerState.address = addressValue
                registerState.busTicket = busTicketChecked.value
            }
        }else {
            registerState.busTicket = busTicketChecked.value
            registerState.address = ""
        }
    }
    return isValid
}

busRadios.forEach(radio => {
    radio.addEventListener ("change", () => {
        const busTicketChecked = document.querySelector(
            "input[name='busTicket']:checked"
        )
        
        addressInput.hidden = busTicketChecked?.value !== "Co"

        if (busTicketChecked?.value !== "Co") {
            addressInput.value = ""
            errorAddress.textContent = ""
        }
    })
})
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
    }
})
btnStep3?.addEventListener("click", () =>{
    if(validate()){
        registerState.step = 4
        renderStep()
        renderConfirm()
    }
})
btnBack2?.addEventListener("click", () => {
  registerState.step = 1
  renderStep()
})

function renderConfirm() {
  const { personalInfo, ticket, services, busTicket, address  } = registerState

  confirmInfo.innerHTML = `
    <p>Họ tên: ${personalInfo.name}</p>
    <p>Email: ${personalInfo.email}</p>
    <p>SĐT: ${personalInfo.phone}</p>
    <p>Loại vé: ${ticket}</p>
    <p>Dịch vụ: ${services.length ? services.join(", ") : "Không có"}</p>
    <p>Lên xe: ${busTicket}</p>
    <p>Địa chỉ: ${address ? address : ""}</p>
  `
}

btnBack3?.addEventListener("click", () => {
  registerState.step = 2
  renderStep()
})
btnBack4?.addEventListener("click", () =>{
    registerState.step = 3
    renderStep()
})

btnConfirm?.addEventListener("click", () => {
  saveRegistration({
    id: Date.now(), // kiểm number
    name: registerState.personalInfo.name,
    email: registerState.personalInfo.email,
    phone: registerState.personalInfo.phone,
    ticket: registerState.ticket,
    services: registerState.services,
    busTicket: registerState.busTicket,
    address: registerState.address
  })
  window.location.href = "success.html"
})
btnNew?.addEventListener("click", () => {
    location.href = "index.html"
})
btnList?.addEventListener("click", () => {
    location.href = "list.html" 
})

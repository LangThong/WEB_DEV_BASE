const form = document.querySelector("#formRegister");
const inputName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const errorName = document.querySelector("#errorName");
const errorEmail = document.querySelector("#errorEmail");
const errorPassword = document.querySelector("#errorPassword");

const users = [];
form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("form đã được đăng ký");
    const success = document.querySelector("#success");
    if (validateForm()) {
        const newUser = {
            newName : inputName.value.trim(),
            newEmail : email.value.trim(),
            newPassword: password.value.trim()
        }
        users.push(newUser);
        console.log("list Users: ", users);
        success.textContent = "Đăng ký thành công";
        console.log("trước lúc reset: ", inputName.value, email.value);
        form.reset();
        console.log("sau lúc reset: ", inputName.value, email.value);

    }
})
function validateForm() {

    const emailhople = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    inputName.style.border = "";
    email.style.border = "";
    password.style.border = "";


    let isValid = true;

    if (inputName.value.trim() === "") {
        errorName.textContent = "Vui lòng nhập họ và tên";
        inputName.style.border = "1px solid red";
        isValid = false;
        setTimeout(() =>{
            errorName.textContent = "";
            inputName.style.border = "";    
        },3000);
    }

    if (!emailhople.test(email.value.trim())) {
        errorEmail.textContent = "Vui lòng nhập dúng định dạng";
        email.style.border = "1px solid red";
        isValid = false;
        setTimeout(() =>{
            errorEmail.textContent = "";
            email.style.border = "";    
        },3000);
    }
    if (password.value.length < 6) {
        errorPassword.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        password.style.border = "1px solid red";
        isValid = false;
        setTimeout(() =>{
            errorPassword.textContent = "";
            password.style.border = "";    
        },3000);
    }
    return isValid;
}
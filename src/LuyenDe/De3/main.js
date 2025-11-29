/**
    + querySelector() là một hàm của DOM (Document Object Model)
    + Dùng để tìm và lấy phần tử HTML đầu tiên (the first match) dựa trên CSS selector

        #id     Chọn theo id	    <input id="name">	querySelector("#name")
        .class  Chọn theo class	    <p class="error">	querySelector(".error")
        tag     Chọn theo tên thẻ   <h2>...</h2>	    querySelector("h2")
    =======================================================================================
    addEventListener() là hàm dùng để lắng nghe (bắt sự kiện) trên một phần tử HTML.
    VD:
        element.addEventListener("tên_sự_kiện", hàm_xử_lý);
            element: phần tử HTML mà bạn muốn bắt sự kiện (ví dụ: button, form, input, …).
            "tên_sự_kiện": tên của sự kiện (ví dụ: "click", "submit", "input", "change", …).
            hàm_xử_lý: đoạn code bạn muốn chạy khi sự kiện xảy ra.
 */
const formDangKy = document.querySelector("#registerForm");
const formDangNhap = document.querySelector("#loginForm");
const users = [
    {
        name: 'thuan',
        email : "thuan@gmail.com",
        password: "123456"
    },
    {
        name: 'dat',
        email : "dat@gmail.com",
        password: "123456"
    },
];
let saveUser = null

 console.log(users)
// addEventListener có những sự kiện gì
formDangKy.addEventListener("submit", function (e){
    e.preventDefault(); // không cho reload trang
    success.textContent = "" ;

    if(validateForm({emailElement: inputEmail, errorEmail: errorEmail }, {nameElement: inputName, errorName:errorName }, {passwordElement: inputPassword, errorPassword: errorPassword})){
        const checkEmail = users.some(u =>u.email === inputEmail.value.trim()) // some có ít nhất một phần tử trong mảng thỏa mãn điều kiện cho trước hay không.
        if(checkEmail){
            errorEmail.textContent = "Email này đã được đăng ký!";
            return; 
        }
        const newUser = {
            name : inputName.value.trim(),
            email : inputEmail.value.trim(),
            password : inputPassword.value.trim()
        }
        users.push(newUser);
        success.textContent = "Đăng ký thành công";
        console.log("List Users: ", users);
        formDangKy.reset();
    }
});

formDangNhap.addEventListener("submit", function (e){
    e.preventDefault();
    successLogin.textContent = "" ; // reset thông báo
    errorEmailLogin.textContent = "";
    errorPasswordLogin.textContent = "";
    if(validateForm({emailElement: emailLogin,errorEmail: errorEmailLogin},{}, {passwordElement: paswordLogin, errorPassword: errorPasswordLogin} )){
        // kiểm tra email tồn tại chưa
        foundUser = users.find(u => u.email == emailLogin.value.trim());
        if(!foundUser){
            errorEmailLogin.textContent = "Email không tồn tại!";
            emailLogin.style.border = "1px solid red";
            setTimeout(() =>{
                errorEmailLogin.textContent = "";
                emailLogin.style.border = "";
            } ,3000);

            return
        }
        if(foundUser.password !== paswordLogin.value.trim()){
            errorPasswordLogin.textContent = "Mật khẩu không đúng!";
            paswordLogin.style.border = "1px solid red";

            setTimeout(() => {
                errorPasswordLogin.textContent = "";
                paswordLogin.style.border = "";
            }, 3000);

            return;
        }

        successLogin.textContent = "Đăng nhập thành công!";
        console.log("Đăng nhập:", foundUser);
        formDangNhap.reset();
    }

});
forgetPasswordForm.addEventListener("submit", function (e){
    e.preventDefault();
    successForget.textContent = ""
    errorNameForget.textContent = ""
    errorEmailForget.textContent = ""
    errorForget.textContent =""
    
    if(validateForm({ emailElement: emailForget, errorEmail: errorEmailForget }, { nameElement: nameForget, errorName: errorNameForget }, {})){
        console.log("Đã vào đây")
        const foundUser = users.find(u =>u.email === emailForget.value.trim() && u.name == nameForget.value.trim())
        console.log(foundUser)
        if(foundUser){
           successForget.textContent = `Mật khẩu cũ của bạn là : ${foundUser.password}.`;  
            formDangNhap.reset();
            return
        }else {
            errorForget.textContent = `Vui lòng nhập đúng name và email`
        }
    }

});
checkEmailForm.addEventListener("submit",function (e){
    e.preventDefault();
    errorCheckEmailInput.textContent =""
    errorCheckEmail.textContent =""
    successEmail.textContent =""

    if(validateForm({ emailElement: checkEmail, errorEmail: errorCheckEmailInput }, {}, {})){
        console.log("Đã vào hàm checkEmail")
        saveUser = users.find(u=> u.email === checkEmail.value.trim())
        if(saveUser){
            successEmail.textContent = `Email hợp lệ`;
            newPasswordTitle.style.display = "block"
            passwordNewForm.style.display = "block"
            formDangNhap.reset();

            return
        }else {
            errorCheckEmail.textContent = `Email không hợp lệ!`
        }
    }
});

passwordNewForm.addEventListener("submit",function (e){
    e.preventDefault()
    errorPasswordOld.textContent =""
    errorPasswordNew.textContent = ""
    errorPasswordNewForm.textContent =""
    successPasswordNewForm.textContent = ""
    if(validateForm({}, {}, { passwordElement: passwordOld, errorPassword : errorPasswordOld})
        && validateForm({}, {}, { passwordElement: passwordNew, errorPassword : errorPasswordNew}))
    {
        const oldVal = passwordOld.value.trim();
        const newVal = passwordNew.value.trim();
        if(saveUser.password !== oldVal ){
            errorPasswordNewForm.textContent = "Mật khẩu cũ không đúng"
            return
        }
        if(oldVal === newVal){
            errorPasswordNewForm.textContent = "Mật khẩu mới phải khác mật khẩu cũ"
            return
        }
        if(newVal.length < 6){
            errorPasswordNew.textContent = "Mật khẩu mới phải ít nhất 6 ký tự"
            return
        }   
        saveUser.password = newVal
        successPasswordNewForm.textContent = "Đổi mật khẩu mới thành công"
        console.log("saveUser: ",saveUser)
        passwordNewForm.reset()
    }
});
function validateForm({emailElement,errorEmail} ,{nameElement, errorName}, {passwordElement, errorPassword}){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    // Reset lỗi 
    if(errorEmail !== null && errorEmail !== undefined){
        errorEmail.textContent = "";
        emailElement.style.border = "";
    }
    if(errorName!==null && errorName!== undefined) {
        errorName.textContent = "";
        nameElement.style.border = "";
    }
    if(errorPassword !== null && errorPassword !== undefined){
        errorPassword.textContent = "";
        passwordElement.style.border = "";
    }
    if(errorName && nameElement) {
        if(nameElement.value.trim()  === ""){
        errorName.textContent = "Vui lòng nhập họ và tên";
        nameElement.style.border = "1px solid red";
        setTimeout(()=> {
            errorName.textContent = "";
            nameElement.style.border = "";
        }, 3000)
        isValid = false;
    }
    }
    if(emailElement && errorEmail){
        if(!emailPattern.test(emailElement.value.trim())){
        errorEmail.textContent = "Email không hợp lệ";
        emailElement.style.border = "1px solid red";
        setTimeout(() =>{
            errorEmail.textContent = "";
            emailElement.style.border = "";
        } ,3000);
        isValid = false;
    }
    }
    if(passwordElement && errorPassword){
        if(passwordElement.value.length < 6){
        errorPassword.textContent = "Mật khẩu ít nhất 6 ký tự";
        setTimeout(() => {
            errorPassword.textContent = "";
            passwordElement.style.border = "";
        } ,3000);
        passwordElement.style.border = "1px solid red";
        isValid = false;
        }
    }
    return isValid;
}




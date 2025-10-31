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
const users = [];

formDangKy.addEventListener("submit", function (e){
    e.preventDefault(); // không cho reload trang
    console.log("Form đã được submit!");

    const success = document.querySelector("#success");
    success.textContent = "" ; // reset thông báo

    if(validateForm()){
        const newUser = {
            name : inputName.value.trim(),
            email : inputEmail.value.trim(),
            password : inputPassword.value.trim()
        }
        success.textContent = "Đăng ký thành công";
        users.push(newUser);
        console.log("List Users: ", users);
        console.log("Trước khi reset:", inputName.value, inputEmail.value);
        formDangKy.reset();
        console.log("Sau khi reset:", inputName.value, inputEmail.value);
    }
});

function validateForm(){
    const inputName = document.querySelector("#inputName");
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const errorName = document.querySelector("#errorName");
    const errorEmail = document.querySelector("#errorEmail");
    const errorPassword = document.querySelector("#errorPassword");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    // Reset lỗi
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    inputName.style.border ="";
    inputEmail.style.border ="";
    inputPassword.style.border ="";
    if(inputName.value.trim()  === ""){
        errorName.textContent = "Vui lòng nhập họ và tên";
        setTimeout(() => errorName.textContent = "" ,3000);
        inputName.style.border = "1px solid red";
        isValid = false;
    }
    if(!emailPattern.test(inputEmail.value.trim())){
        errorEmail.textContent = "Email không hợp lệ";
        setTimeout(() => errorEmail.textContent = "" ,3000);
        inputEmail.style.border = "1px solid red";
        isValid = false;
    }
    if(inputPassword.value.length < 6){
        errorPassword.textContent = "Mật khẩu ít nhất 6 ký tự";
        setTimeout(() => errorPassword.textContent = "" ,3000);
        inputPassword.style.border = "1px solid red";
        isValid = false;
    }
    return  isValid;
}


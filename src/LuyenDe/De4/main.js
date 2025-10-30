const canNang = document.querySelector("#canNang");
const chieuCao = document.querySelector("#chieuCao");
const errorCanNang = document.querySelector("#errorCanNang");
const errorChieuCao = document.querySelector("#errorChieuCao");
const result = document.querySelector("#result");
const nutTinh = document.querySelector("#TinhBMI");
const nutReset =document.querySelector("#Reset");
const historyList = document.querySelector("#history");
let history = [];

// Gắn sẵn hiệu ứng (opacity + transform)
/**
 *  transition
        "all" → áp dụng cho tất cả các thuộc tính có thể chuyển động.
        "0.5s" → thời gian chạy hiệu ứng là 0.5 giây.
        "ease" → kiểu chuyển động mượt, bắt đầu và kết thúc chậm hơn một chút
    opacity(0 là ẩn hoàn toàn 1 là hiện rõ)
    translateY(20px)" → dịch xuống 20px (vị trí thấp hơn một chút).
    translateY(0) → trở lại vị trí bình thường (không bị lệch).
 */
result.style.transition = "all 0.5s ease";
result.style.opacity = 0;
result.style.transform = "translateY(20px)";

function kiemTraLoi (){
    errorCanNang.textContent = "";
    errorChieuCao.textContent = "";
    result.style.opacity = 0; // ẩn 
    result.textContent = "";
    //lay gia trị chuyển thành số
    const weight = Number(canNang.value);
    // console.log(typeof weight);
    const height = Number(chieuCao.value);

    let isValid = true;

    if(!canNang.value.trim()){
        errorCanNang.textContent = "Vui lòng nhập cân nặng";
        isValid = false;
    }else if(isNaN(weight)) {
        errorCanNang.textContent = "Cân nặng phải là số";
        isValid = false;
    }else if(weight <= 0){
        errorCanNang.textContent = "Cân nặng phải lớn hơn 0";
        isValid = false;
    }

    if(!chieuCao.value.trim()){
        errorChieuCao.textContent = "Vui lòng nhập chiều cao";
        isValid = false;
    }else if(isNaN(height)) {
        errorChieuCao.textContent = "Chiều cao phải là số";
        isValid = false;
    }else if(height <= 0){
        errorChieuCao.textContent = "chiều cao phải lớn hơn 0";
        isValid = false;
    }
     // Nếu hợp lệ → trả về object
    return isValid ? { weight, height } : null;
}
nutTinh.addEventListener("click", function (){

    const data = kiemTraLoi();
    console.log("data",data);
    if(data){
        // BMI = cân nặng / ( (chiều cao / 100) ^ 2 )
        const BMI = data.weight / ((data.height / 100) ** 2);
        let thongbao = `BMI của bạn là ${BMI.toFixed(2)} => `;
        let color = "black";
        if(BMI < 18.5){
            thongbao += "Gầy"; 
            color = "orange";
        }else if (BMI < 25){
            thongbao += "Bình thường";
            color = "green";    
        }else {
            thongbao+= "thừa cân";
            color = "red";
        }
        result.textContent = thongbao;
        result.style.color = color;
        //hiệu ứng hiện kết quả
        result.style.opacity = 1;
        result.style.transform = "translateY(0)";
        // lưu lịch sử
        const time = new Date().toLocaleTimeString();
        history.push({ weight: data.weight, height: data.height, BMI: BMI.toFixed(2), status: thongbao, time });
        console.log("add history vào cuối",history);
        hienThiLichSu();
    }
});
nutReset.addEventListener("click", function (){
    canNang.value = "";
    chieuCao.value = "";
    errorCanNang.textContent = "";
    errorChieuCao.textContent = "";
    result.textContent = "";
    result.style.opacity = 0;
    result.style.transform = "translateY(20px)";
});

function hienThiLichSu(){
    historyList.innerHTML = "";  // làm trống danh sách khi cập lại
    history.forEach(item => { // duyệt qua mảng
        const li = document.createElement("li"); // tạo li trong ul
        li.textContent = `[${item.time}] ${item.status} (Cân nặng: ${item.weight}kg, Cao: ${item.height}cm)`;
        historyList.appendChild(li);
    });
}
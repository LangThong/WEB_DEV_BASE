document.getElementById("btnKiemTra").onclick = function (){
    const number = parseInt(document.getElementById("number").value); // ví dụ 3.2 chỉ lấy 3
    const resultKiemTra = document.getElementById("resultKiemTra");
     // isNaN kiểm tra nếu giá trị không phải là số(người dùng nhập sai hoặc chưa nhập);
    if(isNaN(number)){
        resultKiemTra.innerText("Vui lòng nhập lại số hợp lệ!");
        return;
    }
    if(number %2 === 0){ // === so sánh kiểu dữ liệu và giá trị
        resultKiemTra.innerText = `${number} là số chẵn.`;
        console.log(number);
    } else {
        resultKiemTra.innerText = `${number} là số lẻ.`;
        console.log(number);
    }
}

document.getElementById("btnPhanLoai").onclick = function () {
    const number = parseFloat(document.getElementById("diemHocSinh").value);
    const  resultPhanLoai = document.getElementById("resultPhanLoai"); 
    const errorPhanLoai = document.getElementById("errorPhanLoai");

    // xóa nội dung cũ trước mỗi lần bấm
    errorPhanLoai.innerText ="";
    resultPhanLoai.innerText = "";

    if(isNaN(number)){
        errorPhanLoai.innerText = "Vui lòng nhập điểm hợp lệ!!!!";
        return;
    }
    if(number < 0 || number > 10){
        errorPhanLoai.innerText = "Điểm phải nằm trong khoảng 0 đến 10!!!";
        console.log(errorPhanLoai);
        return;
    }
    if(number >= 8){
        resultPhanLoai.innerText = `${number} xếp loại giỏi.`;
    }else if(number >= 6.5){
        resultPhanLoai.innerText = `${number} xếp loại khá.`;
    }else if(number >= 5){
        resultPhanLoai.innerText = `${number} xếp loại trung bình.`;
    }
    else {
        resultPhanLoai.innerText = `${number} xếp loại yếu.`;
    }
}

document.getElementById(("btnDoiMau")).onclick = function  (){
    const color = document.getElementById("chonMau").value;
    const errorDoiMau = document.getElementById("errorDoiMau");

    errorDoiMau.innerText = "";

    if(!color){
        errorDoiMau.innerText = "Vui lòng chọn màu trước khi đổi";
        return;
    }
    // đổi màu nền trang
    document.body.style.backgroundColor = color;
}

document.getElementById(("btnTinhNghiem")).onclick = function (){
    const numberA = parseFloat(document.getElementById("numberA").value);
    const numberB = parseFloat(document.getElementById("numberB").value);
    const resultTinhNghiem = document.getElementById("resultTinhNghiem");
    const x =  - numberB/numberA;
    if(isNaN(numberA) || isNaN(numberB)){
        resultTinhNghiem.innerText = "Vui lòng nhập số a và số b";
        return ;
    }
    if(numberA === 0){
        if(numberB === 0){
            resultTinhNghiem.innerText = "Vô số nghiệm";
        }else{
            resultTinhNghiem.innerText = "Vô nghiệm";
        }
    }else {
        resultTinhNghiem.innerText = `Vậy có 1 nghiệm là: ${x}`;
    }
}
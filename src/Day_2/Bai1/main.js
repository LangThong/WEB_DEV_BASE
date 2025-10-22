document.getElementById("tinhTuoi").onclick = function() {
 
    const year = document.getElementById("year").value;
    const result = document.getElementById("result");
    const  currentYear = new Date().getFullYear(); // nam hien tại

    if(!year){
        result.innerText= "Vui lòng nhập lại năm sinh";
        return;
    }
    if(year > currentYear){
        result.innerText= "năm sinh không hợp lệ (lớn hơn năm hiện tại) !!!";
        return;
    }
    // Tinh tuoi
    const  age = currentYear - year;
    result.innerText = `Tuổi của bạn là : ${age}`;
}

document.getElementById("btnGioiThieu").onclick = function () {
    const name = document.getElementById("name").value;
    const job = document.getElementById("job").value;
    const hometown = document.getElementById("hometown").value;
    const  result = document.getElementById("introResult");

    if(!name || !job || !hometown){
        result.innerText = "Vui lòng nhập đầy đủ thông tin!!!";
        return;
    }
    result.innerText= `Tôi là ${name}, làm ${job}, quê ở ${hometown}`
}

document.getElementById("btnDiemTrungBinh").onclick = function (){
    //const diem1 = document.getElementById("diem1").value; 
    // value luôn trả về string nên phải ép kiểu nên phải ép kiểu
    const diem1 = parseFloat(document.getElementById("diem1").value);
    const diem2 = parseFloat(document.getElementById("diem2").value);
    const diem3 = parseFloat(document.getElementById("diem3").value);
    const ketqua = document.getElementById("DiemTrungBinh");

    // isNaN kiểm tra nếu giá trị không phải là số(người dùng nhập sai hoặc chưa nhập);
    if(isNaN(diem1) || isNaN(diem2) || isNaN(diem3)){
        ketqua.innerText = "Vui lòng nhập đầy đủ cả 3 điểm!";
        return;
    }
    if(diem1 < 0 || diem1 >10 || diem2 < 0 || diem2 >10 || diem3 < 0 || diem3 >10 ){
        ketqua.innerText = "Điểm nằm trong khoảnh 0-10";
        return ;
    }
    const  TinhDiemTrungBinh = (diem1 + diem2 + diem3) /3;
    ketqua.innerText = `Điểm trung bình của bạn là : ${TinhDiemTrungBinh.toFixed(2)}`; // toFixed là làm tròn
}

window.onload = function (){
    const today = this.document.getElementById("today");

    const now = new Date(); // lấy thời gian hiện tại
    // lấy day/month/year
    const day = now.getDate();
    const month = now.getMonth() + 1; // vì tháng 10 => index 9
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0"); //padStart 09:05:07 hay vì 9:5:7
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    today.innerText = `Hôm nay là ngày ${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}
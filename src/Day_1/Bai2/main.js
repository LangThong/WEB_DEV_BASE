document.getElementById("ShowInfo").onclick = function (){
    // Tạo nội dung trong đây
    const name = "Trần Thanh Thuận";
    const age = 21;
    const address = "Đồng Tháp";
    const job = "Lập trình viên";
    const hobby = "Chơi Liên quân, đọc sách, nghe nhạc";
    // Ghép nội dung lại:
    const infoText = `
     <strong>Name:</strong> ${name} <br>
     <strong>Age:</strong> ${age} <br>
     <strong>Address:</strong> ${address} <br>
     <strong>Job:</strong> ${job} <br>
     <strong>Hobby:</strong> ${hobby} <br>
     `
    // gán vào phần tử hiển thị trong thẻ p
    document.getElementById("info").innerHTML = infoText;
}
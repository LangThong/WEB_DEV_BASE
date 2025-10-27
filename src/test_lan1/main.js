const danhSachHocSinh = [
    {
        maHocSinh: 'HS001',
        ten: 'Nguyễn Văn A',
        lop: '10A1',
        diemTrungBinh: 8.5
    },
    {
        maHocSinh: 'HS002',
        ten: 'Trần Thị B',
        lop: '11B3',
        diemTrungBinh: 7.9
    },
    {
        maHocSinh: 'HS003',
        ten: 'Lê Hữu C',
        lop: '10A1',
        diemTrungBinh: 9.2
    }
];

function format(hs) {
    return `Mã: ${hs.maHocSinh} | Tên: ${hs.ten} | Lớp: ${hs.lop} | Điểm trung bình: ${hs.diemTrungBinh}`;
}

for (let motHocSinh of danhSachHocSinh) {
    const button = document.createElement("button"); // tạo 1 button
    button.textContent = format(motHocSinh);// gán nội dung cho button

    // thêm khoảng cách giữa các nút
    button.style.display = 'block'; // Phần tử khối, chiếm trọn 1 dòng (xuống hàng mới)
    button.style.margin = '8px 0'; // khoảnh cách bên ngoài
    button.style.padding = '6px 10px'; //khoảng trống nội dung, 1(4 cạnh đều) 2(trên/dưới trái phải), nếu 3(trên trái/phải dưới), còn 4(trên phải dưới trái)

    button.addEventListener("click", function (){
        buttonThongTin.textContent = format(motHocSinh);
    });

    document.body.appendChild(button);
}


const buttonThongTin = document.createElement("button");
buttonThongTin.textContent = "Thông tin học sinh";
buttonThongTin.style.display = 'block';
buttonThongTin.style.margin = '20px 0';
buttonThongTin.style.padding = '6px 10px';
buttonThongTin.style.backgroundColor = 'lightblue';
buttonThongTin.style.border = '1px solid gray'; // <độ_dày> <kiểu_viền> <màu_viền>;
document.body.appendChild(buttonThongTin);



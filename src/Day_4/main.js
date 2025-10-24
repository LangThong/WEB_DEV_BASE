const students = [];

document.getElementById("btnAdd").onclick = function (){
    const name = document.getElementById("inputName").value.trim(); // value => lấy chuỗi người dùng còn trim() =>Loại bỏ khoảng trắng đầu và cuối
    if(name === ""){
        alert("Vui lòng nhập tên!!!");
        return;
    }
    students.push(name);// Thêm tên vào cuối mảng
    renderList(); // hàm render danh sách
    document.getElementById("inputName").value ="";// xóa inputName sau khi thêm
}
document.getElementById("btnClear").onclick = function  (){
    students.length = 0;
    console.log(students.length);
    renderList();
}
function renderList() {
    const list = document.getElementById("studentList");
    list.innerHTML = ""; // xóa nội dung trước khi render
    for(let student of students){
            list.innerHTML += `<li>${student}</li>`;
    }
}
// =================================================== //

const select = document.getElementById("number");
for(let i=1 ; i<10; i++){
    const option = document.createElement("option");
    option.value = i;
    option.textContent =i;
    select.appendChild(option);
}
document.getElementById("btnBangCuuChuong").onclick = function (){
    const number = parseInt(select.value);

    const resultBangCuuChuong = document.getElementById("resultBangCuuChuong");

    resultBangCuuChuong.innerHTML =""; // xóa kết quả củ
    if(isNaN(number)){
        resultBangCuuChuong.innerHTML = "Vui lòng chọn số!!!";
        return;
    }
    for(let i=1; i<=10; i++){
        const li = document.createElement("li");
        li.textContent = `${number} x ${i} = ${number * i}`;
        resultBangCuuChuong.appendChild(li);
    }

}
//=================================================== //

// bài 3: Tính tổng mảng số
// const arrays = [1, 5, 8, 10, 10, 5];
// let sum = 0;
// for(let arr of arrays){
//     sum+= arr;
//     console.log(sum);
// }
// console.log("Tổng mảng là: ", sum);
// // Bài 4: Đếm số chẵn / lẻ trong mảng

// let chan = 0;
// let le = 0;
// for(let number of arrays){
//     if(number%2 === 0){
//         chan++ ;
//         console.log("Số chẵn : ", chan);
//     }else {
//         le++ ;
//         console.log("Số le : ", le);
//     }
// }
// console.log(`Có ${chan} só chẵn, Có ${le} số lẻ.`);
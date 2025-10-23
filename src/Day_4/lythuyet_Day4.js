// Day 4 Vòng Lặp(Loop) và mảng (Array)
// 1. Cấu trúc for lặp khi biết số lần
console.log("Bài 1: Cấu trúc for: ");
for(let i=0; i<=5; i++){ 
    console.log("Lần: ", i);
}
// 2. Cấu trúc while lặp khi biết điều kiện
// Dạng này dùng khi chưa biết trước số lần lặp, chỉ biết điều kiện dừng.
let y = 0;
console.log("Bài 2: Cấu trúc while: ");
while (y < 6){
    console.log(y);
    y++;
}
// 3. Cấu trúc do...while
// giống while nhưng luôn chạy ít nhất 1 lần (vì kiểm tra điều kiện sau khi chạy)
console.log("Bài 3: Cấu trúc do...while: ");
let z = 0;
do{
    console.log(z);
    z++;
}while (z<5);
// 4. Cấu trúc for...of
// Dùng để duyệt từng phần tử trong mảng
console.log("Bài 4: Cấu trúc for...of: ");
const fruits = ["Táo", "Chuối", "Cam"];
for(let fruit of fruits){
    console.log(fruit);
}
// 5.Từ khóa break và continue trong bòng lặp
    //Khi chương trình gặp break, nó dừng vòng lặp hiện tại và nhảy ra ngoài luôn, không chạy thêm lần nào nữa.
console.log("Bài 5: Từ khóa break và continue trong bòng lặp: ");
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break; // thoát vòng lặp khi i = 3
  }
  console.log("Giá trị:", i);
}
console.log("Kết thúc vòng lặp");
    //Khi gặp continue, chương trình không chạy các dòng sau trong lần lặp đó, mà quay lại đầu vòng để chạy lần mới.
console.log("continue: ");
for(let i= 1 ; i<=5; i++){
    if(i === 3){
        continue; // bỏ qua 
    }
    console.log("Giá trị:", i);
}
//Mảng
// const names = ["An", "Bình", "Khánh"];
// console.log(names[0]); // "An"
// console.log(names[1]); // "Bình"
// console.log(names[2]); // "Khánh"
// console.log(names.length); // 3 (length độ dài của mảng)
// .push()                  Thêm cuối mảng          names.push("Hà");
// .unshift()               Thêm đầu mảng           names.unshift("Nam");
// .pop()	                Xoá phần tử cuối	    names.pop();
// .shift()	                Xoá phần tử đầu	        names.shift();
// .splice(index, count)	Xoá theo vị trí	        names.splice(1, 1); // xoá phần tử thứ 2
console.log("=================Mảng=================");

const names = ["An", "Bình", "Khánh"];
for(let i=0; i< names.length; i++){
    console.log(names[i]);
}
for(let name of names){
    console.log(name);
}
names.forEach(function (name, index){
    console.log(name, index);
});
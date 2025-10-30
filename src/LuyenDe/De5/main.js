const inputNumber = document.querySelector("#numbers");
const btnAVG = document.querySelector("#btnAVG");
const btnReset = document.querySelector("#btnReset");
const error =document.querySelector("#error");
const result = document.querySelector("#result");
function Validate(){
    const value =inputNumber.value.trim();
    if(value === ""){
        error.textContent = `Vui lòng nhập dãy số!!!`;
        return null; 
    }
    const arr = value.split(",").map(item => item.trim()); // map(xóa khoảng trắng thừa quanh từng phần tử)
    console.log("split", value.split(",")); //  ["5", "10", "15", "20"]
    console.log("array", arr);
    if(arr.some(item => item === "")){ // 5,,10 hoặc 5, ,10
        error.textContent = `Không được để trống giữa các dấu phẩy!`;
        return null; 
    }
    const numbers = arr.map(Number); // ["5","10","15"] → [5,10,15].
    console.log("number: " ,numbers);
    const isValid = numbers.every(num => !isNaN(num)); // Nếu nhập "5,abc,10" → isNaN("abc") sẽ là true, nên báo lỗi.\
    console.log("isValid: " ,isValid);
    if(!isValid){
        error.textContent = `Dãy nhập vào phải là các số hợp lệ, cách nhau bằng dấu phẩy!`;
        return null;
    }
    // nếu hợp lệ
    error.textContent = ""; // xóa lỗi cũ nếu có
    return numbers; // [5,10,15].
}

btnAVG.addEventListener("click", function () {
    result.textContent = "";
    const numbers = Validate(); //  là mảng số hoặc là null.
    if(numbers === null){
        return;
    }
   
    const sum = numbers.reduce((a,b) => a+b, 0);
    /**
        Ví dụ: [5,10,15].reduce((a,b)=>a+b,0) → ((0+5)+10)+15 → 30.
        Tại sao phải có 0?
        Nếu mảng rỗng và không có initialValue, reduce sẽ ném lỗi. Ở đây Validate() đã đảm bảo mảng không rỗng, nhưng đặt 0 là an toàn.
     */
    const avg =(sum/ numbers.length).toFixed(2);
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    //hiển thị ra
    result.textContent = `- Danh Sách: [${numbers.join(", ")}]`;

    const br = document.createElement("br");
    result.appendChild(br);

    const p =document.createElement("p");
    p.textContent = `- Tổng: ${sum}`;
    result.appendChild(p);

    const p1 =document.createElement("p");
    p1.textContent = `- Trung bình: ${avg}`;
    result.appendChild(p1);

    const p2 =document.createElement("p");
    p2.textContent = `- Max: ${max}`;
    result.appendChild(p2);

    const p3 =document.createElement("p");
    p3.textContent = `- Min: ${min}`;
    result.appendChild(p3);

    // lưu kết quả vào localStorage
    //JSON.stringify() để chuyển object → chuỗi:
    localStorage.setItem("Result", JSON.stringify({
        numbers, sum, avg, min, max
    }));

});
btnReset.addEventListener("click", function (){
    inputNumber.value = "";
    error.textContent = "";
    result.textContent= "";
    localStorage.removeItem("Result");
});

// Khi load lại trang -> hiển thị kết quả cũ (nếu có)
// window.addEventListener("load", () => {
//     const duLieuCu = localStorage.getItem("Result");
//     if(duLieuCu){
//         //JSON.parse() để chuyển ngược lại chuỗi JSON → object
//         const data = JSON.parse(duLieuCu);
//         result.innerHTML = `
//         <b>Kết quả lần trước:</b><br>
//         - Danh Sách: [${data.numbers.join(", ")}] <br>
//         - Tổng: ${data.sum} <br>
//         - Trung bình: ${data.avg} <br>
//         - Min: ${data.min} <br>
//         - Max: ${data.max}
//         `;
//     }
// });

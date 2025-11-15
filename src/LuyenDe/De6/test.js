const inputNumber = document.querySelector("#inputNumber");
const btnAVG = document.querySelector("#btnAVG");
const result = document.querySelector("#result");
const error = document.querySelector("#error");

function KTHopLe(){
    const value = inputNumber.value.trim();
    if (value === "") {
        error.textContent = "vui lòng nhập dãy số";
        return null;
    }
    const arr = value.split(",").map(item =>item.trim());
    if(arr.some(item => item === "")){ // some kiểm tra phần tử nào thỏa điều kiện không
        error.textContent = `Không được để trống giữa các dấu phẩy!`;
        return null; 
    }
    const numbers = arr.map(Number);
    const isValid =numbers.every( num => !isNaN(num));
    if(isValid === false){
        error.textContent = `Dãy nhập vào phải là các số hợp lệ, cách nhau bằng dấu phẩy!`;
        return null;
    }
    error.textContent = "";
    return numbers;
}


btnAVG.addEventListener("click", function (){
    result.innerHTML = "";
    const numbers = KTHopLe();
    if(numbers === null){
        return;
    }
    const sum = numbers.reduce((a,b) => a+b);
    const avg = (sum / numbers.length).toFixed(2);
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    const li1 = document.createElement("li");
    li1.textContent = `Danh sách các số: [${numbers.join(",  ")}]`;
    result.appendChild(li1);

    const li3 = document.createElement("li");
    li3.textContent = `Tổng: ${sum}`;
    result.appendChild(li3);

    const li4 = document.createElement("li");
    li4.textContent = `Min: ${min}`;
    result.appendChild(li4);

    const li5 = document.createElement("li");
    li5.textContent = `Max: ${max}`;
    result.appendChild(li5);

   const data = {
        numbers,
        sum,
        avg,
        min,
        max,
        time: new Date().toLocaleDateString()
    };
    localStorage.setItem("ketQuaCuoi", JSON.stringify(data));
});

window.addEventListener("load", () => {
    const duLieuCu = localStorage.getItem("ketQuaCuoi");
    if(duLieuCu){
        //JSON.parse() để chuyển ngược lại chuỗi JSON → object
        const data = JSON.parse(duLieuCu);
        console.log("Dữ liệu lấy từ localStorage:", data);
        result.innerHTML ="";

        const li0 = document.createElement("li");
        li0.innerHTML = `<b>Kết quả lần trước:</b>`;
        result.appendChild(li0);

      
        const li1 = document.createElement("li");
        li1.textContent = `Danh sách: [${data.numbers.join(", ")}]`;
        result.appendChild(li1);

        const li2 = document.createElement("li");
        li2.textContent = `Tổng: ${data.sum}`;
        result.appendChild(li2);

        const li3 = document.createElement("li");
        li3.textContent = `Trung bình: ${data.avg}`;
        result.appendChild(li3);

        const li4 = document.createElement("li");
        li4.textContent = `Min: ${data.min}`;
        result.appendChild(li4);

        const li5 = document.createElement("li");
        li5.textContent = `Max: ${data.max}`;
        result.appendChild(li5);
    }
});

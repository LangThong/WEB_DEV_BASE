const inputName = document.querySelector("#inputName");
const btnAddHocVien = document.querySelector("#btnAddHocVien");
const btnRemoveAll = document.querySelector("#btnRemoveAll");
const dsHocvien = document.querySelector("#dsHocvien");
const tongHocVien = document.querySelector("#tongHocVien");
const dsActions = document.querySelector("#dsActions");
// localStorage.getItem("HocVien")) trả về chuỗi '["An", "Bình", "Chi"]'
// JSON.parse(...) chuyển thành mảng ["An", "Bình", "Chi"]
// JSON.stringify(getLSHocVien) → chuyển mảng thật thành chuỗi JSON.
// localStorage.setItem("HocVien", ...) → lưu chuỗi đó lại dưới key "HocVien"
let getLSHocVien = JSON.parse(localStorage.getItem("HocVien")) || [];
let actions = JSON.parse(localStorage.getItem("Actions")) || [];
console.log("Get Dữ liệu: ",getLSHocVien);


function saveData(){
    localStorage.setItem("HocVien", JSON.stringify(getLSHocVien));
}
function saveActions(){
    localStorage.setItem("Actions", JSON.stringify(actions));
}


function renderList() {
    dsHocvien.innerHTML = "";
    if(getLSHocVien.length === 0){
        const li = document.createElement("li");
        li.textContent = "Danh sách đang rỗng!!!";
        dsHocvien.appendChild(li);
        tongHocVien.textContent = 0;
        return;
    }
    getLSHocVien.forEach((hocvien,index) => {
        // Nội dung: "1. Tên"
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${hocvien}`;
        // Nút sửa
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "✏️ Sửa";
        btnEdit.classList.add("btn-edit")
        btnEdit.style.marginLeft = "10px";
        btnEdit.style.marginBottom = "10px";
        // Nút xóa
        const btnRemove = document.createElement("button");
        btnRemove.textContent = "🗑️ Xóa";
        btnRemove.classList.add("btn-remove");
        btnRemove.style.marginLeft = "10px";
        btnRemove.style.marginBottom = "10px";
        // xử lý khi xóa từng học viên
        btnRemove.addEventListener("click", () => {
            RemoveOneHocVien(index);
        });
        // xử lý khi sửa từng học viên
        btnEdit.addEventListener("click", () => {
            EditHocVien(index);
        });

        li.appendChild(btnEdit);
        li.appendChild(btnRemove);
        dsHocvien.appendChild(li);  
    });
    console.log("DSHOCVien: ", getLSHocVien);
    tongHocVien.textContent = getLSHocVien.length;
    renderActions(); //cập nhật lịch sử  
}

function AddHocVien(){
    const Name = inputName.value.trim();
    if(Name === ""){
        alert("Vui lòng nhập tên học viên!");
        return;
    }
    getLSHocVien.push(Name);
    actions.push(`🟢 Thêm học viên: "${Name}"`);
    // reset chỗ input
    inputName.value = "";
    saveData();
    saveActions();
    renderList();
}
/**
    array.splice(start, deleteCount, item1, item2, ...)
    Tham số	                        Ý nghĩa
    start	                        Vị trí bắt đầu (index) trong mảng.
    deleteCount	                    Số phần tử cần xóa kể từ vị trí start.
    item1, item2, ...	            (Tuỳ chọn) Các phần tử muốn chèn thêm vào vị trí đó.
 */
function RemoveOneHocVien(index){
    // KT hợp lệ
    if(index < 0 || index >= getLSHocVien.length){
        return;
    }
    const removeName = getLSHocVien[index];
    getLSHocVien.splice(index,1);
    actions.push(`🔴 Xóa học viên: "${removeName}"`);

    saveData();
    saveActions();
    renderList();
}

function  EditHocVien(index){
    if(index < 0 || index >= getLSHocVien.length){
        return;
    } 
    // Lấy tên cũ để hiển thị
    const oldName = getLSHocVien[index];
    // Dùng prompt để nhập tên mới
    const newName = prompt("Nhập tên mới cho học viên: ",oldName);
    if(newName === null){
        alert("Đã hủy thao tác sửa!");
        return;
    }
    if (newName.trim() === "") {
        alert("Tên học viên không được để trống hoặc chỉ là khoảng trắng!");
        return;
    }
    if (newName.trim() === oldName) {
        alert("Tên mới giống tên cũ, không có gì thay đổi!");
        return;
    }
    // cập nhật dữ liệu
    getLSHocVien[index] = newName.trim();
    actions.push(`✏️ Sửa học viên: "${oldName}" → "${newName.trim()}"`);
    saveData();
    saveActions();
    renderList();

}

function RemoveAll(){
    if(getLSHocVien.length === 0){
        alert("Danh sách đang trống!");
        return;
    }
    if(!confirm("Bạn có chắc muốn xóa tất cả học viên không?")){
        return;
    }
    actions.push(`⚠️ Xóa toàn bộ danh sách (${getLSHocVien.length} học viên)`);
    getLSHocVien = [];
    saveData();
    saveActions();
    renderList();
    renderActions();
}
function renderActions(){
    dsActions.innerHTML = "";
    if(actions.length === 0){
        const li = document.createElement("li");
        li.textContent = "Chưa có hành động nào.";
        dsActions.appendChild(li);
        return;
    }
    /// [...actions] tạo bản sao độc lập
    /// reverse đảo ngược 
    [...actions].reverse().forEach(action => {
        const li = document.createElement("li");
        li.textContent = action;        
        dsActions.appendChild(li);
    });
}

btnAddHocVien.addEventListener("click", AddHocVien);
btnRemoveAll.addEventListener("click",RemoveAll);
renderList();
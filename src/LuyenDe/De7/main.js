const input = document.querySelector("#input")
const errorInput = document.querySelector("#errorInput")
const btnAddJob = document.querySelector("#btnAddJob")
const btnDeleteAllJob = document.querySelector("#btnDeleteAllJob")
const taskList = document.querySelector("#taskList")
const historyList = document.querySelector("#historyList")
const btnDeleteAllHistory = document.querySelector("#btnDeleteAllHistory")
let tasks = JSON.parse(localStorage.getItem("TaskListJob")) || []
let history = JSON.parse(localStorage.getItem("HistoryJob")) || []

function saveTaskListJob (){
    localStorage.setItem("TaskListJob", JSON.stringify(tasks))
}
function saveHistoryJob (){
    localStorage.setItem("HistoryJob", JSON.stringify(history))
}

function renderListJob (){
    // xóa nội dung cũ
    taskList.innerHTML = ""
    // kiểm tra có danh sách công việc chưa
    if(tasks.length === 0){
        const li = document.createElement("li");
        li.classList.add('task-item');
        li.textContent = "Danh sách đang rỗng!!!"
        taskList.appendChild(li)
        return
    }
    tasks.forEach((task, index) => {
        // Nội dung: "1. Công việc"
        const li =document.createElement('li')
        li.classList.add('task-item');

        const spanName = document.createElement('span')
        spanName.textContent = `${index + 1}. ${task.name}`
    
        //kiểm tra hoàn thành chưa
        if(task.completed){
            spanName.classList.add('completed');
        }
        //nút hoàn thành
        const btnComplete = document.createElement('button')
        btnComplete.textContent = "✔️"
        btnComplete.classList.add('btn-complete');
        //nút xóa
        const btnRemove = document.createElement('button')
        btnRemove.textContent = "🗑️"
        btnRemove.classList.add('btn-remove');
        // xử lý khi xóa 
        btnRemove.addEventListener("click", () => {
            RemoveOneTask(index)
        });
        // xử lý khi hoàn thành
        btnComplete.addEventListener("click", () =>{
            HoanThanh(index)
        })
        li.appendChild(spanName)
        li.appendChild(btnComplete)
        li.appendChild(btnRemove)
        taskList.appendChild(li)
    });
    renderHistory()
}
btnAddJob.addEventListener('click', () => {
    const name = input.value.trim();
    if(!name){
        errorInput.textContent = 'Vui lòng nhập công việc.'
        return;
    }
    errorInput.textContent = ''
    tasks.push({name, completed: false})
    history.push({
        time: new  Date().toISOString(),
        text: `➕ Thêm công việc: ${name}`
    })
    renderListJob()
    saveTaskListJob()
    saveHistoryJob()
    input.value = ''
});

function RemoveOneTask(index){
    if(index < 0 || index >= tasks.length){
        return
    }
    const removeTask = tasks[index]
    tasks.splice(index,1)
    history.push({ time: new Date().toISOString(), text: `🗑 Xóa công việc: ${removeTask.name}` });
    renderListJob()
    saveTaskListJob()
    saveHistoryJob()
}
function HoanThanh(index){
    if(index < 0 || index >= tasks.length){
        return
    }
    // toggle trạng thái hoàn thành
    tasks[index].completed = !tasks[index].completed;

    const actionText = tasks[index].completed ? `✔️ Hoàn thành công việc: ${tasks[index].name}` : `↩️ Bỏ hoàn thành công việc: ${tasks[index].name}`;
    history.push({ time: new Date().toISOString(), text: actionText });
    renderListJob()
    saveTaskListJob()
    saveHistoryJob()

}
btnDeleteAllJob.addEventListener('click', () =>{
    const soLuong = tasks.length
    if(soLuong === 0){
        alert("Danh sách đang trống!");
        return
    }
    if(!confirm("Bạn có chắc muốn xóa tất cả công việc không?")){
        return;
    }
    history.push({ time: new Date().toISOString(), 
    text: `⚠️ Đã xóa toàn bộ danh sách công việc (${soLuong} công việc)` });
    tasks = []

    renderListJob()
    renderHistory()
    saveTaskListJob()
    saveHistoryJob()

});
btnDeleteAllHistory.addEventListener('click', () =>{
    // xóa mảng
    history =  []
    historyList.innerHTML = "chưa có hành động nào"
    saveHistoryJob()
    alert("Đã xóa toàn bộ lịch sử")

});
function renderHistory(){
    historyList.innerHTML = "";
    if(history.length === 0){
        const li = document.createElement("li");
        li.classList.add('task-item');
        li.textContent = "Chưa có hành động nào."
        historyList.appendChild(li);
        return;
    }
    /// [...history] tạo bản sao độc lập
    /// reverse đảo ngược 
    [...history].reverse().forEach(h =>{
        const li = document.createElement("li");
        li.classList.add('task-item');
        li.textContent = `${formatTime(h.time)} - ${h.text}`
        historyList.appendChild(li);
    })
}
function formatTime(iso){
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}
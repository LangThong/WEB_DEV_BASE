const input = document.querySelector("#input")
const errorInput = document.querySelector("#errorInput")
const btnAddJob = document.querySelector("#btnAddJob")
const btnDeleteAllJob = document.querySelector("#btnDeleteAllJob")
const taskList = document.querySelector("#taskList")
const historyList = document.querySelector("#historyList")
const btnDeleteAllHistory = document.querySelector("#btnDeleteAllHistory")
const searchInput = document.querySelector("#search")
const selectStaff = document.querySelector("#selectStaff")
const selectSearch = document.querySelector("#selectSearch")
const selectPriority = document.querySelector("#selectPriority")
const inputDateTime = document.querySelector("#inputDateTime")
const staffs = [
    {id: 1, name: "Thuận"},
    {id: 2, name: "Thành"},
    {id: 3, name: "Đạt"},
    {id: 4, name: "Đạt"}
]
const priorities = [
    {id: "high", value: "High"},
    {id: "medium", value: "Medium"},
    {id: "low", value: "Low"}
]

let tasks = JSON.parse(localStorage.getItem("TaskListJob")) || []
let history = JSON.parse(localStorage.getItem("HistoryJob")) || []

function saveTaskListJob (){
    localStorage.setItem("TaskListJob", JSON.stringify(tasks))
}
function saveHistoryJob (){
    localStorage.setItem("HistoryJob", JSON.stringify(history))
}
function renderListJob (list = tasks){
    // xóa nội dung cũ
    taskList.innerHTML = ""
    // kiểm tra có danh sách công việc chưa
    if(list.length === 0){
        const li = document.createElement("li");
        li.classList.add('task-item'); 
        li.textContent = "Danh sách đang rỗng!!!"
        taskList.appendChild(li)
        return
    }
    list.forEach((task, i) => {
        // Nội dung: "1. Công việc"
        const li =document.createElement('li')
        li.classList.add('task-item');

        const spanName = document.createElement('span')
        spanName.textContent = `${i + 1}. ${task.title} `
        spanName.classList.add('task-title')

        const spanName2 = document.createElement('span')
        spanName2.textContent = `${task.staffName} `
        spanName2.classList.add('task-staff')

        const spanName3 = document.createElement('span')
        spanName3.textContent = `${task.priority} `
        spanName3.classList.add('task-priority')
        spanName3.classList.add(task.priority.toLowerCase())

        const spanThoiGianHoanThanh = document.createElement('span')
        console.log("Tttttttttt",task.deadline,  typeof task.deadline)
        const thoiGian = new Date(task.deadline)
        spanThoiGianHoanThanh.textContent = thoiGian.toLocaleString()
        spanThoiGianHoanThanh.classList.add('task-deadline')

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
            RemoveOneTask(task.id)
        });
        // xử lý khi hoàn thành
        btnComplete.addEventListener("click", () =>{
            toggleComplete(task.id)
        })
        li.appendChild(spanName)
        li.appendChild(spanName2)
        li.appendChild(spanName3)
        li.appendChild(spanThoiGianHoanThanh)
        li.appendChild(btnComplete)
        li.appendChild(btnRemove)
        taskList.appendChild(li)
    });
   
}
btnAddJob.addEventListener('click', () => {
    const name = input.value.trim()
    const staffId = selectStaff.value
    const priorityValue = selectPriority.value
    const thoiGianHoanThanh = inputDateTime.value

    if(!name || ! staffId || !priorityValue || !thoiGianHoanThanh){
        errorInput.textContent = 'Vui lòng nhập công việc và nhân viên'
        return;
    }
    errorInput.textContent = ''
    const findStaff = staffs.find(s => s.id === Number(staffId))
    const staffName = findStaff.name
    tasks.push({
        id: Date.now(),
        title: name,
        staffId: Number(staffId),
        staffName: staffName,
        priority: priorityValue, // priority: mức độ ưu tiên
        completed: false,
        deadline: thoiGianHoanThanh 
    })
    history.push({
        time: new  Date().toISOString(),
        text: `➕ Thêm công việc: tên công việc ${name}, nhân viên ${staffName}`
    })
    renderListJob()
    saveTaskListJob()
    saveHistoryJob()
    renderHistory();
    input.value = ''
    selectStaff.value = ""
    selectPriority.value =""
    inputDateTime.value = ""

});
function RemoveOneTask(id){
    const index = tasks.findIndex(t => t.id === id)
    if(index === -1) return

    const removeTask = tasks[index]

    tasks.splice(index,1)
    history.push({ time: new Date().toISOString(), text: `🗑 Xóa công việc: ${removeTask.title}, nhân viên ${removeTask.staffName}`, });
    renderListJob()
    renderHistory()
    saveTaskListJob()
    saveHistoryJob()
}
function toggleComplete(id){
    const task = tasks.find(t => t.id === id)
    if(!task){
        return
    }
    // toggle trạng thái hoàn thành
    task.completed = !task.completed;

    const actionText = task.completed ? `✔️ Hoàn thành công việc: ${task.title}` : `↩️ Bỏ hoàn thành công việc: ${task.title}`;
    history.push({ time: new Date().toISOString(), text: actionText });
    renderListJob()
    renderHistory()
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
function renderSelectStaff(){
    selectStaff.innerHTM = ""
    const optionSelect = document.createElement("option")
    optionSelect.value = ""
    optionSelect.textContent = "---Chọn nhân viên---"
    selectStaff.appendChild(optionSelect)

    staffs.forEach(s =>{
        const option = document.createElement("option")
        option.value = s.id
        option.textContent = s.name
        selectStaff.appendChild(option)
    });
}
renderSelectStaff()
function  renderSelectPriority(){
    selectPriority.innerHTML = ""
    const optionDefault  = document.createElement("option")
    optionDefault.value = ""
    optionDefault.textContent = "---Chọn độ ưu tiên---"
    selectPriority.appendChild(optionDefault)

    priorities.forEach(p =>{
        const option = document.createElement("option")
        option.value = p.id // high | medium | low
        option.textContent = p.value
        selectPriority.appendChild(option)
    });
}
renderSelectPriority()

function renderSelectSearch(){
    const optionSelect = document.createElement("option")
    optionSelect.value = ""
    optionSelect.textContent = "---Tìm theo nhân viên---"
    selectSearch.appendChild(optionSelect)

    staffs.forEach(s =>{
        const option = document.createElement("option")
        option.value = s.id
        option.textContent = s.name
        selectSearch.appendChild(option)
    });

    const optionAll= document.createElement("option")
    optionAll.value = "all"
    optionAll.textContent = "Tất cả các nhân viên"
    selectSearch.appendChild(optionAll)
    
}
renderSelectSearch()
function filterTasks(){
    const keyword = searchInput.value.toLowerCase()  //.toLowerCase() để chuyển thành chữ thường → Giúp search không phân biệt chữ hoa chữ thường
    const staffId = selectSearch.value
    console.log("staffId đang chọn:", staffId)
    let result
    if (keyword) {
        console.log("Tasks", tasks)
        result = tasks.filter(t => // .filter() tạo ra một mảng mới gồm những phần tử thỏa điều kiện.
            t.title.toLowerCase().includes(keyword)//includes(keyword) Kiểm tra tên task chứa keyword
        );
        console.log("tim result key: ",result)
    }
    else result = tasks
    if (staffId && staffId !=="all" && !!result) {
       result = result.filter(t => {
            return t.staffId === Number(staffId)
        })
        console.log("tim result key và staffId: ",result)
    }
    console.log("Kết quả sau filter:", result)
    renderListJob(result);
}
searchInput.addEventListener("input", filterTasks);
selectSearch.addEventListener('change', filterTasks)


function formatTime(iso){
  const d = new Date(iso);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}
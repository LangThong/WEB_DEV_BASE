const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// phương thức bind() cho phép ràng buộc this cho một phương thức(function)
const app = (() =>{
    const cars= ['BMW']
    const root = $('#root')
    const inputName = $('#inputName')
    const submit = $('#submit')

    return {
        add(car){
            cars.push(car)
        },
        delete(index){
            cars.splice(index,1)
        },
        render(){
           
            const html = cars.map((car, index) => `
                    <li>
                        ${car}
                        <span class="delete" data-index="${index}">&times</span>
                    </li>
                `)
                .join('')
            root.innerHTML = html
        },
        handleDelete(event){
            const deleteBtn = event.target.closest('.delete') // tìm phần tử cha gần nhất (hoặc chính nó) khớp selector.
            // console.log(deleteBtn)
            if(deleteBtn){
                // data-tu dat ten bằng với dataset
                const index = deleteBtn.dataset.index
                this.delete(index)
                this.render()
            }
        },
        init(){
            // Handle DOM events
            submit.onclick = () => { // arrow function
                const car = inputName.value
                this.add(car)
                this.render()

                inputName.value = ''
                inputName.focus() // dùng để đưa con trỏ (cursor) vào ô input.
            }
            // mong muốn khi onclick vào root thì gọi đc handleDelete
            root.onclick = this.handleDelete.bind(this)

            this.render()
        }
    }
})();
app.init()



function fn(){}
console.log(fn.bind === Function.prototype.bind)
console.log(fn.call=== Function.prototype.call)
console.log(fn.apply === Function.prototype.apply)


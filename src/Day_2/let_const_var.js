/*
    let
       - Khai báo biến có thể thay đổi giá trị
       - Phạm vi khối (block scope)
       - Không được khai báo lại trong cùng một phạm vi
 */
console.log("Bài về let: ");
let x = 10;
console.log(x);
if(true){  
    let x = 20;
    console.log(x);
}
console.log(x);
/*
    const
       - Dùng cho các hằng số, không thể thay đổi giá trị sau khi đã gán
       - Phạm vi: khối (block scope)
       - Đối với object và array: ko thể gán lại biến, nhưng thành phần trong đó có thể thay đổi
 */
console.log("Bài về const: ");
const y = 30;
//y = 40; lỗi
const arr  = [1, 2, 3];
arr.push(4);
// arr = [5, 6, 7]; lỗi
console.log(arr);
/*
    var (hạn chế dùng)
       - function scope
       - Có tính hoisting (nâng khai báo lên đầu scope) với giá trị undefined.
       - Dễ gây lỗi khi dùng trong block — nên tránh trong code hiện đại.
 */
console.log("Bài về var: ");
if(true){
    var z = 50;
}
console.log(z);
/*
    Tóm tắt:
         - Dùng let và const thay vì var để tránh lỗi không mong muốn.
         - Dùng const khi không cần thay đổi giá trị biến. (măth định)
         - Dùng let khi cần thay đổi giá trị biến.
*/

/*
    Kiểu dữ liệu trong JavaScript
        - Primitive (nguyên thủy):
            + Number  ví dụ: 42, 3.14
            + String  ví dụ: "Hello", 'World'
            + Boolean ví dụ: true, false
            + Null    ví dụ: null (không có giá trị)
            + Undefined ví dụ: undefined (chưa được gán giá trị)
            + Symbol  ví dụ: Symbol('id')
            + bigint  ví dụ: 9007199254741991n
        - Object (đối tượng):
            + Object ví dụ: {name: "Alice", age: 25}
            + Array  ví dụ: [1, 2, 3, 4, 5]
            + Function ví dụ: function greet() { console.log("Hello"); }
            + Date   ví dụ: new Date()
            + RegExp ví dụ: /ab+c/
            + Map    ví dụ: new Map()
            + Set    ví dụ: new Set()
            + WeakMap ví dụ: new WeakMap()
            + WeakSet ví dụ: new WeakSet()
    
*/
/*
    Toán tử số học và toán tử nối chuỗi
*/
    let a = 5;
    let b = 2;
    a + b // 7
    a - b // 3
    a * b // 10
    a / b // 2.5
    a % b // 1
    a ** b // 25 (lũy thừa)
    a++  // 6 (tăng giá trị lên 1)
    b--  // 1 (giảm giá trị đi 1)
    // =======================
    1 + 2 + "3"    // "33"  -> (1+2)=3, 3+"3" => "33"
    "1" + 2 + 3    // "123" -> "1"+2 => "12", +"3" => "123"
    
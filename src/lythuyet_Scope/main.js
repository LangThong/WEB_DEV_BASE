function outer() {
  let count = 0; // biến cục bộ của outer
  function inner() {
    count++;
    console.log(count);
  }
  return inner;
}
const counter = outer(); // outer() chạy -> trả về inner
counter(); // 1
counter(); // 2
counter(); // 3
//========================================================================//
function createApp(){
  let cars = [];
  return {
    add(car){
      cars.push(car);
    },
    show(){
      console.log(cars);
    }
  }
}

const app = createApp();
app.add(123);
app.add('thuận')
app.show();

//========================================================================//

function a(x) {
    x++;
    return function () {
        console.log(++x);
    };
}
a(1)();
a(1)();
a(1)();

let x = a(1); /// 2
x();
x();
x();
// Output: ?
//========================================================================//
var tip = 100;

(function () {
  console.log("I have $" + husband());

  function wife() {
    return tip * 2;
  }

  function husband() {
    return wife() / 2;
  }

  var tip = 10; // đưa var lên đầu và bằng undefined
})();
// Output: ?


//========================================================================//
 // "user strict" // sử dụng nghiêm ngặt
//  const student = Object.freeze({ // freeze đóng băng hàm bên trong nó
//     fullName: 'Nguyễn Văn A'
//  })

// student.fullName ='Nguyễn văn B'
// console.log(student);
//========================================================================//
//Thực hành Strict mode
// "use strict"
// var hero = "Doctor Strange"

// function MultiverseOfMadness() {
//    var universe = 616
// }

// MultiverseOfMadness()

// console.log(hero) //Output ?
// console.log(universe) //Output ?
//========================================================================//

const iPhone15 = {
  // thuộc tính là Property
  nameIphone : 'iPhone 15 Pro Max',
  color : 'Prink',
  weight : 400,
  // Phương thức là method
  takePhoto(){
    console.log(this);
  },
  objChild:{
    nameChild: 'iphone16',
    methodChild(){
      console.log(this)
    }
  }

}
console.log(iPhone15.objChild.methodChild());
//========================================================================//

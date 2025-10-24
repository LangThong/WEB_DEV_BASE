document.getElementById("btnGiai").onclick = function (){
    const heSoA = parseFloat(document.getElementById("a").value);
    const heSoB = parseFloat(document.getElementById("b").value);
    const heSoC = parseFloat(document.getElementById("c").value);
    const result = document.getElementById("result");

    // kiểm tra 
    if(isNaN(heSoA) || isNaN(heSoB) || isNaN(heSoC)){
        alert("Vui lòng nhập đầy đủ và đúng định dạng số!!");
        return;
    }
    // trường hợp a =0;
    if(heSoA === 0){
        if(heSoB === 0){
            result.innerText = heSoC === 0 ? "Phương trình vô số nghiệm." : "Phương trình vô nghiệm.";
        }else{
            const x = -heSoC/heSoB;
            result.innerText = `Phương trình bậc nhất, nghiệm x = ${x}.`;
        }
        return;
    }
    const delta = heSoB*heSoB -4*heSoA*heSoC;
    if(delta < 0){
        result.innerText = `delta: ${delta}, Phương trình vô nghiệm.`;
    }else if (delta === 0){
        const x = -heSoB/(2*heSoA*heSoC);
        result.innerText = `delta: ${delta}, Phương trình có nghiệm kép x1 = x2 = nghiệm x = ${x}.`;
    }else{
        const x1= (-heSoB + Math.sqrt(delta)) / (2 * heSoA);
        const x2= (-heSoB - Math.sqrt(delta)) / (2 * heSoA);
        result.innerText = `delta: ${delta}, Có 2 nghiệm phân biệt: x1 = ${x1}, x2 = ${x2}`;
    }
}
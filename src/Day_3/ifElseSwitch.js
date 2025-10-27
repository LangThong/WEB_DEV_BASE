/*
    if(điều_kiện){
        // chạy điều kiện đúng
    } else{
        // chạy điều kiện sai
    }
*/

/*
    if (điều_kiện_1) {
        // Nếu điều_kiện_1 đúng -> chạy đoạn này
    } else if (điều_kiện_2) {
        // Nếu điều_kiện_1 sai nhưng điều_kiện_2 đúng -> chạy đoạn này
    } else {
        // Nếu tất cả điều kiện trên đều sai -> chạy đoạn này
    }
*/
/*
    switch (biến) {
        case "giá trị 1":
            // hành động nếu biến === "giá trị 1"
            break;

        case "giá trị 2":
            // hành động nếu biến === "giá trị 2"
            break;

        default:
            // hành động khi không khớp với case nào ở trên
    }
*/


/**
    console.log(5 == "5");   // true (chỉ so sánh giá trị)
    console.log(5 === "5");  // false (khác kiểu: number vs string)
    console.log(7 > 3);      // true
    console.log(7 != 7);     // false

    Dùng === và !== trong thực tế để tránh lỗi so sánh sai kiểu dữ liệu.
    (Vì JavaScript tự động ép kiểu khi dùng == và !=)

    !==            Khác (so cả kiểu dữ liệu)
    &&             Và (AND)
    !              Phủ định (NOT)                     
*/
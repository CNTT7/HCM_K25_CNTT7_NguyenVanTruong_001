let currentBookingCode ="";
let isBookingValid = false;
let totalRevenue = 0;
let totalBookings = 0;
let choiceMenu = "";

while(choiceMenu!== "0"){
    choiceMenu = prompt(`
${"=".repeat(50)}
HỆ THỐNG BÁN VÉ RẠP MOONLIGHT CINEMA
${"=".repeat(50)}
1. Nhập và kiểm chuẩn mã đặt vé
2. Tính tiền vé xem phim
3. Thẩm định số seri vé may mắn
0. Thoát chương trình
${"=".repeat(50)}
Vui lòng nhập lựa chọn của bạn (0 - 3):
`)
    // if(choiceMenu){

    // }
    switch(choiceMenu){
        case "1":
            currentBookingCode =""
            isBookingValid = false
            currentBookingCode = prompt("Nhập chuỗi mã vé: ");
            if(currentBookingCode === null || currentBookingCode === ""){
                console.log("Lỗi: Chưa nhập mã đặt vé.")
                break
            }
            currentBookingCode =currentBookingCode.trim().toUpperCase()
            if(currentBookingCode.length < 6){
                console.log("Lỗi: Độ dài nhỏ hơn 6 kí tự.")
                break
            }
            if(!currentBookingCode.startsWith("CIN-")){
                console.log('Lỗi: Sai tiền tố "CIN-".')
                break
            }
            if(currentBookingCode.includes(" ")){
                console.log("Lỗi: Chứa khoảng trắng ở giữa")
                break
            }
            isBookingValid = true
            console.log("Mã vé đặt hợp lệ.")
            break
        case "2":
            if(isBookingValid === false){
                console.log("Bạn phải quay lại bước 1 để nhập và kiểm tra mã vé trước.")
                break
            }
            let ticketCount = ""
            while(true){
               ticketCount = prompt("Nhập số vé: ")
               if(ticketCount === null){
                    console.log("Đã hủy thao tác")
                    break
               }
               ticketCount = ticketCount.trim()
                let parsedTicketCount = Number(ticketCount)
               if(Number.isInteger(parsedTicketCount) && parsedTicketCount > 0 && parsedTicketCount !== ""){
                    ticketCount = parsedTicketCount  
                    break
               }
               console.log("Lỗi số vé không hợp lệ vui lòng nhập lại.")
            }
            let pricePerTicket = ""
            while(true){
               pricePerTicket = prompt("Nhập giá vé: ")
               if(pricePerTicket === null){
                    console.log("Đã hủy thao tác")
                    break
               }
               pricePerTicket = pricePerTicket.trim()
               let parsedPricePerTicket = Number(pricePerTicket)
               if(Number.isInteger(parsedPricePerTicket) && parsedPricePerTicket > 0 && parsedPricePerTicket !== ""){
                    pricePerTicket =  parsedPricePerTicket  
                    break
               }
               console.log("Lỗi giá vé không hợp lệ vui lòng nhập lại.")
            }
            let baseCost = pricePerTicket *ticketCount
            let discount = Math.round(ticketCount >= 4 ? baseCost * 0.1: 0)
            let serviceFee = Math.round((baseCost - discount) * 0.08)
            let totalBill = baseCost - discount + serviceFee
            totalRevenue = totalRevenue + totalBill
            totalBookings++

            console.log(`
${"=".repeat(50)}
                Hóa đơn                
${"=".repeat(50)}
Mã đặt vé: ${currentBookingCode}
Số vé: ${ticketCount}
Giá mỗi vé: ${pricePerTicket}
Chi phí cơ sở: ${baseCost}
Tiền giảm giá: ${discount}
Phí dịch vụ: ${serviceFee}
${"=".repeat(50)}
Tổng thanh toán: ${totalBill}`)
            currentBookingCode =""
            isBookingValid = false
            break
        case "3":
            let numberLucky = prompt("Nhập chuỗi số seri in trên vé: ")
            if(numberLucky === null){
                break
            }
            numberLucky = numberLucky.trim
            let flagAllNumber = 0
            let flagAllZero = 0
            for(let i = 0 ; i < numberLucky.length; i++){
                if(numberLucky[i] > "9" || numberLucky[i] < "0" || numberLucky.length < 2 ){
                    flagAllNumber = 1
                }
                if(numberLucky[i] !== "0"){
                    flagAllZero = 1
                }
                    
            }
            if(flagAllNumber){
                console.log("Số seri không hợp lệ")
                break
            }
            if(flagAllZero === 0){
                console.log("Số seri không hợp lệ")
                break
            }

            let reverse = ""
            for(let i =  numberLucky.length - 1 ; i >= 0; i++){
                reverse += numberLucky[i]
            }
            let digitSum = 0
            for(let i = 0 ; i < numberLucky.length; i++){
                digitSum += Number(numberLucky[i])
            }
            if(reverse === numberLucky && digitSum % 9 === 0){
                console.log("Bạn nhận: Giải đặc biệt(Thẻ xem phim miễn phí 10 lượt trị giá 1.000.000 VNĐ.)")
            }else if(reverse === numberLucky){
                console.log("Bạn nhận: Giải nhất(Combo bắp nước đôi trị giá 150.000 VNĐ.)")
            }else if(digitSum % 9 === 0){
                console.log("Bạn nhận: Giải nhì(Voucher giảm 30.000 VNĐ cho lần đặt vé kế tiếp.)")
            }else{
                console.log("Bạn không nhận gì cả.")
            }
            
            break

        case "0":
            console.log(`

BÁO CÁO TỔNG KẾT CA BÁN VÉ

Tổng số đơn đặt vé đã thanh toán : ${totalBookings}

Tổng doanh thu : ${totalRevenue}

Doanh thu trung bình: ${totalRevenue/totalBookings}`)
            break
    }
}
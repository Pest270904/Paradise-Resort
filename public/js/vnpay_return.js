function backToReservation() {
    window.location.href = '/reservation';
}
document.getElementById('backToReservationBtn').addEventListener('click', backToReservation);
// Lấy tham số từ URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Trích xuất các thông tin từ tham số URL
const resId = urlParams.get('resId');
const amount = urlParams.get('vnp_Amount');
const bankCode = urlParams.get('vnp_BankCode');
const transactionId = urlParams.get('vnp_TransactionNo');

// Hiển thị thông tin trên trang
document.getElementById('resId').innerText = resId;
document.getElementById('amount').innerText = amount;
document.getElementById('bankCode').innerText = bankCode;
document.getElementById('transactionId').innerText = transactionId;

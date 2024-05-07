document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của nút đăng xuất

            // Thực hiện các bước đăng xuất ở đây, ví dụ:
            // Xóa token hoặc thông tin phiên đăng nhập từ bộ nhớ cục bộ

            // Sau khi đăng xuất, chuyển hướng người dùng đến trang chủ
            window.location.href = '/logout';
        });
    }
});
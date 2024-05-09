function loadBookingInformation() {
    fetch('data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load booking data');
            }
            return response.json();
        })
        .then(databooking => {
            console.log(databooking)
            const arrayDatabooking = Object.values(databooking);
            console.log(arrayDatabooking)
            // Lấy bảng danh sách đặt phòng
            const listBooking = document.querySelector('.booking-list-tbody');
            // Xóa dữ liệu cũ tdong bảng (nếu có)
            listBooking.innerHTML = '';
            arrayDatabooking.forEach(booking => {
                const listBooking = document.querySelector('.booking-list-tbody');
            
            // Xóa dữ liệu cũ tdong bảng (nếu có)
            listBooking.innerHTML = '';
            
            // Lặp qua dữ liệu và tạo hàng bảng cho mỗi dữ liệu
            arrayDatabooking.forEach(booking => {
                // Tạo một hàng bảng
            
                // Tạo ô bảng cho từng thuộc tính của dữ liệu
                for ( let i = 0; i < booking.length; i++ )
                    {
                        const row = document.createElement('tr');
                        const resIdCell = document.createElement('td');
                        resIdCell.textContent = booking[i].res_id;
                        row.appendChild(resIdCell);
                        
                        const fullNameCell = document.createElement('td');
                        fullNameCell.textContent = booking[i].fullName;
                        row.appendChild(fullNameCell);
                        
                        const roomIdCell = document.createElement('td');
                        switch (booking[i].room_id)
                        {
                            case 1:
                                roomIdCell.textContent = "DELUXE DOUBLE ROOM";
                                break;
                            case 2:
                                roomIdCell.textContent = "DELUXE TWIN ROOM";
                                break;
                            case 3:
                                roomIdCell.textContent = "GRAND DELUXE DOUBLE ROOM";
                                break;
                            case 4:
                                roomIdCell.textContent = "THE BEACHFRONT VILLA";
                                break;
                        }
                        row.appendChild(roomIdCell);
                        
                        const bookingInfoCell = document.createElement('td');
                        bookingInfoCell.innerHTML = `Check-in: ${booking[i].start}`;
                        row.appendChild(bookingInfoCell);
                        
                        // Tạo ô chứa các nút hành động
                        const actionCell = document.createElement('td');
                        
                        // Tạo nút Chấp nhận
                        const acceptButton = document.createElement('button');
                        acceptButton.textContent = 'Accept';
                        acceptButton.className = 'btn-accept';
                        actionCell.appendChild(acceptButton);
                        
                        // Tạo nút Xóa
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.className = 'btn-delete';
                        actionCell.appendChild(deleteButton);
                        row.appendChild(actionCell);
                        
                        // Tạo ô trạng thái
                        const statusCell = document.createElement('td');
                        if (booking[i].status == 1)
                            {
                                statusCell.textContent = "Pending";
                            }
                        row.appendChild(statusCell);
                        listBooking.appendChild(row);
                    }
            });
        })
    })
}
window.addEventListener('load', loadBookingInformation);

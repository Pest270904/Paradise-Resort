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
                        resIdCell.textContent = booking[i].res_id
                        row.appendChild(resIdCell);
                        
                        const fullNameCell = document.createElement('td');
                        fullNameCell.innerHTML = `${booking[i].fullName} <br> Phone: ${booking[i].phoneNumber} `
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
                        // Tạo đối tượng Date với thời gian chuẩn UTC
                        // const utcDate = new Date(booking[i].booking_time);
                        // const bookingtime = utcDate.getTime();
                        // console.log(bookingtime)
                        bookingInfoCell.innerHTML = `Check-in: ${booking[i].start} <br> Duration: ${booking[i].days} `;
                        row.appendChild(bookingInfoCell);
                        
                        // Tạo ô trạng thái
                        const statusCell = document.createElement('td');
                        switch (booking[i].status)
                        {
                            case 0:
                                statusCell.textContent = "Paid";
                                break;
                            case 1:
                                statusCell.textContent = "Pending";
                                break;
                            case 2:
                                statusCell.textContent = "Ended Reservation";
                        }
                        row.appendChild(statusCell);
                        listBooking.appendChild(row);

                        // Tạo ô chứa các nút hành động
                        const actionCell = document.createElement('td');

                        // Tạo nút Xóa
                        if (booking[i].status!=2)
                            {
                                const cancelButton = document.createElement('button');
                                cancelButton.textContent = 'Cancel Reservation';
                                cancelButton.className = 'btn-delete';
                                actionCell.appendChild(cancelButton);
                                row.appendChild(actionCell);
                                cancelButton.addEventListener('click', function () {

                                cancel_admin_reservation(booking[i].res_id)
                                    })
                            }
                        else
                            {
                                actionCell.textContent = ""
                                row.appendChild(actionCell);
                            }
                    }
            });
        })
    })
}
function cancel_admin_reservation(reservationId) {
    var confirmCancel = confirm("Are you sure about canceling this reservation?");
    if (confirmCancel)
    {
        var xhr = new XMLHttpRequest();
        const url = `/reservation/cancel`;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              // Optionally handle successful response
              console.log('Reservation canceled successfully');
            } else {
              // Optionally handle error response
              console.error('Error canceling reservation');
            }
          }
        };
        const data = JSON.stringify({ res_id: reservationId });
        xhr.send(data);
        window.location.href = `/admin/admin-reservation`;
    }
  }
window.addEventListener('load', loadBookingInformation);    

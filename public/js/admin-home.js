function loadDataPageAdminHome() {
    fetch('dataRoom')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load Room data');
            }
            return response.json();
        })
        .then(dataRoom => {
            const arrayDataRoom = Object.values(dataRoom);
            // console.log(dataRoom)
            arrayDataRoom.forEach(room=> {
                // Tạo biến và gán biến số phòng trống vào admin-page
                let total_available_room = 0;
                for (let i = 0 ; i < room.length; i++)
                    {
                        total_available_room += room[i].available 
                    }
                document.getElementById("stat-smalltext-empty-room").innerText = total_available_room
            })
        }
        )
        fetch('data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load booking data');
            }
            return response.json();
        })
        .then(databooking => {
            const arrayDatabooking = Object.values(databooking);
            arrayDatabooking.forEach(booking => {
                    let total_booked_room = 0;
                    for (let i = 0 ; i < booking.length ; i++)
                        { 
                            if (booking[i].status != 2)
                                {
                                    total_booked_room += 1;
                                }
                        }
                    let total_revenue = 0;
                    for (let i = 0 ; i < booking.length ; i++)
                        { 
                            total_revenue += booking[i].total_cost
                        }
            document.getElementById ("stat-smalltext-booked-room").innerText = total_booked_room
            document.getElementById("stat-smalltext-revenue").innerText = total_revenue + ' Đ'
        })
    })
    fetch('data-review')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load booking data');
            }
            return response.json();
        })
        .then(datareview => {
            const arrayDatareview = Object.values(datareview);
            // console.log(arrayDatareview)
            let total_review = arrayDatareview.length
            document.getElementById("stat-smalltext-review").innerText = total_review;
    })
    fetch('dataUser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load user data');
            }
            return response.json();
        })
        .then(datauser => {
            let total_user = datauser.length -1 ;
            document.getElementById("stat-smalltext-user").innerText = total_user;
        })
}
window.addEventListener('load', loadDataPageAdminHome); 

function loadUserInformation() {
    fetch('dataUser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load user data');
            }
            return response.json();
        })
        .then(datauser => {
            // Log dữ liệu để kiểm tra cấu trúc
            console.log('Data received:', datauser);

            const listUser = document.querySelector('.users-list-tbody');

            datauser.forEach(user => {
                const rowUser = document.createElement('tr');
                
                const userIdCell = document.createElement('td');
                userIdCell.textContent = user.id;
                rowUser.appendChild(userIdCell);

                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                rowUser.appendChild(usernameCell);

                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = user.fullName;
                rowUser.appendChild(fullNameCell);

                const phoneNumberCell = document.createElement('td');
                phoneNumberCell.textContent = user.phoneNumber;
                rowUser.appendChild(phoneNumberCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                rowUser.appendChild(emailCell)
                
                if(user.username != 'admin' )
                    {
                        const disableCell = document.createElement('td');
                        const disableButton = document.createElement('button');
                        disableButton.textContent = 'Disable';
                        disableButton.className = 'btn-delete';
                        disableButton.addEventListener('click', () => {
                    // Xử lý sự kiện khi nhấn nút
                    confirm(`Are you sure about disabling account ${user.username} ?`);
                    
                });
                disableCell.appendChild(disableButton);
                rowUser.appendChild(disableCell);
                    }
                    else
                    {
                        const disableCell = document.createElement('td');
                        disableCell.textContent = '';
                        rowUser.appendChild(disableCell);
                    }
                listUser.appendChild(rowUser);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener('load', loadUserInformation);

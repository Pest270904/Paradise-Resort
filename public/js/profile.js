function profile_logout() {
    var confirmed = confirm("Are you sure you want to log out?");
    if (confirmed) {
        window.location.href = `/auth/logout`
    }
}

function confirmSave(username) {
    var confirmed = confirm("Are you sure you want to save changes?");
    if (confirmed) {
        var xhr = new XMLHttpRequest();
        const url = `/user/${username}/changeInformation`;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = JSON.stringify({ 
            username: username,
            fullName: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phoneNumber").value
        });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                } 
                else {
                    const errorMessage = JSON.parse(xhr.responseText).error;
                    document.cookie = `error=${errorMessage};path=/`; // Set the cookie with the error message
                }
                window.location.href = `/user/${username}`;
            }
        };
        xhr.send(data);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var jumpButton = document.getElementById('changePwd');
    jumpButton.addEventListener('click', function() {
        if(document.getElementById('pwd-div').style.display == 'block')
            {    
                document.getElementById('pwd-div').style.display = 'none'
                history.pushState(null, null, window.location.pathname);
            }
        else
            {    
                document.getElementById('pwd-div').style.display = 'block'
                // Scroll to the element with ID
                var element = document.getElementById('changePwd');
                element.scrollIntoView({ behavior: 'smooth' });

                history.pushState(null, null, '#changePwd');
            }
    });
});

function togglePasswordVisibility(inputId) {
    var inputField = document.getElementById(inputId);
    var icon = inputField.nextElementSibling.querySelector('i');

    if (inputField.type === "password") {
        inputField.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        inputField.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function confirmPwd(username) {
    var confirmed = confirm("Are you sure you want to change password?");
    if (confirmed) {
        var xhr = new XMLHttpRequest();
        const url = `/user/${username}/changePassword`;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = JSON.stringify({ 
            username: username,
            oldPwd: document.getElementById('old-pwd').value,
            newPwd: document.getElementById('new-pwd').value,
            confirmPwd: document.getElementById('confirm-pwd').value
        });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                } 
                else {
                    const errorMessage = JSON.parse(xhr.responseText).error;
                    document.cookie = `error=${errorMessage};path=/`; // Set the cookie with the error message
                }
                window.location.href = `/user/${username}`;
            }
        };
        xhr.send(data);
    }
}
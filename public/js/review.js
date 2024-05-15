const allStar = document.querySelectorAll('.rating .fa-star')
const ratingValue = document.querySelector('.rating input')
let isRated = false;
allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		isRated = true;
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('fa-solid', 'fa-regular')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('fa-regular', 'fa-solid')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');
	const notification = document.getElementById('notification');
	form.addEventListener('submit', function (event) {
		event.preventDefault(); 
		
		const jwt = getCookie('jwt');
        if (!jwt) {
            const opinionTextarea = document.querySelector('textarea[name="opinion"]');
            opinionTextarea.value = "Vui lòng đăng nhập trước khi gửi đánh giá!";
			opinionTextarea.readOnly = true;
            return;
        }
		
		let rating = parseInt(document.querySelector('input[name="rating"]').value);
		const opinionTextarea = document.querySelector('textarea[name="opinion"]');
        const opinion = opinionTextarea.value.trim();
		if (opinion === '') {
            alert("Vui lòng nhập ý kiến của bạn trước khi gửi đánh giá.");
            return; // Không gửi dữ liệu nếu textarea trống
        }
		if (!isRated) {
            rating = 5;
        }
		
		// Gửi dữ liệu đến server
		fetch('/review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
			body: JSON.stringify({ rating: rating, opinion: opinion }),
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const data = { message: 'Review submitted successfully!' };
			notification.textContent = data.message;
       		notification.classList.add('show');
			setTimeout(function() {
           		notification.classList.remove('show');
        	}, 3000);
			return response.json();
		})
		.catch(handleRequestError);
	});
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('review/getAll')
    .then(response => response.json())
    .then(review => {
        const reviewsContainer = document.getElementById('review');
        review.forEach(review => {
            const reviewElement = document.createElement('div');
			reviewElement.classList.add('review-item');
            reviewElement.innerHTML = `
			<div class="review-content">
					<p><strong>User:</strong> ${review.userIdName}</p>
					<div style ="display: flex; align-items: center;">
                        <p><strong>Rating:</strong> ${review.rating}</p>
                        <i class='fa-solid fa-star' style="margin-top: 0.9px; margin-l"></i>
                    </div>
					<p><strong>Opinion:</strong> ${review.opinion}</p>
					<p><strong>Created At:</strong> ${review.createdAt}</p>
			</div>
		<hr>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

function handleRequestError(error) {
    if (error.name === 'TokenExpiredError') {
        alert('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.');
        window.location.href = '/auth/login'; 
    } else {
        alert('Error:', error);
    }
}

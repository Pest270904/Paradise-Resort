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
    })
}
function cancel_reservation(reservationId){
    var xhr = new XMLHttpRequest();
    const url = `/reservation/cancel`;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Optionally handle successful response
                console.log("Reservation canceled successfully");
            } else {
                // Optionally handle error response
                console.error("Error canceling reservation");
            }
        }
    };
    const data = JSON.stringify({ res_id: reservationId });
    xhr.send(data);
    window.location.href = `/reservation`
}
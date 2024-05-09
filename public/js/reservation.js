function cancel_reservation(reservationId) {
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
  window.location.href = `/reservation`;
}

function success(reservationId) {
  var xhr = new XMLHttpRequest();
  const url = `/reservation/success`;
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Optionally handle successful response
        console.log('Reservation successfully');
      } else {
        // Optionally handle error response
        console.error('Error reservation');
      }
    }
  };
  const data = JSON.stringify({ res_id: reservationId });
  xhr.send(data);
  window.location.href = `/reservation`;
}

function payment(reservationId, cost) {
  var xhr = new XMLHttpRequest();
  const url = `/payment/checkout`;
  var redirected_url;
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var response = JSON.parse(xhr.responseText);
      //console.log(response)
      redirected_url = response.url;
      window.location.href = redirected_url;
    }
  };
  const data = JSON.stringify({
    res_id: reservationId,
    cost: cost,
  });
  xhr.send(data);
}

// Expand button for "rooms"
function roomExpand(btnID, tabContent, viewID) {
    if(document.getElementById(tabContent).style.display == 'block')
        {    
            document.getElementById(viewID).innerHTML = "VIEW ROOM DETAILS"
            document.getElementById(btnID).innerText="+"
            document.getElementById(tabContent).style.display = 'none'
        }
    else
        {    
            document.getElementById(viewID).innerHTML = "HIDE ROOM DETAILS"
            document.getElementById(btnID).innerText="-"
            document.getElementById(tabContent).style.display = 'block'
        }
}

// --------------------------------------------------------------------------------------------------------
// Button to redirect to booking
function room_booking(roomId) {
    var xhr = new XMLHttpRequest()
    const url = `room/${roomId}`
    xhr.open("GET", url, true)
    window.location.href = url
    xhr.send()
}
// --------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    // Get today's date
    var today = new Date();

    // Format today's date as YYYY-MM-DD
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // Set the input field's value to today's date
    document.getElementById("booking-date").value = today;
});

// --------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    var checkbox = document.getElementById("accept-checkbox");
    var button = document.getElementById("book-btn");

    // Reset button state and color when the page loads
    button.disabled = !checkbox.checked;
    updateButtonColor();

    checkbox.addEventListener("change", function() {
        button.disabled = !this.checked;
        updateButtonColor();
    });

    function updateButtonColor() {
        if (checkbox.checked) {
            // Change the button color when checkbox is checked
            button.style.backgroundColor = "#e0b973"; // Change this to the desired color
        } else {
            // Reset the button color when checkbox is unchecked
            button.style.backgroundColor = "gray"; // Reset to default color
        }
    }
});
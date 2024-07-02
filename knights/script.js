document.addEventListener('DOMContentLoaded', function() {
    // Handling the register button and terms checkbox on index.html
    const registerButton = document.getElementById('registerButton');
    const termsCheckbox = document.getElementById('termsCheckbox');

    if (registerButton && termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            // Enable the button only if the checkbox is checked
            registerButton.disabled = !termsCheckbox.checked;
        });

        registerButton.addEventListener('click', function() {
            if (termsCheckbox.checked) {
                // Redirect to the application form page
                window.location.href = 'apply.html';
            }
        });
    }

    // Handling the form submission on apply.html
    const submitButton = document.getElementById('submitButton');
    const formInputs = document.querySelectorAll('#applicationForm input, #applicationForm textarea');

    if (submitButton && formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Enable the submit button only if all fields are filled
                submitButton.disabled = !Array.from(formInputs).every(input => input.value.trim() !== '');
            });
        });

        submitButton.addEventListener('click', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const intentions = document.getElementById('intentions').value;
            const reason = document.getElementById('reason').value;

            if (name && age && intentions && reason) {
                // Prepare the form data to send to the server
                const formData = {
                    name: name,
                    age: age,
                    intentions: intentions,
                    reason: reason
                };

                // Send the form data to the server using fetch API
                fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message); // Display the response message
                    // Optionally, redirect to another page after successful submission
                    // window.location.href = 'success.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to submit application.');
                });
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
});

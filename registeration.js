
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const stepLabel = document.getElementById("stepLabel");
    const progressElement = document.getElementById("registrationProgress");

    const successToastElement = document.getElementById("successToast");
    const successToast =
        bootstrap.Toast.getOrCreateInstance(successToastElement);

    const dob = document.getElementById("dob");

    // Prevent selecting a future date of birth.
    dob.max = new Date().toLocaleDateString("en-CA");

    // Update progress based on completed fields.
    function updateProgress() {
        const fields = [
            document.getElementById("username"),
            document.getElementById("email"),
            password,
            confirmPassword,
            document.querySelector('input[name="gender"]:checked'),
            document.getElementById("country"),
            dob,
            document.getElementById("terms")
        ];

        const completed = fields.filter(function (field) {
            if (!field) return false;

            if (field.type === "checkbox") {
                return field.checked;
            }

            if (field.type === "radio") {
                return true;
            }

            return field.value.trim() !== "";
        }).length;

        const percentage = Math.round((completed / fields.length) * 100);

        progressBar.style.width = percentage + "%";
        progressText.textContent = percentage + "%";
        progressElement.setAttribute("aria-valuenow", percentage);

        let step;

        if (percentage < 34) {
            step = 1;
        } else if (percentage < 100) {
            step = 2;
        } else {
            step = 3;
        }

        stepLabel.textContent = "Step " + step + " of 3";
    }

    // Watch changes in the registration form.
    form.addEventListener("input", updateProgress);
    form.addEventListener("change", updateProgress);

    // Validate password matching while typing.
    function checkPasswords() {
        const passwordsMatch =
            password.value === confirmPassword.value;

        if (confirmPassword.value !== "" && !passwordsMatch) {
            passwordError.classList.remove("d-none");
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            passwordError.classList.add("d-none");
            confirmPassword.setCustomValidity("");
        }

        return passwordsMatch;
    }

    password.addEventListener("input", checkPasswords);
    confirmPassword.addEventListener("input", checkPasswords);

    // Handle form submission.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const passwordsMatch = checkPasswords();

        if (!passwordsMatch || !form.checkValidity()) {
            form.classList.add("was-validated");
            updateProgress();
            return;
        }

        // Demo only: no real account is created.
        successToast.show();

        form.reset();
        form.classList.remove("was-validated");
        passwordError.classList.add("d-none");
        confirmPassword.setCustomValidity("");

        updateProgress();
    });

    updateProgress();
});

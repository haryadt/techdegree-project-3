// Focus on the name field on load
const nameField = document.getElementById("name");
nameField.focus();

//Hide "other job role" when "other" is not selected in the job role dropdown list
const jobRoleDropdown = document.getElementById("title");
const otherJobRoleText = document.getElementById("other-job-role");
otherJobRoleText.style.display = "none";

jobRoleDropdown.addEventListener("change", (event) => {
    if(event.target.value === "other") {
        otherJobRoleText.style.display = "block";
    } else {
        otherJobRoleText.style.display = "none";
    }
});

// T-Shirt selection section
const colorSelect = document.getElementById("color");
colorSelect.setAttribute("disabled", "disabled");

const designSelect = document.getElementById("design");

designSelect.addEventListener("change", (event) => {
    colorSelect.removeAttribute("disabled");
    const selectedValue = event.target.value;
    const designSelected = document.querySelectorAll(`#color option[data-theme="${selectedValue}"]`);
    const designSelectOptions = document.querySelectorAll("#color option");

    // Hide all options
    for(let i =0; i < designSelectOptions.length; i++) {
        designSelectOptions[i].setAttribute("hidden", "");
    }

    // Show only selected options
    for(let i =0; i < designSelected.length; i++) {
        designSelected[i].removeAttribute("hidden");
    }
});

// Activities section
const activitiesFieldset = document.querySelector("fieldset#activities");
let totalCost = 0;
activitiesFieldset.addEventListener("change", (event) => {
    let activityCost = event.target.parentElement.querySelector(".activity-cost").innerText;
    if(event.target.checked) {
        totalCost += parseInt(activityCost.replace("$", ""));
    } else {
        totalCost -= parseInt(activityCost.replace("$", ""));
    }

    let totalCostElement = document.getElementById("activities-cost");
    totalCostElement.innerText = `Total: $${totalCost}`;
});

// Payment info section
const paymentMethodSelect = document.getElementById("payment");
paymentMethodSelect.selectedIndex = 1;
setPaymentOption(paymentMethodSelect)

paymentMethodSelect.addEventListener("change", (event) => {
    setPaymentOption(paymentMethodSelect);
});

function setPaymentOption(element) {
    const creditCardField = document.getElementById("credit-card");
    const paypalField = document.getElementById("paypal");
    const bitcoinFIeld = document.getElementById("bitcoin");
    if(element.value === "credit-card") {
        creditCardField.style.display = "block";
        paypalField.style.display = "none";
        bitcoinFIeld.style.display = "none";
    } else if(element.value === "paypal") {
        creditCardField.style.display = "none";
        paypalField.style.display = "block";
        bitcoinFIeld.style.display = "none";
    } else if(element.value === "bitcoin") {
        creditCardField.style.display = "none";
        paypalField.style.display = "none";
        bitcoinFIeld.style.display = "block";
    }
}

// Form validation
const formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => {

    function isValidActivities() {
        let isCheckedAtLeastOnce = false;
        const checkBoxes = document.querySelectorAll("#activities-box label input");
        for(let checkBox of checkBoxes) {
            if(checkBox.checked) {
                isCheckedAtLeastOnce = true;
                break;
            } else {
                isCheckedAtLeastOnce = false;
            }
        }
        return isCheckedAtLeastOnce;
    }

    function isValidName() {
        return document.getElementById("name").value !== "" ;
    }

    function isValidEmail() {
        const email = document.getElementById("email").value;
        if (email === "") {return false};
        const regex = /^[.a-z0-9]+[@][.a-z0-9]+[.][.a-z]+$/i
        return regex.test(email);
    }

    function isValidCreditCard() {
        const paymentMethodSelect = document.getElementById("payment");
        let result = {};
        if(paymentMethodSelect.value === "credit-card") {
            const ccInput = document.getElementById("cc-num");
            const zipInput = document.getElementById("zip");
            const cvvInput = document.getElementById("cvv");
            const regexCC = /^[0-9]{13,16}$/i;
            const regexZip = /^[0-9]{5}$/i;
            const regexCvv = /^[0-9]{3}$/i;
            result = {
                isValidCreditCard: {
                    isValid: regexCC.test(ccInput.value),
                    returnElement: ccInput
                },
                isValidZip: {
                    isValid: regexZip.test(zipInput.value),
                    returnElement: zipInput
                },
                isValidCvv: {
                    isValid: regexCvv.test(cvvInput.value),
                    returnElement: cvvInput
                },
            };
            return result
        } else {
            return result
        }
    }

    function displayValidationErrors() {
        const fieldSetActivities = document.getElementById("activities");
        const nameElement = document.getElementById("name");
        const emailElement = document.getElementById("email");

        const activitiesHint = document.getElementById("activities-hint");
        if(!isValidActivities()) {
            fieldSetActivities.classList.add("not-valid");
            fieldSetActivities.classList.remove("valid");
            activitiesHint.classList.remove("hint");
        } else {
            fieldSetActivities.classList.add("valid");
            fieldSetActivities.classList.remove("not-valid");
            activitiesHint.classList.add("hint");
        }
        
        const ccHint = document.getElementById("cc-hint");
        if(!isValidCreditCard().isValidCreditCard.isValid) {
            isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList.add("not-valid");
            isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList.remove("valid");
            ccHint.classList.remove("hint");
        } else {
            isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList.add("valid");
            isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList.remove("not-valid");
            ccHint.classList.add("hint");
        }

        const zipHint = document.getElementById("zip-hint");
        if(!isValidCreditCard().isValidZip.isValid) {
            isValidCreditCard().isValidZip.returnElement.parentElement.classList.add("not-valid");
            isValidCreditCard().isValidZip.returnElement.parentElement.classList.remove("valid");
            zipHint.classList.remove("hint");
        } else {
            isValidCreditCard().isValidZip.returnElement.parentElement.classList.add("valid");
            isValidCreditCard().isValidZip.returnElement.parentElement.classList.remove("not-valid");
            zipHint.classList.add("hint");
        }

        const cvvHint = document.getElementById("cvv-hint");
        if(!isValidCreditCard().isValidCvv.isValid) {
            isValidCreditCard().isValidCvv.returnElement.parentElement.classList.add("not-valid");
            isValidCreditCard().isValidCvv.returnElement.parentElement.classList.remove("valid");
            cvvHint.classList.remove("hint");
        } else {
            isValidCreditCard().isValidCvv.returnElement.parentElement.classList.add("valid");
            isValidCreditCard().isValidCvv.returnElement.parentElement.classList.remove("not-valid");
            cvvHint.classList.add("hint");
        }
        
        const nameHint = document.getElementById("name-hint");
        if(!isValidName()) {
            nameElement.parentElement.classList.add("not-valid");
            nameElement.parentElement.classList.remove("valid");
            nameHint.classList.remove("hint");
        } else {
            nameElement.parentElement.classList.add("valid");
            nameElement.parentElement.classList.remove("not-valid");
            nameHint.classList.add("hint");
        }

        const emailHint = document.getElementById("email-hint");
        if(!isValidEmail()) {
            emailElement.parentElement.classList.add("not-valid");
            emailElement.parentElement.classList.remove("valid");
            emailHint.classList.remove("hint");
        } else {
            emailElement.parentElement.classList.add("valid");
            emailElement.parentElement.classList.remove("not-valid");
            emailHint.classList.add("hint");
        }
    }

    // Final check if the form is valid
    if(isValidActivities() &&
        (
            isValidCreditCard().isValidCreditCard.isValid &&
            isValidCreditCard().isValidCvv.isValid && 
            isValidCreditCard().isValidZip.isValid
        )&&
        isValidEmail() &&
        isValidName()) {
        event.preventDefault();
        console.log("Valid form");
    } else {
        event.preventDefault();
        displayValidationErrors();
    }
});

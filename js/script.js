// Focus on the name field on load
const nameField = document.getElementById("name");
nameField.focus();

// Tab through checkboxes
const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("focus", (event) => {
        checkbox.classList.add("focus");
        checkbox.parentElement.classList.add("focus");
    });
    
    checkbox.addEventListener("blur", (event) => {
        checkbox.classList.remove("focus");
        checkbox.parentElement.classList.remove("focus");
    });
});


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

/**
 * Check different type of payments and display according to user's choice
 * @param {*} element The payment element 
 */
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

    /**
     * Check if activities checkboxes are valid
     * @returns True if activites checkboxes, else false
     */
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

    /**
     * Check if user's name is valid
     * @returns True if valid name, else false
     */
    function isValidName() {
        return document.getElementById("name").value !== "" ;
    }

    /**
     * Check if email is valid
     * @returns True if valid email, else false
     */
    function isValidEmail() {
        const email = document.getElementById("email").value;
        if (email === "") {return false};
        const regex = /^[.a-z0-9]+[@][.a-z0-9]+[.][.a-z]+$/i
        return regex.test(email);
    }

    /**
     * Check if credit card field is valid. This includes credit card number, ZIP, and CVV
     * @returns Returns an obect with the a boolean (if field is valid) and a return element (the element that it's checking for validation)
     */
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
            result = {
                isValidCreditCard: {
                    isValid: true,
                    returnElement: ""
                },
                isValidZip: {
                    isValid: true,
                    returnElement: ""
                },
                isValidCvv: {
                    isValid: true,
                    returnElement: ""
                },
            };
            return result
        }
    }

    /**
     * Based on the validation check, display validation errors
     */
    function displayValidationErrors() {
        const fieldSetActivities = document.getElementById("activities");
        const nameElement = document.getElementById("name");
        const emailElement = document.getElementById("email");

        function setValidClassList(classList, hintClasslist) {
            classList.add("not-valid");
            classList.remove("valid");
            hintClasslist.remove("hint")
        }

        function setInvalidClassList(classList, hintClasslist) {
            classList.add("valid");
            classList.remove("not-valid");
            hintClasslist.add("hint");
        }

        const activitiesHint = document.getElementById("activities-hint");
        if(!isValidActivities()) {
            setValidClassList(fieldSetActivities.classList, activitiesHint.classList);
        } else {
            setInvalidClassList(fieldSetActivities.classList, activitiesHint.classList);
        }
        
        const ccHint = document.getElementById("cc-hint");

        // Make sure that the return element is not empty before checking if it is valid
        if(isValidCreditCard().isValidCreditCard.returnElement) {
            // Check if credit card is valid
            if(!isValidCreditCard().isValidCreditCard.isValid) {
                setValidClassList(
                    isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList, 
                    ccHint.classList);
            } else {
                setInvalidClassList(
                    isValidCreditCard().isValidCreditCard.returnElement.parentElement.classList, 
                    ccHint.classList);
            }
            
            // Check if zip code is valid
            const zipHint = document.getElementById("zip-hint");
            if(!isValidCreditCard().isValidZip.isValid) {
                setValidClassList(
                    isValidCreditCard().isValidZip.returnElement.parentElement.classList, 
                    zipHint.classList);
            } else {
                setInvalidClassList(
                    isValidCreditCard().isValidZip.returnElement.parentElement.classList, 
                    zipHint.classList);
            }
            
            // Check if CVV is valid
            const cvvHint = document.getElementById("cvv-hint");
            if(!isValidCreditCard().isValidCvv.isValid) {
                setValidClassList(
                    isValidCreditCard().isValidCvv.returnElement.parentElement.classList, 
                    cvvHint.classList);
            } else {
                setInvalidClassList(
                    isValidCreditCard().isValidCvv.returnElement.parentElement.classList, 
                    cvvHint.classList);
            }
        }
        
        // Check if name is not empty
        const nameHint = document.getElementById("name-hint");
        if(!isValidName()) {
            setValidClassList(
                nameElement.parentElement.classList, 
                nameHint.classList);
        } else {
            setInvalidClassList(
                nameElement.parentElement.classList, 
                nameHint.classList);
        }

        // Check if email is properly formatted
        const emailHint = document.getElementById("email-hint");
        if(!isValidEmail()) {
            setValidClassList(
                emailElement.parentElement.classList, 
                emailHint.classList);
        } else {
            setInvalidClassList(
                emailElement.parentElement.classList, 
                emailHint.classList);
        }
    }
    
    // Final check if the form is valid
    if(isValidActivities() &&
        (
            isValidCreditCard().isValidCreditCard.isValid &&
            isValidCreditCard().isValidCvv.isValid && 
            isValidCreditCard().isValidZip.isValid
        ) &&
        isValidEmail() &&
        isValidName()) {
    } else {
        event.preventDefault();
        displayValidationErrors();
    }
});

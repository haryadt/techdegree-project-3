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
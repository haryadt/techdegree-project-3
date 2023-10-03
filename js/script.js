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
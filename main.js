document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    
    document.getElementById("errorMessages").innerHTML = "";
    document.getElementById("successMessage").style.display = "none";

    
    const formData = new FormData(this);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    };

    
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      document.getElementById("errorMessages").textContent =
        "All fields are required!";
      return;
    }

    
    simulateServerRequest(userData);
  });


function simulateServerRequest(userData) {
  
  setTimeout(() => {
    const successResponse = {
      status: 201,
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    };
    const errorResponse = {
      status: 400,
      errors: ["Invalid email address", "Password too short"],
    };

   
    const response = Math.random() > 0.5 ? successResponse : errorResponse;

    handleResponse(response);
  }, 1000); 
}

function handleResponse(response) {
  if (response.status === 201) {
    
    document.getElementById("registrationForm").reset();
    document.getElementById(
      "successMessage"
    ).textContent = `Registration successful! Welcome, ${response.data.firstName} ${response.data.lastName}.`;
    document.getElementById("successMessage").style.display = "block";
  } else if (response.status === 400 && response.errors) {
    
    document.getElementById("errorMessages").innerHTML =
      response.errors.join("<br>");
  }
}

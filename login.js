const loginForm = document.querySelector("#login-form");
const emailOrAcctNumberField = document.querySelector("#email");
const passwordField = document.querySelector("#password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    emailOrAccountNumber: emailOrAcctNumberField.value,
    password: passwordField.value
  };

  // check if the email or account number exists in local storage;
  isUserPresent(user)
    .then((record) => {
      localStorage.setItem("loggedInUser", JSON.stringify(record));
      window.location.href = "http://127.0.0.1:5500/dashboard.html";
    })
    .catch((err) => {
      alert(err.message);
    });
});

const isUserPresent = (user) => {
  return new Promise((resolve) => {
    // get users in local storage
    const users = JSON.parse(localStorage.getItem("users"));

    if (!users) {
      throw new Error("No record found");
    }

    if (Array.isArray(users) && users.length === 0) {
      throw new Error("No record found");
    }

    const record = users.find((item) => {
      return (
        item.email === user.emailOrAccountNumber ||
        item.accountNumber === +user.emailOrAccountNumber
      );
    });

    if (record === undefined) {
      throw new Error("No record found");
    }

    if (record.password !== user.password) {
      throw new Error("No record found");
    }

    // at this, everything was successful. i.e the user exist
    resolve(record);
  });
};

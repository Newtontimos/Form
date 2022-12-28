const form = document.querySelector("#form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#firstname");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  };

  // save to local storage
  saveToLocalStorage(user)
    .then((updatedUser) => {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      window.location.href = "http://127.0.0.1:5500/dashboard.html";
    })
    .catch((err) => {
      alert(err.message);
    });
});

const saveToLocalStorage = (newUser) => {
  return new Promise((resolve) => {
    // retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users"));

    if (Array.isArray(users) && users.length > 0) {
      const isEmailUsed = !!users.find((user) => user.email === newUser.email);
      if (isEmailUsed) {
        throw new Error("this email address has alredy been used");
      }

      const accountNumber = createAccountNumber();
      // check if account account number has bnot been used
      newUser = { ...newUser, accountNumber, accountBalance: 50000 };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      resolve(newUser);
    } else {
      const accountNumber = createAccountNumber();
      localStorage.setItem(
        "users",
        JSON.stringify([{ ...newUser, accountNumber, accountBalance: 50000 }])
      );
      resolve({ ...newUser, accountNumber, accountBalance: 50000 });
    }
  });
};

const createAccountNumber = () => {
  const acctNumber = Math.floor(Math.random() * 10000000000);
  return acctNumber;
};

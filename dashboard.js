//
const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "http://127.0.0.1:5500/login.html";
});

const accountNumberDiv = document.querySelector("#account-number");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const { accountNumber } = loggedInUser;
  accountNumberDiv.textContent = `Your account number is ${accountNumber}`;
}

const users = JSON.parse(localStorage.getItem("users"));
const selectDropdown = document.querySelector("#select-dropdown");

users.forEach((user) => {
  const option = document.createElement("option");
  option.textContent = user.email;
  option.setAttribute("value", user.email);
  selectDropdown.appendChild(option);
});

let transferRecipient = null;

selectDropdown.addEventListener("change", (e) => {
  const value = e.target.value;

  transferRecipient = users.find((user) => user.email == value);
});

const amountInput = document.querySelector("#amount");
const sendBtn = document.querySelector("#send-cash-btn");

const transferCash = () => {
  if (!(amountInput.value && transferRecipient)) {
    alert("please select a recipient and enter the amount to transfer");
  } else if (amountInput.value == 0) {
    alert("You can not transfer 0 Naira");
  } else {
    const loggedInUserBalance = loggedInUser.accountBalance;
    const amountToTransfer = Number(amountInput.value);

    console.log("logged in user balance", loggedInUserBalance);
    console.log("amountToTransfer", amountToTransfer);

    if (amountToTransfer > loggedInUserBalance) {
      alert("sorry, you have insufficient fund");
    } else {
      transferRecipient.accountBalance =
        transferRecipient.accountBalance + amountToTransfer;

      const sender = users.find((user) => user.email === loggedInUser.email);
      sender.accountBalance = sender.accountBalance - amountToTransfer;

      console.log(users);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(sender));

      //location.reload();
    }
  }
};
sendBtn.addEventListener("click", transferCash);

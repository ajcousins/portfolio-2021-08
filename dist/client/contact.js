const emailButton = document.querySelector("#email-add");

const input = document.querySelector("#email-add-val");

const emailAddress = "alvin.cousins.tech@gmail.com";

emailButton.addEventListener("click", () => {
  navigator.clipboard.writeText(emailAddress).then(
    function () {
      emailButton.textContent = "Email copied";
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
});

emailButton.addEventListener("mouseover", () => {
  emailButton.textContent = "Copy to clipboard";
});

emailButton.addEventListener("mouseout", () => {
  emailButton.textContent = emailAddress;
});

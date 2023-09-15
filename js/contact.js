const accessKey = "fec33433-96d4-4896-9afb-9a1ecb49a464";
const hInput = document.querySelector('input[name="access_key"]');

const form = document.querySelector("#contactForm");

const nameInput = form.querySelector('input[name="nume"]');
const btn = document.querySelector("#contactBtn");

const checkbox = document.querySelector('input[name="privacy"]');

const email = document.querySelector('input[name="email"]');
const phone = document.querySelector('input[name="phone"]');
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^(?:(?:\+|00)40|0)[1-9][0-9]{8}$/;
form.addEventListener("input", function (event) {
    if (
        nameInput.value.length > 0 &&
        checkbox.checked === true &&
        emailRegex.test(email.value) &&
        phone.value.length >= 10 &&
        phone.value.length <= 13
    ) {
        hInput.value = accessKey;
        btn.disabled = false;
    } else {
        hInput.value = "";
        btn.disabled = true;
    }
});

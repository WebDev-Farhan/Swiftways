const seats = document.querySelectorAll(".seatButton");
const selected = [];
for (const seat of seats) {
  seat.addEventListener("click", function () {
    if (!selected.includes(this) && selected.length <= 3) {
      selected.push(this);

      seat.classList.add(
        "bg-primaryColor",
        "text-white",
        "hover:bg-primaryColor"
      );

      updateSeatNumberAndPrice(1, 550);

      addSeatDetails(this.textContent);

      removeBlankText();

      if (selected.length > 0) {
        document.getElementById("final-submit-btn").removeAttribute("disabled");
      } else if (selected.length < 1) {
        document
          .getElementById("final-submit-btn")
          .setAttribute("disabled", true);
      }

      if (selected.length === 4) {
        document.getElementById("apply-coupon").removeAttribute("disabled");
      } else if (selected.length < 4) {
        document.getElementById("apply-coupon").setAttribute("disabled", true);
      }
    } else if (selected.includes(this)) {
      // Code for deselecting a seat
      const indexToRemove = selected.indexOf(this);
      selected.splice(indexToRemove, 1);
      // Remove classes to visually deselect
      seat.classList.remove(
        "bg-primaryColor",
        "text-white",
        "hover:bg-primaryColor"
      );

      updateSeatNumberAndPrice(-1, -550);

      removeSelectedSeatDetails(indexToRemove);

      if (selected.length === 0) {
        showBlankText();
      }
      if (selected.length > 0) {
        document.getElementById("final-submit-btn").removeAttribute("disabled");
      } else if (selected.length < 1) {
        document
          .getElementById("final-submit-btn")
          .setAttribute("disabled", true);
      }

      if (selected.length === 4) {
        document.getElementById("apply-coupon").removeAttribute("disabled");
      } else if (selected.length < 4) {
        document.getElementById("apply-coupon").setAttribute("disabled", true);
      }
    }
  });
}

function updateSeatNumberAndPrice(seatChange, priceChange) {
  let availableSeats = parseInt(
    document.getElementById("available-seats").innerText
  );
  const remainingSeats = availableSeats - seatChange;
  document.getElementById("available-seats").innerText = remainingSeats;

  let selectedSeatNumber = parseInt(
    document.getElementById("selected-seat-number").innerText
  );
  const totalSelectedSeatNumber = selectedSeatNumber + seatChange;
  document.getElementById("selected-seat-number").innerText =
    totalSelectedSeatNumber;

  let price = parseInt(document.getElementById("total-price").innerText);
  const totalPrice = price + priceChange;
  document.getElementById("total-price").innerText = totalPrice;

  let grandPrice = parseInt(
    document.getElementById("grand-total-price").innerText
  );
  const grandtotalPrice = price + priceChange;
  document.getElementById("grand-total-price").innerText = totalPrice;
}

function addSeatDetails(seatNumber) {
  const newContent = document.createElement("div");
  newContent.innerHTML = `
        <div class="text-[#03071299] flex items-center justify-between mb-4">
            <h1>${seatNumber}</h1>
            <h1>Economy</h1>
            <h1>550</h1>
        </div>
    `;
  document.getElementById("price-area").appendChild(newContent);
}

function removeSelectedSeatDetails(index) {
  const priceAreaDiv = document.getElementById("price-area");
  const contentToRemove = priceAreaDiv.children[index + 1];
  priceAreaDiv.removeChild(contentToRemove);
}

function removeBlankText() {
  const blank = document.getElementById("blank-text");
  blank.classList.add("hidden");
}

function showBlankText() {
  const blank = document.getElementById("blank-text");
  blank.classList.remove("hidden");
}
function applyCoupon() {
  const couponInput = document.getElementById("coupon-input").value.trim();
  let totalPrice = parseInt(
    document.getElementById("grand-total-price").innerText
  );
  if (selected.length === 4) {
    if (couponInput === "NEW15") {
      const discount = totalPrice * (15 / 100);
      totalPrice -= discount;
      document.getElementById("grand-total-price").innerText = totalPrice;
    } else if (couponInput === "Couple 20") {
      const discount = totalPrice * (20 / 100);
      totalPrice -= discount;
      document.getElementById("grand-total-price").innerText = totalPrice;
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  } else {
    document.getElementById("grand-total-price").innerText =
      document.getElementById("total-price").innerText;
  }
}
document
  .getElementById("final-submit-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const phone = document.getElementById("phone").value;
    const phoneNumberCheck = /^(?:\+?88)?01(?:[356789]|6)[0-9]{8}$/;
    const email = document.getElementById("email").value;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const name = document.getElementById("name").value;
    const modal = document.getElementById("modal");

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phoneNumberCheck.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (email !== "" && !emailCheck.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    modal.classList.add("flex");
    modal.classList.remove("hidden");
    const ticket = document.getElementById("tickets");
    ticket.classList.add("hidden");
    ticket.classList.remove("flex");
    const targetSection = document.getElementById("modal");
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

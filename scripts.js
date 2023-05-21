document.getElementById("interestType").addEventListener("change", function () {
  var selectedOption = this.value;
  var interestFields = document.getElementById("interestFields");

  if (selectedOption === "percent") {
    interestFields.style.display = "none";
    document.getElementById("rate").style.display = "block";
  } else {
    interestFields.style.display = "block";
    document.getElementById("rate").style.display = "none";
  }
});

document.getElementById("calculate").addEventListener("click", function () {
  var principal = parseFloat(document.getElementById("principal").value);
  var interestType = document.getElementById("interestType").value;
  var rate, dailyRate, monthlyRate, yearlyRate;

  if (interestType === "percent") {
    rate = parseFloat(document.getElementById("rate").value);
  } else if (interestType === "daily") {
    dailyRate = parseFloat(document.getElementById("dailyRate").value);
    rate = dailyRate * 365;
  } else if (interestType === "monthly") {
    monthlyRate = parseFloat(document.getElementById("monthlyRate").value);
    rate = monthlyRate * 12;
  } else if (interestType === "yearly") {
    yearlyRate = parseFloat(document.getElementById("yearlyRate").value);
    rate = yearlyRate;
  }

  var period = parseInt(document.getElementById("period").value);
  var compounding = document.getElementById("compounding").value;

  var result = calculateCompoundedInterest(
    principal,
    rate,
    period,
    compounding
  );

  document.getElementById("result").textContent =
    "Final Amount: " + result.toFixed(2);
});

function calculateCompoundedInterest(principal, rate, period, compounding) {
  var n;
  if (compounding === "daily") {
    n = 365;
  } else if (compounding === "monthly") {
    n = 12;
  } else if (compounding === "quarterly") {
    n = 4;
  } else if (compounding === "semiannually") {
    n = 2;
  } else if (compounding === "annually") {
    n = 1;
  } else {
    throw new Error("Invalid compounding frequency");
  }

  var interestRate = rate / 100;
  var amount = principal * Math.pow(1 + interestRate / n, n * period);
  return amount;
}

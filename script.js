const DAYS_IN_A_YEAR = 365;

let Ramp = {
  amount : 1000,
  claim_interval : 30,
  holding_days : 365,
  lp_apr : 40,
  ramp_apr : 40,
  fees : 2,
};

let compound_interest = (amount, rate, days) =>  (amount * (1 + rate / DAYS_IN_A_YEAR) ** days ) - amount;

/************** */
let setClaimInterval = (value) => {
  const claim_interval = document.querySelector('#claim_interval');
  claim_interval.textContent = value;
  Ramp.calculate();
}


let setClaimIntervalFromSlider = (value) => {
  const claim_interval_textbox = document.querySelector('#claim_interval_textbox');
  Ramp.claim_interval = claim_interval_textbox.value  = parseInt(value);
  setClaimInterval(value);
}

let setClaimIntervalFromText = (value) => {
  const claim_interval_slider = document.querySelector('#claim_interval_slider');
  Ramp.claim_interval = claim_interval_slider.value  = parseInt(value);
  setClaimInterval(value);
}

//**************** */
let setAmount = (value) => {
  const amount = document.querySelector('#amount');
  amount.textContent = value;
  Ramp.calculate();
}

let setAmountFromSlider = (value) => {
  const amount_textbox = document.querySelector('#amount_textbox');
  Ramp.amount = amount_textbox.value = parseInt(value);
  setAmount(value);
}

let setAmountFromText = (value) => {
  const amount_slider = document.querySelector('#amount_slider');
  Ramp.amount = amount_slider.value = parseInt(value);
  setAmount(value);
}

//************* */
let setHoldingDays = (value) => {
  const holding_days = document.querySelector('#holding_days');
  holding_days.textContent = Ramp.holding_days = parseInt(value);
  Ramp.calculate();
}

//************* */
let setLpApr = (value) => {
  const lp_apr = document.querySelector('#lp_apr');
  lp_apr.textContent = Ramp.lp_apr = parseInt(value);
  Ramp.calculate();
}

//************* */
let setRampApr = (value) => {
  const ramp_apr = document.querySelector('#ramp_apr');
  ramp_apr.textContent = Ramp.ramp_apr = parseInt(value);
  Ramp.calculate();
}

//************* */
let setFee = (value) => {
  const fee = document.querySelector('#fee');
  fee.textContent = Ramp.fees = parseFloat(value);
  Ramp.calculate();
}

//******************** */
Ramp.calculate = () => {
  const display_profit = document.querySelector('#profit');

  // daily interest:
  let lp_daily_interest = Ramp.amount * Ramp.lp_apr / 100 / DAYS_IN_A_YEAR;
  let lp_claimable_interest = Ramp.claim_interval * lp_daily_interest - Ramp.fees;
  console.log('lp_claimable_interest: ', lp_claimable_interest);

  let range = Ramp.holding_days;
  let profit = 0;

  while (range > Ramp.claim_interval) {
    range = range - Ramp.claim_interval;
    profit += compound_interest(lp_claimable_interest, Ramp.ramp_apr / 100, range);
  }
  display_profit.textContent = profit;
  console.log('profit: ', profit);

};

// Set defaults after page reload
document.addEventListener("DOMContentLoaded", function(){
  const holding_days = document.querySelector('#holding_days_textbox');
  const holding_days_display = document.querySelector('#holding_days');
  holding_days_display.textContent =  Ramp.holding_days = parseInt(holding_days.value);

  const claim_interval = document.querySelector('#claim_interval_textbox');
  const claim_interval_display = document.querySelector('#claim_interval');
  Ramp.claim_interval = claim_interval_display.textContent = parseInt(claim_interval.value);

  const amount = document.querySelector('#amount_textbox');
  const amount_display = document.querySelector('#amount');
  Ramp.amount = amount_display.textContent = parseInt(amount.value);

  const fee = document.querySelector('#fee_textbox');
  const fee_display = document.querySelector('#fee');
  Ramp.fees = fee_display.textContent = parseFloat(fee.value);

  const lp_apr = document.querySelector('#lp_apr_textbox');
  const lp_apr_display = document.querySelector('#lp_apr');
  Ramp.lp_apr = lp_apr_display.textContent = parseInt(lp_apr.value);

  const ramp_apr = document.querySelector('#ramp_apr_textbox');
  const ramp_apr_display = document.querySelector('#ramp_apr');
  Ramp.ramp_apr = ramp_apr_display.textContent = parseInt(ramp_apr.value);
  
  Ramp.calculate();
});


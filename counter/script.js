const displayCounter = document.getElementById("show-counter");
const controlBtn = document.getElementsByClassName("control-btn")[0];
const inputValue = document.getElementById("input-value");
const resetBtn = document.getElementById("reset-btn");

const handleBtnClick = (event) => {
  if (event.target.type === "button") {
    if (event.target.id === "increment-btn") {
      const result = Number(
        (Number(displayCounter.innerText) + Number(inputValue.value)).toFixed(2)
      );
      displayCounter.innerText = result;
    } else if (event.target.id === "decrement-btn") {
      const result = Number(
        (Number(displayCounter.innerText) - Number(inputValue.value)).toFixed(2)
      );
      displayCounter.innerText = result;
    }
  }
};

controlBtn.addEventListener("click", handleBtnClick);
resetBtn.addEventListener("click", () => {
  inputValue.value = 10;
  displayCounter.innerText = 0;
});

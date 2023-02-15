export default function ratingsColor() {
  const els = document.querySelectorAll(".rating_average");
  els.forEach((el) => {
    if (+el.textContent >= 8) {
      el.classList.add("very_good");
    } else if (+el.textContent >= 7 && +el.textContent < 8) {
      el.classList.add("good");
    } else if (+el.textContent >= 6 && +el.textContent < 7) {
      el.classList.add("medium");
    } else {
      el.classList.add("bad");
    }
  });
}

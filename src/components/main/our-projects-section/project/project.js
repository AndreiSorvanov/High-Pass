import { clamp } from "./scripts/clamp.js";

function truncateText(textElement) {
  const text = textElement.textContent;
  textElement.textContent = "";
  textElement.style.setProperty("flex-grow", 1);
  textElement.style.setProperty("max-height", "none");

  const maxHeight = textElement.getBoundingClientRect().height;

  textElement.textContent = text;
  textElement.removeAttribute("style");

  const lineHeight = parseFloat(getComputedStyle(textElement).lineHeight);
  const linesCount = Math.floor(maxHeight / lineHeight);

  const height = linesCount * lineHeight;
  textElement.style.setProperty("max-height", `${height}px`);

  clamp(textElement, { clamp: `${height}px` });
}

const descriptions = document.querySelectorAll(".project__description");
descriptions.forEach((element) => truncateText(element));

window.addEventListener("resize", (event) => {
  descriptions.forEach((element) => {
    element.removeAttribute("style");
    truncateText(element);
  });
});

const
range = document.getElementById('markup'),
rangeV = document.getElementById('rangeV'),
setValue = ()=>{
const
newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
newPosition = 10 - (newValue * 0.2);
rangeV.innerHTML = `<span>${range.value}x</span>`;
rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

const btn = document.querySelector('.btn');
const svg1 = document.querySelector('.btn-svg1');
const svg2 = document.querySelector('.btn-svg2');

btn.addEventListener('click', function(e){
  svg1.classList.toggle('visible');
  svg2.classList.toggle('visible');
})


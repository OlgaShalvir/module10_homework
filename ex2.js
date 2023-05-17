const button = document.querySelector('.screen-size');

button.addEventListener('click', function(e){
  alert('Height:'+' '+ window.screen.height+' '+'Width:'+' '+ window.screen.width);
})

document.querySelectorAll('.destination').forEach(function(destination) {
  destination.addEventListener('mouseenter', function(event) {
    var price = event.currentTarget.querySelector('.price');
    price.style.display = 'block';
    updatePricePosition(event, price);
  });

  destination.addEventListener('mousemove', function(event) {
    var price = event.currentTarget.querySelector('.price');
    updatePricePosition(event, price);
  });

  destination.addEventListener('mouseleave', function(event) {
    var price = event.currentTarget.querySelector('.price');
    price.style.display = 'none';
  });
});

function updatePricePosition(event, price) {
  price.style.left = (event.pageX) + 'px';
  price.style.top = (event.pageY - 500) + 'px';
}

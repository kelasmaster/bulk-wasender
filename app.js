function sendMessages() {
  const numbers = document.getElementById('numbers').value.split('\n').filter(num => num.trim());
  const message = encodeURIComponent(document.getElementById('message').value);

  if (!numbers.length || !message) {
    alert('Please enter valid numbers and a message.');
    return;
  }

  numbers.forEach(number => {
    const whatsappLink = `https://wa.me/${number}?text=${message}`;
    window.open(whatsappLink, '_blank');
  });
}

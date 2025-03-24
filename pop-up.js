function sendMessages() {
  // Get the input values
  const rawNumbers = document.getElementById('numbers').value.trim();
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  // Validate inputs
  if (!rawNumbers || !message) {
    alert('Please enter valid numbers and a message.');
    return;
  }

  // Split numbers into an array, trim whitespace, and filter out empty lines
  const numbers = rawNumbers.split('\n')
    .map(num => num.trim()) // Remove leading/trailing spaces
    .filter(num => num); // Remove empty lines

  if (numbers.length === 0) {
    alert('No valid numbers found.');
    return;
  }

  // Function to open WhatsApp links one by one with a delay
  let index = 0;
  function openNextLink() {
    if (index < numbers.length) {
      const number = numbers[index];
      const whatsappLink = `https://wa.me/${number}?text=${message}`;
      window.open(whatsappLink, '_blank');
      index++;
      setTimeout(openNextLink, 500); // Delay of 500ms between each link
    }
  }

  // Start opening links
  openNextLink();
}

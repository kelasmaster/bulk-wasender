function sendMessages() {
  // Get the input values
  const rawNumbers = document.getElementById('numbers').value.trim();
  const message = encodeURIComponent(document.getElementById('message').value.trim());

  // Validate inputs
  if (!rawNumbers || !message) {
    alert('Please enter valid numbers and a message.');
    return;
  }

  // Process numbers: Convert to international format (+62)
  const numbers = rawNumbers.split('\n')
    .map(num => num.trim()) // Remove leading/trailing spaces
    .filter(num => num) // Remove empty lines
    .map(num => {
      if (num.startsWith('0')) {
        return '+62' + num.slice(1); // Convert 0857... to +62857...
      }
      return num.startsWith('+') ? num : '+' + num; // Ensure all numbers start with +
    });

  if (numbers.length === 0) {
    alert('No valid numbers found.');
    return;
  }

  // Display status
  const statusDiv = document.getElementById('status');
  statusDiv.innerHTML = `Sending messages to ${numbers.length} numbers...`;

  // Function to send messages sequentially
  let index = 0;
  function sendNextMessage() {
    if (index < numbers.length) {
      const number = numbers[index];
      const whatsappLink = `https://wa.me/${number}?text=${message}`;
      statusDiv.innerHTML = `Sending to ${number}... (${index + 1}/${numbers.length})`;
      
      // Redirect to WhatsApp link
      window.location.href = whatsappLink;

      // Wait for the user to return to the page before sending the next message
      setTimeout(() => {
        index++;
        sendNextMessage();
      }, 5000); // Delay of 5 seconds to allow the user to send the message manually
    } else {
      statusDiv.innerHTML = 'All messages sent!';
    }
  }

  // Start sending messages
  sendNextMessage();
}

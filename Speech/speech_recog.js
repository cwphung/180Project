// Create a new instance of SpeechRecognition
recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Define the recognition result event handler
recognition.onresult = function(event) {
    // Get the first result from the event
    result = event.results[0];

    // Get the recognized text from the result
    text = result[0].transcript;

    // Display the recognized text in the result element
    document.getElementById('result').textContent = text;
};

// Define the recognition error event handler
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

// Function to start speech recognition
function startRecognition() {
    // Start speech recognition
    recognition.start();

    //doesnt work currently
    setTimeout(function() {
        recognition.stop();
      }, 5000);
}
  
  // Add event listener to the button
  document.getElementById('startBtn').addEventListener('click', startRecognition);
//TODO:
//Cut off speech after x seconds, and still report results
//Re-add error handling wrapper if Speech Recognition is not available

function response_parser(word_list, keywords) {
    const count = [];
    for (let i=0; i<word_list.length; i++) {
        for (let j=0; j<keywords.length; j++) {
            count[j] = 0;
            for (let k=0; k<keywords[j].length; k++) {
                if (word_list[i].includes(keywords[j][k]))
                    count[j]++;
            }
        }
    }

    let temp_max = 0;
    let temp_max_i = 0;
    for (let i = 0; i<count.length; i++) {
        if (count[i] > temp_max) {
            temp_max = count[i];
            temp_max_i = i;
        }
    }

    if (temp_max == 0)
        return "No keyword detected";

    return keywords[temp_max_i][0];
};

var speech_running = false;

// Create a new instance of SpeechRecognition
recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onend = () => {
    if (speech_running)
        recognition.start();
};

recognition.onnomatch = function(event) {
    console.log('No speech was recognized.');
  };

// Define the recognition result event handler
recognition.onresult = function(event) {
    // Get the first result from the event
    result = event.results[0];

    // Get the recognized text from the result
    text = result[0].transcript;
    word_list = text.split(" ")

    const keywords = [["right", "riot", "write"], ["left"], ["up", "pop"], ["down"], ["enter"], ["back"], ["select"]];

    input_move = response_parser(word_list, keywords);

    // Display the recognized text in the result element
    console.log("Printing result")
    document.getElementById('result').textContent = input_move;
};

// Define the recognition error event handler
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    if (event.error == "no-speech") {
        // Display error
        document.getElementById('result').textContent = "No speech detected.";
    }
    // restart_speech();
};

// Function to start speech recognition
function toggleRecognition() {
    if (!speech_running) {
        document.getElementById('result').textContent = "Turning on speech recognition.";
        // Start speech recognition
        recognition.start();
        speech_running = true;
    } else {
        // Stop speech recognition
        recognition.stop();
        speech_running = false;
        document.getElementById('result').textContent = "Turning off speech recognition.";
    }

    //stop recognition after 2 seconds
    //currently doesn't print anything if no speech is detected, might want to include that
    //without this, continuous speech drastically slows it down
    // setTimeout(function() {
    //     recognition.stop();
    //     restart_speech();
    //   }, 2000);
}
  
  // Add event listener to the button
  document.getElementById('startBtn').addEventListener('click', toggleRecognition);
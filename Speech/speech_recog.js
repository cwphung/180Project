//TODO:
//Grant microphone permission permanently after one press: happens on laptop, but not desktop browser
//Cut off speech after x seconds, and still report results
//Convert the input parsing from Python to JS - DONE
//Re-add error handling wrapper if Speech Recognition is not available
//If no result, need to handle it

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

// Create a new instance of SpeechRecognition
recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//recognition.continuous = true;
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

    const keywords = [["right", "riot", "write"], ["left"], ["up", "pop"], ["down"], ["enter"], ["back"]];

    input_move = response_parser(word_list, keywords);

    // Display the recognized text in the result element
    document.getElementById('result').textContent = input_move;
};

function nomatch() {
    console.log("no match detected")
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
    // setTimeout(function() {
    //     recognition.stop();
    //   }, 2000);
}
  
  // Add event listener to the button
  document.getElementById('startBtn').addEventListener('click', startRecognition);
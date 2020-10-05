// @ts-check

function init() {
    var websocket = new WebSocket("ws://127.0.0.1:8080");
  
    websocket.onopen = function() {
      document.getElementById("output").innerHTML += "<p>> CONNECTED</p>";
    };
  
    websocket.onmessage = function(evt) {
      document.getElementById("output").innerHTML +=
        "<p style='color: blue;'>> RESPONSE: " + evt.data + "</p>";
    };
  
    /**
     * 
     * @param {any} evt 
     */
    websocket.onerror = function(evt) {
      document.getElementById("output").innerHTML +=
        "<p style='color: red;'>> ERROR: " + evt.data + "</p>";
    };
  
    /**
     * @type {HTMLInputElement}
     */
    var inputField = document.getElementById("input");
  
    inputField.addEventListener("keypress", /** @param {KeyboardEvent} event */(event) => {
      if (inputField.value) {
        if (event.keyCode == 13) {
          sendMessage(inputField.value);
          inputField.value = null;
        }
      }
    });
    function sendMessage(message) {
      document.getElementById("output").innerHTML +=
        "<p>> SENT: " + message + "</p>";
  
      websocket.send(message);
    }

    var button = document.getElementById('button');

    button.addEventListener('click', () => {
        fetch('http://localhost:8081/').then(r => r.text()).then((t) => console.log(t));
    });
  }
  
  init();
  
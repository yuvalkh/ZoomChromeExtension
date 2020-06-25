
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('sendButton');
    link.addEventListener('click', function() {
        sendToBackground();
    });
});

function sendToBackground(){
    //TODO: need to check if the parameters are legal
    let speed = parseFloat(document.getElementById("speed").value)
    let jump = parseFloat(document.getElementById("jump").value)
    window.alert("after parsing: speed is " + speed + " and jump is " + jump)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {speed: speed, jump: jump}, ()=> {})
    });
  }
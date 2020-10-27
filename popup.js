
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('sendButton');
    link.addEventListener('click', function() {
        sendToBackground();
    });
});

window.addEventListener("load", (event) => {
    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url; // we get the current tab and if it's zoom we let the user see the update interface

        if(url.includes("zoom.us/rec")) {
        //NEED TO SEE HOW TO GET STORAGE SPEED FROM THERE AND INITIALIZE IT    
        chrome.storage.sync.get(['speed', 'jump'], function(items) {
                document.getElementById("speed").value = items.speed
                document.getElementById("jump").value = items.jump
              });    
            
            document.getElementById("on_site").style.display = "block"
            document.getElementById("not_on_site").style.display = "none"
            getBackgroundJumpAndSpeed()
        } else {
            document.getElementById("on_site").style.display = "none"
            document.getElementById("not_on_site").style.display = "block"
        }
    });
    
  });

function sendToBackground(){
    //TODO: need to check if the parameters are legal
    let speed = parseFloat(document.getElementById("speed").value)
    let jump = parseFloat(document.getElementById("jump").value)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {speed: speed, jump: jump})
    });
  }
  function getBackgroundJumpAndSpeed() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {info: "give info"}, (response)=> {
            document.getElementById("jump").value = response.jump
            document.getElementById("speed").value = response.speed
        })
    });
  }
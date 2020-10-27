console.debug();

let time_to_jump = 5;
let current_speed = 1;

let video = document.getElementsByTagName("video")[0]; // first we get the video from the DOM
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.jump == null){//which means we need to send the parameters
    sendResponse({speed: current_speed, jump: time_to_jump})
  }
  else{//we got parameters
    time_to_jump = request.jump
    current_speed = request.speed
    video.playbackRate = request.speed
  }  
});

document.onkeydown = function (e) {
  //if it's not 1 of these options we just ignore it
  if (
    document.activeElement.tagName !== "VIDEO" || // check if our focus is on the video tag(we assume there is only 1 video)
    (e.key !== "ArrowRight" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowUp" && 
      e.keyCode !== 32)// do here keycode because spacebar doesn't have a valid key
  ) {
    console.log(document.activeElement)
    return;
  }
  e.preventDefault();

  if (e.key === "ArrowRight") {
    video.currentTime += time_to_jump;
    
  } else if (e.key === "ArrowLeft") {
    video.currentTime -= time_to_jump;
  } else if (e.key === "ArrowUp") {
    if(e.shiftKey) { // this is how you recognize shift key press
      current_speed = Math.min(16,(current_speed + 0.1).toFixed(2))
      video.playbackRate = current_speed
    }
    else{
      video.volume = Math.min((video.volume + 0.1).toFixed(2), 1);
    }
  } else if (e.key === "ArrowDown") {
    if(e.shiftKey) { // this is how you recognize shift key press
      current_speed = Math.max(0.1,(current_speed - 0.1).toFixed(2))
      video.playbackRate = current_speed
    }
    else{
      video.volume = Math.max((video.volume - 0.1).toFixed(2), 0);
    }
  } else if (e.keyCode === 32) {
    if (video.paused) {
      video.play(); 
    }
    else { 
      video.pause(); 
    } 
  }
};

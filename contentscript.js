/*
  Navigate to previous page when the Backspace key is pressed.
  Avoid this behavior when the focused element is an input field, textarea
  or has contenteditable attribute set to true.

  Not using `addEventListener` because the browser does not trigger the handler
  when the Backspace key is pressed.
*/
console.debug();
let time_to_jump = 5
let current_speed = 1;
let video = document.getElementsByTagName("video")[0]; // first we get the video from the DOM
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
     time_to_jump = request.jump
     video.playbackRate = request.speed
  });
document.onkeydown = function (e) {
  //if it's not 1 of these options we just ignore it
  if (
    document.activeElement.tagName !== "VIDEO" || // check if our focus is on the video tag(I assume there is only 1 video)
    (e.key !== "ArrowRight" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowUp")
  ) {
    return;
  }
  e.preventDefault();

  if (e.key === "ArrowRight") {
    video.currentTime += time_to_jump;
  } else if (e.key === "ArrowLeft") {
    video.currentTime -= time_to_jump;
  } else if (e.key === "ArrowUp") {
    video.volume = Math.min(video.volume + 0.1, 1);
  } else if (e.key === "ArrowDown") {
    video.volume = Math.max(video.volume - 0.1, 0);
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".player__video");
    const playButton = document.querySelector(".toggle");
    const progressBar = document.querySelector(".progress");
    const progressFilled = document.querySelector(".progress__filled");
    const volumeControl = document.querySelector(".volume");
    const speedControl = document.querySelector(".speed");
    const rewindButton = document.querySelector(".rewind");
    const forwardButton = document.querySelector(".forward");

    // Play/Pause Toggle
    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.textContent = "❚ ❚";
        } else {
            video.pause();
            playButton.textContent = "►";
        }
    });
    video.addEventListener("timeupdate", () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${progress}%`;
    });
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });
    volumeControl.addEventListener("input", () => {
        video.volume = volumeControl.value;
    });


    speedControl.addEventListener("input", () => {
        video.playbackRate = speedControl.value;
    });
    rewindButton.addEventListener("click", () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardButton.addEventListener("click", () => {
        video.currentTime = Math.min(video.duration, video.currentTime + 25);
    });
});

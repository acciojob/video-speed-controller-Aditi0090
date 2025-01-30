document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const playButton = document.createElement("button");
    const progressBar = document.createElement("div");
    const progressFilled = document.createElement("div");
    const volumeControl = document.createElement("input");
    const speedControl = document.createElement("input");
    const rewindButton = document.createElement("button");
    const forwardButton = document.createElement("button");

    // Add classes for styling
    playButton.classList.add("player__button");
    progressBar.classList.add("progress");
    progressFilled.classList.add("progress__filled");

    volumeControl.type = "range";
    volumeControl.min = 0;
    volumeControl.max = 1;
    volumeControl.step = 0.1;
    volumeControl.value = video.volume;

    speedControl.type = "range";
    speedControl.min = 0.5;
    speedControl.max = 2;
    speedControl.step = 0.1;
    speedControl.value = video.playbackRate;

    rewindButton.textContent = "« 10s";
    forwardButton.textContent = "25s »";

    playButton.textContent = "►"; // Default to play icon

    // Append controls
    const wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(playButton);
    wrapper.appendChild(progressBar);
    progressBar.appendChild(progressFilled);
    wrapper.appendChild(volumeControl);
    wrapper.appendChild(speedControl);
    wrapper.appendChild(rewindButton);
    wrapper.appendChild(forwardButton);

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

    // Update progress bar
    video.addEventListener("timeupdate", () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = `${progress}%`;
    });

    // Seek by clicking on the progress bar
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });

    // Volume Control
    volumeControl.addEventListener("input", () => {
        video.volume = volumeControl.value;
    });

    // Playback Speed Control
    speedControl.addEventListener("input", () => {
        video.playbackRate = speedControl.value;
    });

    // Rewind and Forward
    rewindButton.addEventListener("click", () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardButton.addEventListener("click", () => {
        video.currentTime = Math.min(video.duration, video.currentTime + 25);
    });
});

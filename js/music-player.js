document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const musicPlayer = document.getElementById('musicPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const volumeButton = document.getElementById('volumeButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const minimizeButton = document.getElementById('minimizeButton');
    const songTitleEl = document.getElementById('songTitle');

    const songs = [
        {
            path: 'sounds/music.ogg',
            title: 'Memories - One Piece'
        }
    ];

    let songIndex = 0;

    function initPlayer() {
        loadSong(songs[songIndex]);
        volumeSlider.value = 0.2;
        audioPlayer.volume = 0.2;
        audioPlayer.play();
        playButton.textContent = '⏸️';
        audioPlayer.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audioPlayer.duration);
        });
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong);
    }

    function loadSong(song) {
        songTitleEl.textContent = song.title;
        audioPlayer.src = song.path;
    }

    preloader.addEventListener('click', () => {
        preloader.style.display = 'none';
        document.body.classList.remove('preloader-active');
        initPlayer();
    });

    document.body.classList.add('preloader-active');

    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playButton.textContent = '▶️';
        }
    }

    function prevSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);
        if (playButton.textContent === '⏸️') {
            audioPlayer.play();
        }
    }

    function nextSong() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        if (playButton.textContent === '⏸️') {
            audioPlayer.play();
        }
    }

    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function updateVolume() {
        audioPlayer.volume = volumeSlider.value;
        updateVolumeIcon();
    }

    function updateVolumeIcon() {
        if (audioPlayer.volume === 0) {
            volumeButton.textContent = '🔇';
        } else if (audioPlayer.volume < 0.5) {
            volumeButton.textContent = '🔉';
        } else {
            volumeButton.textContent = '🔊';
        }
    }

    function toggleMute() {
        if (audioPlayer.volume > 0) {
            volumeSlider.dataset.prevVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
        } else {
            const prevVolume = volumeSlider.dataset.prevVolume || 0.2;
            audioPlayer.volume = prevVolume;
            volumeSlider.value = prevVolume;
        }
        updateVolumeIcon();
    }

    function toggleMinimize() {
        musicPlayer.classList.toggle('minimized');
        minimizeButton.textContent = musicPlayer.classList.contains('minimized') ? '+' : '—';
    }

    playButton.addEventListener('click', togglePlay);
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    volumeButton.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', updateVolume);
    progressContainer.addEventListener('click', setProgress);
    minimizeButton.addEventListener('click', toggleMinimize);
});

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const audioPlayer = document.getElementById('audio-player');
    const trackNameElement = document.getElementById('track-name');
    const artistNameElement = document.getElementById('artist-name');
    const playlistElement = document.getElementById('playlist');
    const searchBox = document.getElementById('search-box');

    // Updated playlist with more songs
    const playlist = [
        { src: 'song.mp3', trackName: 'Mahiye jinna sona', artistName: 'Darshan raval', cover: 'card2img.jpeg' },
        { src: 'naa ready.mp3', trackName: 'naa ready', artistName: 'Anirudh', cover: 'naa ready.jpg' },
        { src: 'hari hari odhni.mp3', trackName: 'Hari hari odhni 3', artistName: 'Pawan singh ', cover: 'hari hari odhni.jpg' },
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        const track = playlist[index];
        audioPlayer.src = track.src;
        trackNameElement.textContent = track.trackName;
        artistNameElement.textContent = track.artistName;
        document.querySelector('.album-cover').src = track.cover;
    }

    function playTrack() {
        audioPlayer.play();
        playButton.textContent = 'Pause';
    }

    function pauseTrack() {
        audioPlayer.pause();
        playButton.textContent = 'Play';
    }

    function updatePlayButton() {
        if (audioPlayer.paused) {
            playButton.textContent = 'Play';
        } else {
            playButton.textContent = 'Pause';
        }
    }

    function updatePlaylist(filter = '') {
        playlistElement.innerHTML = '';
        const filteredPlaylist = playlist.filter(track => 
            track.trackName.toLowerCase().includes(filter.toLowerCase()) || 
            track.artistName.toLowerCase().includes(filter.toLowerCase())
        );
        filteredPlaylist.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = `${track.trackName} - ${track.artistName}`;
            li.addEventListener('click', () => {
                currentTrackIndex = playlist.indexOf(track);
                loadTrack(currentTrackIndex);
                playTrack();
            });
            playlistElement.appendChild(li);
        });
    }

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    prevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    nextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    // Search functionality
    searchBox.addEventListener('input', (event) => {
        updatePlaylist(event.target.value);
    });

    // Initial setup
    loadTrack(currentTrackIndex);
    updatePlaylist();
    
    // Update play button text on play/pause
    audioPlayer.addEventListener('play', updatePlayButton);
    audioPlayer.addEventListener('pause', updatePlayButton);
});

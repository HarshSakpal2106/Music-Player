const image = document.getElementById('cover'),
    title = document.getElementById('song-title'),
    artist = document.getElementById('artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('background'),
    repeatBtn = document.getElementById('repeat'),
    musicList = document.querySelector('.music-list'),
    menuBtn = document.getElementById('menu'),
    closeBtn = document.getElementById('closeBtn');

const music = new Audio();
const songs = [
    {
        path: 'lunch-break.mp3',
        displayName: 'Lunch Break',
        cover: 'lunchbreak.jpg',
        artist: 'Seedhe Maut',
  },
    {
        path: 'khatta-flow.mp3',
        displayName: 'Khatta Flow',
        cover: 'khatta-flow.jpg',
        artist: 'Seedhe Maut ft. KR$NA',
  },
    {
        path: 'Bhaag Milkha Bhaag (Rock Version) Full Video - Farhan AkhtarSiddharth Mahadevan',
        displayName: 'Bhaag Milkha Bhaag',
        cover: 'bhaag-milkha-bhaag.jpeg',
        artist: 'Siddharth Mahadevan'
  },
    {
        path: 'Chainsaw Man OST_ Edge of Chainsaw (Main Theme)  EPIC VERSION.mp3',
        displayName: 'Chainsaw Man OST',
        cover: 'chainsawman.jpeg',
        artist: 'Kensuke Oshio'
  },
    {
        path: '11k.mp3',
        displayName: '11K',
        cover: '11k.jpg',
        artist: 'Seedhe Maut',
  },
    {
        path: 'All The Stars - SZA, Kendrick Lamar',
        displayName: 'All The Stars',
        cover: 'allthestars.jpeg',
        artist: 'SZA & Kendrick Lamar'
  },
    {
        path: 'Cyberpunk_ Edgerunners  I Really Want to Stay At Your House by Rosa Walton  Music Video',
        displayName: 'I Wanna Stay At Your House',
        cover: 'cyberpunk.jpg',
        artist: 'Rosa Walton'
  },
    {
        path: 'brand-new.mp3',
        displayName: 'Brand New',
        cover: 'brand-new.jpg',
        artist: 'Seedhe Maut',
  },
    {
        path: 'joint-in-the-booth.mp3',
        displayName: 'Joint In The Booth',
        cover: 'joint-in-the-booth.jpg',
        artist: 'Seedhe Maut',
  },
    {
        path: 'iraadey.mp3',
        displayName: 'Iraadey',
        cover: 'iraadey.jpg',
        artist: 'Abdul Hannan & Rovalio',
  },
    {
        path: 'you.mp3',
        displayName: 'You',
        cover: 'you.jpg',
        artist: 'Armaan Malik',
  },
    {
        path: 'double-take.mp3',
        displayName: 'Double Take',
        cover: 'double-take.jpg',
        artist: 'Dhruv',
  },
    {
        path: 'perfect.mp3',
        displayName: 'Perfect',
        cover: 'perfect.jpg',
        artist: 'Ed Sheeran',
  },
    {
        path: 'something-about-you.mp3',
        displayName: 'Something About You',
        cover: 'something-about-you.jpg',
        artist: 'Eyedress ft. Dent May',
  },
    {
        path: 'Not Like Us.mp3',
        displayName: 'Not Like Us',
        cover: 'notlikeus.jpeg',
        artist: 'Kendrick Lamar'
  },
    {
        path: 'Honeypie - JAWNY',
        displayName: 'Honeypie',
        cover: 'honeypie.jpeg',
        artist: 'JAWNY'
  },
    {
        path: 'tightrope - zayn',
        displayName: 'Tightrope',
        cover: 'tightrope.jpeg',
        artist: 'ZAYN'
  },
    {
        path: 'Keep Up - ODETARI',
        displayName: 'Keep Up',
        cover: 'keepup.jpeg',
        artist: 'Odetari'
  },
    {
        path: 'die with a smile - bruno mars, lady gaga',
        displayName: 'Die With A Smile',
        cover: 'diewithasmile.jpeg',
        artist: 'Bruno Mars & Lady Gaga'
  },
    {
        path: 'dil mere - local train',
        displayName: 'Dil Mere',
        cover: 'dilmere.jpg',
        artist: 'The Local Train'
  },
];

let musicIndex = 0;
let isPlaying = false;
let isRepeating = false;

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    if (isPlaying) {
        music.play().catch(error => console.error('Error playing audio:', error));
    }
}

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

// PLAY BUTTON FUNCTION
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play().catch(error => console.error('Error playing audio:', error));
}

// PAUSE BUTTON FUNCTION
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);

    if (isPlaying) {
        music.play().catch(error => console.error('Error playing audio:', error));
    }
}

// REPEAT FUNCTION
function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatBtn.textContent = isRepeating ? 'repeat_one' : 'repeat'; // CHANGE ICON TO REPEAT_ONE
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// SONG REPEAT
music.addEventListener('ended', () => {
    if (isRepeating) {
        music.currentTime = 0;
        music.play().catch(error => console.error('Error playing audio:', error));
    } else {
        changeMusic(1); // MOVE TO NEXT SONG IF REPEAT IS OFF
    }
});

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
repeatBtn.addEventListener('click', toggleRepeat);
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// LOAD THE FIRST SONG
loadMusic(songs[musicIndex]);

// OPEN THE MENU LIST
menuBtn.addEventListener('click', () => {
    musicList.style.transform = 'translateX(0)';
});

// CLOSE THE MENU LIST
closeBtn.addEventListener('click', () => {
    musicList.style.transform = 'translateX(-100%)';
});

function loadMusicList() {
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.textContent = `${song.displayName} - ${song.artist}`;
        songItem.dataset.index = index;
        
        songItem.addEventListener('click', () => {
            musicIndex = index;
            loadMusic(songs[musicIndex]); 
            musicList.style.transform = 'translateX(-100%)';
        });

        musicList.appendChild(songItem);
    });
}

loadMusicList();
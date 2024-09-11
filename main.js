 const image = document.getElementById('song-cover'),
  title = document.getElementById('song-title'),
  artist = document.getElementById('artist'),
  currentTimeEl = document.getElementById('current-time'),
  durationEl = document.getElementById('duration'),
  progress = document.getElementById('progress'),
  playerProgress = document.getElementById('player-progress'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next'),
  playBtn = document.getElementById('play'),
  background = document.getElementById('background');

const music = new Audio();
const songs = [
  {
    path: '/assets/lunch-break.mp3',
    displayName: 'Lunch Break',
    cover: '/assets/seedhemaut.jpg',
    artist: 'Seedhe Maut',
  },
  {
    path: '/assets/khatta-flow.mp3',
    displayName: 'Khatta Flow',
    cover: '/assets/khatta-flow.jpg',
    artist: 'Seedhe Maut ft. KR$NA',
  },
  {
    path: '/assets/11k.mp3',
    displayName: '11K',
    cover: '/assets/11k.jpg',
    artist: 'Seedhe Maut',
  },
  {
    path: '/assets/brand-new.mp3',
    displayName: 'Brand New',
    cover: '/assets/brand-new.jpg',
    artist: 'Seedhe Maut',
  },
  {
    path: '/assets/joint-in-the-booth.mp3',
    displayName: 'Joint In The Booth',
    cover: '/assets/joint-in-the-booth.jpg',
    artist: 'Seedhe Maut',
  },
  {
    path: '/assets/iraadey.mp3',
    displayName: 'Iraadey',
    cover: '/assets/iraadey.jpg',
    artist: 'Abdul Hannan & Rovalio',
  },
  {
    path: '/assets/you.mp3',
    displayName: 'You',
    cover: '/assets/you.jpg',
    artist: 'Armaan Malik',
  },
  {
    path: '/assets/double-take.mp3',
    displayName: 'Double Take',
    cover: '/assets/double-take.jpg',
    artist: 'Dhruv',
  },
  {
    path: '/assets/perfect.mp3',
    displayName: 'Perfect',
    cover: '/assets/perfect.jpg',
    artist: 'Ed Sheeran',
  },
  {
    path: '/assets/something-about-you.mp3',
    displayName: 'Something About You',
    cover: '/assets/something-about-you.jpg',
    artist: 'Eyedress ft. Dent May',
  }, 
];
let musicIndex = 0;
let isPlaying = false;

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  cover.src = song.cover;
  background.src = song.cover;

  // If the song was already playing, continue playing; otherwise, do nothing
  if (isPlaying) {
    music.play().catch(error => console.error('Error playing audio:', error));
  }
}

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play().catch(error => console.error('Error playing audio:', error));
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);

  // Check if music was playing before loading a new song
  if (isPlaying) {
    music.play().catch(error => console.error('Error playing audio:', error));
  }
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Load the first song
loadMusic(songs[musicIndex]);
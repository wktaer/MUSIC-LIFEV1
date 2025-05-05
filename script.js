const albums = {};

function crearAlbum() {
  const nameInput = document.getElementById('album-name');
  const fileInput = document.getElementById('album-songs');

  const albumName = nameInput.value.trim();
  const songs = Array.from(fileInput.files);

  if (!albumName || songs.length === 0) {
    alert('Agrega un nombre y al menos una canción');
    return;
  }

  if (!albums[albumName]) albums[albumName] = [];

  songs.forEach(song => albums[albumName].push(song));

  nameInput.value = '';
  fileInput.value = '';

  renderAlbums();
}

function renderAlbums() {
  const container = document.getElementById('albums');
  container.innerHTML = '';

  Object.entries(albums).forEach(([albumName, songs]) => {
    const albumDiv = document.createElement('div');
    albumDiv.className = 'album-container';

    const title = document.createElement('h4');
    title.textContent = albumName;
    albumDiv.appendChild(title);

    songs.forEach(song => {
      const btn = document.createElement('button');
      btn.textContent = song.name;
      btn.onclick = () => playSong(song);
      albumDiv.appendChild(btn);
    });

    container.appendChild(albumDiv);
  });
}

let audioPlayer = null;

function playSong(file) {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.remove();
  }

  audioPlayer = new Audio(URL.createObjectURL(file));
  audioPlayer.controls = true;
  audioPlayer.autoplay = true;
  document.body.appendChild(audioPlayer);
}

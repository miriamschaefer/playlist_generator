import { getTokenFromUrl } from './spotify';
const hash = getTokenFromUrl();

const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${hash.access_token}`
});


const user = new Request(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers,
});

const getUser = async() => {
  const getUserInfo = await fetch(user);
  const userId = await getUserInfo.json();

  return userId.id;
}

// const request = new Request(`https://api.spotify.com/v1/users/${userId.id}/playlists`, {
//     method: 'GET',
//     headers,
// });



const getPlaylist = async (user) => {

 const getUserPlaylist = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
   method: 'GET',
    headers,
 });
  const playlists = await getUserPlaylist.json();
  
    return playlists;
};
const getSongs = async (url) => {

const getUserSongs = await fetch(url, {
  method: 'GET',
  headers,
});
  const songs = await getUserSongs.json();
    return songs;
};

const getAudioFeatures = async (songId) => {
  const getSongAudioFeatures = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
   method: 'GET',
    headers,
 });
  const audioFeatures = await getSongAudioFeatures.json();
  return audioFeatures
}

const getTopTracks = async (artistId) => {
  const getArtistTopTracks = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
    method: 'GET',
    headers,
  });

  const topTracks = await getArtistTopTracks.json();
  const tracks = [];
    for (let track of topTracks.tracks) {
      tracks.push(track.id)
    }
  return tracks;
}

  const postPlaylist = async (name, mood, userId, tracks) => {
    // Create empty playlist and retrieve endpoint
    const emptyPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      body: JSON.stringify({
        'name': name + ' ' + (mood === true ? 'Anxiety style' : 'Depression style'),
        'public': false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hash.access_token}`
      }
    })
    .then(response => response.json())
    .then(async response => {
      console.log(response)
      // Add tracks to playlist
      // if (tracks.length > 100) error("Playlist too large for one call");
      const fillPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${response.id}/tracks?uris=${tracks}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hash.access_token}`
        },
      });
    });
  }

export { getPlaylist, getUser, getSongs, getTopTracks, getAudioFeatures, postPlaylist };

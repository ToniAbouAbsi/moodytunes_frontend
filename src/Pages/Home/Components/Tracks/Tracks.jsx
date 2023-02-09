import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Tracks.css';
import Single from './Single';

const Tracks = ({ playlistType }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    handleSubmit();
  });

  const handleSubmit = async () => {
    try {
      // First, obtain an access token using the user's credentials
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'client_credentials',
          client_id: '52be0d44218c4ef8beab5d2615cf203d',
          client_secret: 'ec01025f22d74fe18a1748dfc8550217',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const accessToken = response.data.access_token;
      // Now that we have an access token, we can use it to search for a playlist of the specified type
      const searchResponse = await axios.get(
        `https://api.spotify.com/v1/search?q=${playlistType}&type=playlist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Select the first playlist from the search results
      const playlist = searchResponse.data.playlists.items[0];

      // Retrieve the tracks for the selected playlist
      const tracksResponse = await axios.get(playlist.tracks.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the component state with the list of tracks (up to a maximum of 40 tracks)
      setTracks(tracksResponse.data.items.slice(0, 40));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='tracks'>
      {tracks.length > 0 && (
        <div className='card-deck all-cards'>
          {tracks.map((track) => (
            <Single track={track} key={track.track.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tracks;

import React from 'react';
import { Card } from 'react-bootstrap';
import './Single.css';

const Single = ({ track }) => {
  return (
    <Card className='Single'>
      <Card.Img
        className='Single-Card-Img'
        variant='top'
        src={track.track.album.images[0].url}
      />
      <Card.Body className='Single-Card-Body'>
        <Card.Title className='Single-Card-Title'>
          {track.track.name}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted Single-Card-Subtitle'>
          {track.track.artists[0].name}
        </Card.Subtitle>
        <Card.Text className='Single-Card-Text'>
          ({track.track.album.release_date})
        </Card.Text>
      </Card.Body>
      <Card.Footer className='Single-Card-Footer'>
        <audio
          className='Single-Card-Footer-Audio'
          controls
          src={track.track.preview_url}
          style={{ width: '100%' }}
        />
      </Card.Footer>
    </Card>
  );
};

export default Single;

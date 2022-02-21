import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography as Text,
} from '@mui/material';
import React from 'react';
import { contentColor } from '../../styles';

function GameList({ games }) {
  if (games.length === 0) return <Text>Nothing yet...</Text>;

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', padding: '0 2rem 0 2rem' }}
    >
      {games.map((game) => (
        <Grid item key={game.id} md={4} sx={{ textAlign: 'center' }}>
          <Card
            sx={{
              maxWidth: 200,
              '&:hover': { transform: 'scale(1.01)', cursor: 'pointer' },
              ...contentColor,
            }}
          >
            <CardMedia
              component="img"
              height="190"
              image={game.imageUrl}
              alt={game.name}
            />
            <CardContent>
              <Text variant="body2">
                <b>{game.name}</b>
              </Text>
              <Text variant="body2">{game?.releaseYear}</Text>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameList;

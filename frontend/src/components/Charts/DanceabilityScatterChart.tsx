import { Scatter } from 'react-chartjs-2';
import { Track } from '../TracksList/types';

interface Props {
  data: Track[];
}

export const DanceabilityScatterChart = ({ data }: Props) => {
  const scatterData = {
    datasets: [
      {
        label: 'Acousticness vs Danceability',
        data: data.map((song) => ({
          x: song.acousticness,
          y: song.danceability,
        })),
        backgroundColor: '#8884d8',
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: { title: { display: true, text: 'Acousticness' } },
      y: { title: { display: true, text: 'Danceability' } },
    },
  };

  return <Scatter data={scatterData} options={scatterOptions} />;
};

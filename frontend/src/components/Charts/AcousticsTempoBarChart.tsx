import { Bar } from 'react-chartjs-2';
import { Track } from '../TracksList/types';

interface Props {
  data: Track[];
}

export const AcousticsTempoBarChart = ({ data }: Props) => {
  const barData = {
    labels: data.map((song) => song.title),
    datasets: [
      {
        label: 'Acousticness',
        data: data.map((song) => song.acousticness),
        backgroundColor: '#8884d8',
      },
      {
        label: 'Tempo',
        data: data.map((song) => song.tempo),
        backgroundColor: '#82ca9d',
      },
    ],
  };

  const barOptions = {
    scales: {
      x: { title: { display: true, text: 'Song Title' } },
      y: { title: { display: true, text: 'Value' } },
    },
  };

  return <Bar data={barData} options={barOptions} />;
};

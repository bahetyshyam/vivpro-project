import { Scatter, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card } from 'antd';
import { Track } from '../TracksList/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

interface IProps {
  data: Track[];
}

export const Charts = ({ data }: IProps) => {
  const scatterData = {
    datasets: [
      {
        label: 'Danceability',
        data: data.map((song) => ({ x: song.title, y: song.danceability })),
        backgroundColor: '#8884d8',
      },
    ],
  };

  const scatterOptions = {
    scales: {
      x: { title: { display: true, text: 'Song Title' } },
      y: { title: { display: true, text: 'Danceability' } },
    },
  };

  const processHistogramData = (data: Track[], binSize = 30) => {
    if (data.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Duration (s)',
            data: [],
            backgroundColor: '#82ca9d',
          },
        ],
      };
    }
    const songDurationData = data.map((song) =>
      Math.floor(song.duration_ms / 1000)
    );
    const min = Math.min(...songDurationData);
    const max = Math.max(...songDurationData);
    const numBins = Math.ceil((max - min) / binSize); // 10 seconds per bin
    const bins = Array(numBins).fill(0);

    songDurationData.forEach((value) => {
      const binIndex = Math.floor((value - min) / binSize);
      bins[binIndex] += 1;
    });

    const labels = Array.from(
      { length: numBins },
      (_, i) => `${min + i * binSize}-${min + (i + 1) * binSize}`
    );
    return {
      labels,
      datasets: [
        {
          label: 'Duration (s)',
          data: bins,
          backgroundColor: '#82ca9d',
          borderWidth: 0,
        },
      ],
    };
  };

  const histogramData = processHistogramData(data);

  const histogramOptions = {
    scales: {
      x: { title: { display: true, text: 'Duration (s)' }, beginAtZero: true },
      y: { title: { display: true, text: 'Range' } },
    },
  };

  // Bar Chart for Acoustics and Tempo
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card title="Danceability Scatter Chart">
        <Scatter data={scatterData} options={scatterOptions} />
      </Card>

      <Card title="Duration Histogram">
        <Bar data={histogramData} options={histogramOptions} />
      </Card>

      <Card title="Acoustics and Tempo Bar Chart">
        <Bar data={barData} options={barOptions} />
      </Card>
    </div>
  );
};

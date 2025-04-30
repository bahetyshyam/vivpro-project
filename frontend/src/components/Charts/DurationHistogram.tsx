import { Bar } from 'react-chartjs-2';
import { Track } from '../TracksList/types';

interface Props {
  data: Track[];
}

const createHistogramData = (labels: string[] = [], data: number[] = []) => ({
  labels,
  datasets: [
    {
      label: 'Number of Songs',
      data,
      backgroundColor: '#82ca9d',
      borderWidth: 0,
    },
  ],
});

export const DurationHistogram = ({ data }: Props) => {
  const processHistogramData = (data: Track[], binSize = 30) => {
    if (data.length === 0) {
      return createHistogramData(); // Return default structure for empty data
    }

    const songDurationData = data.map((song) =>
      Math.floor(song.duration_ms / 1000)
    );
    const min = Math.min(...songDurationData);
    const max = Math.max(...songDurationData);
    const numBins = Math.ceil((max - min) / binSize);
    const bins = Array(numBins).fill(0);

    songDurationData.forEach((value) => {
      const binIndex = Math.floor((value - min) / binSize);
      bins[binIndex] += 1;
    });

    const labels = Array.from(
      { length: numBins },
      (_, i) => `${min + i * binSize}-${min + (i + 1) * binSize}`
    );

    return createHistogramData(labels, bins);
  };

  const histogramData = processHistogramData(data || []);

  const histogramOptions = {
    scales: {
      x: { title: { display: true, text: 'Duration (s)' }, beginAtZero: true },
      y: { title: { display: true, text: 'Range' } },
    },
  };

  return <Bar data={histogramData} options={histogramOptions} />;
};

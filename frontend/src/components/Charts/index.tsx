import { Card } from 'antd';
import { initialState, TracksState } from '../TracksList/useTracksState';
import { useGetTracks } from '../TracksList/useGetTracks';
import { DanceabilityScatterChart } from './DanceabilityScatterChart';
import { DurationHistogram } from './DurationHistogram';
import { AcousticsTempoBarChart } from './AcousticsTempoBarChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

interface IProps {
  tracksState: TracksState | null;
}

export const Charts = ({ tracksState }: IProps) => {
  const { data: queryResultData } = useGetTracks(tracksState || initialState);
  const data = queryResultData?.results || [];

  return (
    <div className="section-container">
      <Card title="Danceability Scatter Chart">
        <DanceabilityScatterChart data={data} />
      </Card>

      <Card title="Duration Histogram" className="margin-top-20">
        <DurationHistogram data={data} />
      </Card>

      <Card title="Acoustics and Tempo Bar Chart" className="margin-top-20">
        <AcousticsTempoBarChart data={data} />
      </Card>
    </div>
  );
};

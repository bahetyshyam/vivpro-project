import { Rate } from 'antd';

export const getColumns = (
  handleRatingChange: (trackId: string, rating: number) => void
) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    sorter: true,
  },
  {
    title: 'Danceability',
    dataIndex: 'danceability',
    key: 'danceability',
    width: 150,
    sorter: true,
  },
  {
    title: 'Energy',
    dataIndex: 'energy',
    key: 'energy',
    width: 150,
    sorter: true,
  },
  {
    title: 'Loudness',
    dataIndex: 'loudness',
    key: 'loudness',
    width: 150,
    sorter: true,
  },
  {
    title: 'Mode',
    dataIndex: 'mode',
    key: 'mode',
    width: 100,
    sorter: true,
  },
  {
    title: 'Acousticness',
    dataIndex: 'acousticness',
    key: 'acousticness',
    width: 150,
    sorter: true,
  },
  {
    title: 'Instrumentalness',
    dataIndex: 'instrumentalness',
    key: 'instrumentalness',
    width: 200,
    sorter: true,
  },
  {
    title: 'Liveness',
    dataIndex: 'liveness',
    key: 'liveness',
    width: 150,
    sorter: true,
  },
  {
    title: 'Valence',
    dataIndex: 'valence',
    key: 'valence',
    width: 150,
    sorter: true,
  },
  {
    title: 'Tempo',
    dataIndex: 'tempo',
    key: 'tempo',
    width: 150,
    sorter: true,
  },
  {
    title: 'Duration (ms)',
    dataIndex: 'duration_ms',
    key: 'duration_ms',
    width: 200,
    sorter: true,
  },
  {
    title: 'Time Signature',
    dataIndex: 'time_signature',
    key: 'time_signature',
    width: 180,
    sorter: true,
  },
  {
    title: 'Number of Bars',
    dataIndex: 'num_bars',
    key: 'num_bars',
    width: 180,
    sorter: true,
  },
  {
    title: 'Number of Sections',
    dataIndex: 'num_sections',
    key: 'num_sections',
    width: 200,
    sorter: true,
  },
  {
    title: 'Number of Segments',
    dataIndex: 'num_segments',
    key: 'num_segments',
    width: 200,
    sorter: true,
  },
  {
    title: 'Track Class',
    dataIndex: 'track_class',
    key: 'track_class',
    width: 150,
    sorter: true,
  },
  {
    title: 'User Rating',
    dataIndex: 'user_rating',
    key: 'user_rating',
    width: 180,
    sorter: true,
    render: (rating: number | null, record: { track_id: string }) => (
      <Rate
        value={rating || 0}
        onChange={(value) => handleRatingChange(record.track_id, value)}
      />
    ),
  },
];

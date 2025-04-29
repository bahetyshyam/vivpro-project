import { useState } from 'react';
import { Input, Table, Rate, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { axios } from '../../api/axios';
import { TrackResponse } from './types';
import { CSVLink } from 'react-csv';

const { Search } = Input;

export const TracksList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState('');

  const fetchTracks = async ({
    queryKey,
  }: {
    queryKey: [string, { page: number; limit: number; title: string }];
  }) => {
    const [, { page, limit, title }] = queryKey;
    const response = await axios.get<TrackResponse>('/tracks', {
      params: { page, limit, title },
    });
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['tracks', { page, limit, title }],
    queryFn: fetchTracks,
  });

  const handleSearch = (value: string) => {
    setTitle(value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
    setTitle(''); // Clear search when changing pagination
  };

  const handleRatingChange = async (trackId: string, rating: number) => {
    try {
      await axios.post(`/tracks/${trackId}/rate`, { rating });
      // Optionally refetch the data to reflect the updated rating
      refetch();
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Danceability',
      dataIndex: 'danceability',
      key: 'danceability',
      width: 150,
    },
    {
      title: 'Energy',
      dataIndex: 'energy',
      key: 'energy',
      width: 150,
    },
    {
      title: 'Loudness',
      dataIndex: 'loudness',
      key: 'loudness',
      width: 150,
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
      width: 100,
    },
    {
      title: 'Acousticness',
      dataIndex: 'acousticness',
      key: 'acousticness',
      width: 150,
    },
    {
      title: 'Instrumentalness',
      dataIndex: 'instrumentalness',
      key: 'instrumentalness',
      width: 200,
    },
    {
      title: 'Liveness',
      dataIndex: 'liveness',
      key: 'liveness',
      width: 150,
    },
    {
      title: 'Valence',
      dataIndex: 'valence',
      key: 'valence',
      width: 150,
    },
    {
      title: 'Tempo',
      dataIndex: 'tempo',
      key: 'tempo',
      width: 150,
    },
    {
      title: 'Duration (ms)',
      dataIndex: 'duration_ms',
      key: 'duration_ms',
      width: 200,
    },
    {
      title: 'Time Signature',
      dataIndex: 'time_signature',
      key: 'time_signature',
      width: 150,
    },
    {
      title: 'Number of Bars',
      dataIndex: 'num_bars',
      key: 'num_bars',
      width: 150,
    },
    {
      title: 'Number of Sections',
      dataIndex: 'num_sections',
      key: 'num_sections',
      width: 200,
    },
    {
      title: 'Number of Segments',
      dataIndex: 'num_segments',
      key: 'num_segments',
      width: 200,
    },
    {
      title: 'Track Class',
      dataIndex: 'track_class',
      key: 'track_class',
      width: 150,
    },
    {
      title: 'User Rating',
      dataIndex: 'user_rating',
      key: 'user_rating',
      width: 180,
      render: (rating: number | null, record: { track_id: string }) => (
        <Rate
          value={rating || 0}
          onChange={(value) => handleRatingChange(record.track_id, value)}
        />
      ),
    },
  ];

  const downloadHeaders = columns.map((col) => ({
    label: col.title,
    key: col.dataIndex,
  }));

  const downloadData =
    data?.results.map((track) => ({
      ...track,
      user_rating: track.user_rating || 0, // Ensure user_rating is not null
    })) || [];

  console.log('Headers:', downloadHeaders);
  console.log('Data:', downloadData);

  return (
    <div
      style={{
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Search
          placeholder="Search by title"
          onSearch={handleSearch}
          enterButton
          style={{ width: '70%' }}
        />
        <CSVLink
          data={downloadData}
          headers={downloadHeaders}
          filename={`tracks_page_${page}.csv`}
        >
          <Button type="primary">Download CSV</Button>
        </CSVLink>
      </div>
      {isError && <p>Error loading tracks.</p>}
      {!isError && (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={
            data?.results.map((track) => ({ ...track, key: track.track_id })) ||
            []
          }
          pagination={{
            current: page,
            pageSize: limit,
            total: data?.count,
            onChange: handlePaginationChange,
          }}
          scroll={{ y: 400, x: 'max-content' }} // Fixed height and scrollable content
          style={{ minHeight: '400px' }}
        />
      )}
    </div>
  );
};

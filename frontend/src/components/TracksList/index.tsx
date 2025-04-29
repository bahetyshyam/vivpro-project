import { Input, Table, Rate, Button } from 'antd';
import { useUpdateRating } from './useUpdateRating';
import { CSVLink } from 'react-csv';
import { Charts } from '../Charts';
import { useTracksState } from './useTracksState';
import { useGetTracks } from './useGetTracks';

const { Search } = Input;

export const TracksList = () => {
  const { state, setPage, setLimit, setTitle, setSort } = useTracksState();
  const { data, isLoading, isError } = useGetTracks(state);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (_pagination: any, _filters: any, sorter: any) => {
    if (sorter.order) {
      setSort(sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc');
    } else {
      setSort(null, null);
    }
  };

  const handleSearch = (value: string) => {
    setTitle(value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePaginationChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
    setTitle(''); // Clear search when changing pagination
  };

  const mutation = useUpdateRating(state);

  const handleRatingChange = (trackId: string, rating: number) => {
    if (rating < 1 || rating > 5) {
      console.error('Rating must be between 1 and 5');
      return;
    }
    mutation.mutate({ trackId, rating });
  };

  const columns = [
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

  const downloadHeaders = columns.map((col) => ({
    label: col.title,
    key: col.dataIndex,
  }));

  const downloadData =
    data?.results.map((track) => ({
      ...track,
      user_rating: track.user_rating || 0, // Ensure user_rating is not null
    })) || [];

  return (
    <div className="tracks-list-container">
      <div className="tracks-list-header">
        <Search
          placeholder="Search by title"
          onSearch={handleSearch}
          enterButton
          className="tracks-list-search"
        />
        <CSVLink
          data={downloadData}
          headers={downloadHeaders}
          filename={`tracks_page_${state.page}.csv`}
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
            current: state.page,
            pageSize: state.limit,
            total: data?.count,
            onChange: handlePaginationChange,
          }}
          onChange={handleTableChange}
          scroll={{ y: 400, x: 'max-content' }}
          className="tracks-list-table"
        />
      )}

      <Charts data={data?.results || []} />
    </div>
  );
};

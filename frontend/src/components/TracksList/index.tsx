import { Input, Table, Button } from 'antd';
import { useUpdateRating } from './useUpdateRating';
import { CSVLink } from 'react-csv';
import { TracksState, useTracksState } from './useTracksState';
import { useGetTracks } from './useGetTracks';
import { useEffect } from 'react';
import { getColumns } from './columnsConfig';

const { Search } = Input;

type IProps = {
  onStateChange?: (_state: TracksState) => void;
};

export const TracksList = ({ onStateChange }: IProps) => {
  const { state, setPage, setLimit, setTitle, setSort } = useTracksState();
  const { data, isLoading, isError } = useGetTracks(state);
  const mutation = useUpdateRating(state);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

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
  };

  const handleRatingChange = (trackId: string, rating: number) => {
    if (rating < 1 || rating > 5) {
      console.error('Rating must be between 1 and 5');
      return;
    }
    mutation.mutate({ trackId, rating });
  };

  const columns = getColumns(handleRatingChange);

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
    <div className="section-container">
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
    </div>
  );
};

import { useQuery } from '@tanstack/react-query';
import { TracksState } from './useTracksState';
import { axios } from '../../api/axios';
import { TrackResponse } from './types';

const ENDPOINT = '/tracks';

function fetchTracks(tracksState: TracksState) {
  return axios.get<TrackResponse>(ENDPOINT, {
    params: {
      page: tracksState.page,
      limit: tracksState.limit,
      title: tracksState.title !== '' ? tracksState.title : undefined,
      sort_by: tracksState.sortBy,
      sort_order: tracksState.sortOrder,
    },
  });
}

export function getQueryKey(tracksState: TracksState) {
  return [
    'tracks',
    {
      page: tracksState.page,
      limit: tracksState.limit,
      title: tracksState.title,
      sortBy: tracksState.sortBy,
      sortOrder: tracksState.sortOrder,
    },
  ];
}

export function useGetTracks(tracksState: TracksState) {
  const query = useQuery({
    queryKey: getQueryKey(tracksState),
    queryFn: async () => {
      const response = await fetchTracks(tracksState);
      return response.data;
    },
  });
  return query;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '../../api/axios';
import { getQueryKey } from './useGetTracks';
import { TracksState } from './useTracksState';
import { TrackResponse } from './types';

type UpdateRatingParams = {
  trackId: string;
  rating: number;
};

function updateRating({ trackId, rating }: UpdateRatingParams) {
  return axios.post(`/tracks/${trackId}/rate`, { rating });
}

export const useUpdateRating = (tracksState: TracksState) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRating,
    onMutate: async ({ trackId, rating }) => {
      // Optimistically update the UI
      await queryClient.cancelQueries({
        queryKey: getQueryKey(tracksState),
      });

      const previousData = queryClient.getQueryData(getQueryKey(tracksState));

      queryClient.setQueryData(
        getQueryKey(tracksState),
        (oldData: TrackResponse) => {
          console.log(oldData);
          if (!oldData) return oldData;
          return {
            ...oldData,
            results: oldData.results.map((track) =>
              track.track_id === trackId
                ? { ...track, user_rating: rating }
                : track
            ),
          };
        }
      );

      return { previousData };
    },
    onError: (error, _variables, context) => {
      // Rollback to previous state on error
      if (context?.previousData) {
        queryClient.setQueryData(
          getQueryKey(tracksState),
          context.previousData
        );
      }
      console.error('Failed to update rating:', error);
    },
    onSuccess: () => {
      // Refetch the data to ensure consistency
      queryClient.invalidateQueries({
        queryKey: getQueryKey(tracksState),
      });
    },
  });
};

import { useReducer } from 'react';

export type TracksState = {
  page: number;
  limit: number;
  title: string;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
};

enum TracksActionKind {
  SET_PAGE = 'SET_PAGE',
  SET_LIMIT = 'SET_LIMIT',
  SET_TITLE = 'SET_TITLE',
  SET_SORT = 'SET_SORT',
}

type TracksAction =
  | { type: TracksActionKind.SET_PAGE; payload: number }
  | { type: TracksActionKind.SET_LIMIT; payload: number }
  | { type: TracksActionKind.SET_TITLE; payload: string }
  | {
      type: TracksActionKind.SET_SORT;
      payload: { sortBy: string | null; sortOrder: 'asc' | 'desc' | null };
    };

export const initialState: TracksState = {
  page: 1,
  limit: 10,
  title: '',
  sortBy: null,
  sortOrder: null,
};

const reducer = (state: TracksState, action: TracksAction): TracksState => {
  switch (action.type) {
    case TracksActionKind.SET_PAGE:
      return { ...state, page: action.payload };
    case TracksActionKind.SET_LIMIT:
      return { ...state, limit: action.payload };
    case TracksActionKind.SET_TITLE:
      return { ...state, title: action.payload };
    case TracksActionKind.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };
    default:
      return state;
  }
};

export const useTracksState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPage = (page: number) =>
    dispatch({ type: TracksActionKind.SET_PAGE, payload: page });
  const setLimit = (limit: number) =>
    dispatch({ type: TracksActionKind.SET_LIMIT, payload: limit });
  const setTitle = (title: string) =>
    dispatch({ type: TracksActionKind.SET_TITLE, payload: title });
  const setSort = (sortBy: string | null, sortOrder: 'asc' | 'desc' | null) =>
    dispatch({
      type: TracksActionKind.SET_SORT,
      payload: { sortBy, sortOrder },
    });

  return {
    state,
    setPage,
    setLimit,
    setTitle,
    setSort,
  };
};

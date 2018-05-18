import axios from 'axios';
import qs from 'qs';
import { 
	FETCHING_DATA_BOOK,
	FETCHING_DATA_BOOK_SUCCESS,
	FETCHING_DATA_BOOK_FAILURE
} from '../constants/ActionTypes';
import { API_KEY, BOOK_SEARCH } from '../constants/Configs';

export const fetchingData = () => {
  return {
    type: FETCHING_DATA_BOOK
  }
}

export const fetchingDataSuccess = (data) => {
  return {
    type: FETCHING_DATA_BOOK_SUCCESS,
    data,
  }
}

export const fetchingDataFailure = (data) => {
  return {
    type: FETCHING_DATA_BOOK_FAILURE,
    data
  }
}

export const fetcingDataBook = (list, newOffset, callback) => {
  return (dispatch, getState) => {
    const { items, offset } = getState().book;
    dispatch(fetchingData());
    const params = { 
      'api-key': API_KEY,
      'list': list === 'ebook' ? 'e-book-fiction' : 'hardcover-fiction',
      'offset': newOffset,
    };
    axios.get(`${BOOK_SEARCH}${qs.stringify(params)}`)
    .then((result) => {
      if (result.data.status === 'OK') {
        const newItems = result.data.results;
        dispatch(fetchingDataSuccess({
          items: newItems.length > 0 ? newItems : items,
          offset: newItems.length > 0 ? newOffset : offset
        }));
      }
      if (callback) { callback(); }
    })
    .catch((error) => {
      dispatch(fetchingDataFailure(error))
      console.log(error);
      if (callback) { callback(); }
    });
  }
}
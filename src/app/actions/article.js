import axios from 'axios';
import qs from 'qs';
import { 
	FETCHING_DATA_ARTICLE,
	FETCHING_DATA_ARTICLE_SUCCESS,
	FETCHING_DATA_ARTICLE_FAILURE
} from '../constants/ActionTypes';
import { API_KEY, ARTICLE_SEARCH } from '../constants/Configs';

export const fetchingData = () => {
  return {
    type: FETCHING_DATA_ARTICLE
  }
}

export const fetchingDataSuccess = (data) => {
  return {
    type: FETCHING_DATA_ARTICLE_SUCCESS,
    data,
  }
}

export const fetchingDataFailure = (data) => {
  return {
    type: FETCHING_DATA_ARTICLE_FAILURE,
    data
  }
}

export const fetcingDataArticle = (keyword, page, sort, callback) => {
  return (dispatch) => {
    dispatch(fetchingData());
    const params = { 
      'api-key': API_KEY,
      'page': page,
      'sort': sort === 'new' ? 'newest' : 'oldest'
    };
    if (keyword !== '') { params['q'] = keyword }
    axios.get(`${ARTICLE_SEARCH}${qs.stringify(params)}`)
    .then((result) => {
      if (result.data.status === 'OK') {
        const items = result.data.response.docs;
        dispatch(fetchingDataSuccess({
          items: items,
          page: page
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
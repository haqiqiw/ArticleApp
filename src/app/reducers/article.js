import { 
  FETCHING_DATA_ARTICLE,
  FETCHING_DATA_ARTICLE_FAILURE,
  FETCHING_DATA_ARTICLE_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  items: [],
  page: 0,
  isLoading: false
}

export default function article(state = initialState, action) {
  
  switch (action.type) {
    case FETCHING_DATA_ARTICLE:
      return {
        ...state,
        isLoading: true
      }
    case FETCHING_DATA_ARTICLE_SUCCESS:
      const { items = [] } = action.data;
      let list = [];
      if (action.data.page == 0) {
        list = [...items]
      } else {
        list = [...state.items, ...items]
      }
      return {
        ...state,
        isLoading: false,
        items: list,
        page: action.data.page
      }
    case FETCHING_DATA_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.data.error
      } 
    default:
      return state
  }
}
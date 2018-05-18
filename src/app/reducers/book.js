import { 
  FETCHING_DATA_BOOK,
  FETCHING_DATA_BOOK_FAILURE,
  FETCHING_DATA_BOOK_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  items: [],
  offset: 0,
  isLoading: false
}

export default function book(state = initialState, action) {
  
  switch (action.type) {
    case FETCHING_DATA_BOOK:
      return {
        ...state,
        isLoading: true
      }
    case FETCHING_DATA_BOOK_SUCCESS:
      const { items = [] } = action.data;
      let list = [];
      if (action.data.offset == 0) {
        list = [...items]
      } else {
        list = [...state.items, ...items]
      }
      return {
        ...state,
        isLoading: false,
        items: list,
        offset: action.data.offset
      }
    case FETCHING_DATA_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.data.error
      } 
    default:
      return state
  }
}
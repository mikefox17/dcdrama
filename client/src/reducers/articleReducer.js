import uuid from "uuid";
import {
  GET_ARTICLES,
  ADD_ARTICLES,
  DELETE_ARTICLES,
  ARTICLES_LOADING,
  SAVE_ARTICLES
} from "../actions/types";

const initialState = {
  articles: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false
      };
    case DELETE_ARTICLES:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        )
      };
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [action.payload, ...state.articles]
      };
    case ARTICLES_LOADING:
      return {
        ...state,
        loading: true
      };
    case SAVE_ARTICLES:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id === action.payload
        )
      };
    default:
      return state;
  }
}

import axios from "axios";
import {
  GET_ARTICLES,
  ADD_ARTICLES,
  DELETE_ARTICLES,
  ARTICLES_LOADING,
  SCRAPE_ARTICLES,
  SAVE_ARTICLES
} from "./types";
import ResultArticle from "../components/ResultArticle";

export const getArticles = () => dispatch => {
  dispatch(setArticlesLoading());
  axios.get("api/articles").then(res =>
    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    })
  );
};

export const scrapeArticles = () => dispatch => {
  axios.get("/api/articles/scrape").then(window.location.reload());
};

export const deleteArticles = () => {
  return {
    type: DELETE_ARTICLES
  };
};

export const addArticles = article => {
  return {
    type: ADD_ARTICLES,
    payload: article
  };
};
export const setArticlesLoading = () => {
  return {
    type: ARTICLES_LOADING
  };
};

export const saveArticle = id => dispatch => {
  axios.post("/" + id).then(res =>
    dispatch({
      type: SAVE_ARTICLES,
      payload: res.data
    })
  );
};

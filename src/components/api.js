import axios from 'axios';

export const fetchImage = async (page, perPage, nextQuery) => {
  const url = `https://pixabay.com/api/`;
  const API_KEY = `key=29432031-54944c319385602ed128077f3`;
  const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  return axios.get(`${url}?${API_KEY}&q=${nextQuery}&${urlOptions}`);
};

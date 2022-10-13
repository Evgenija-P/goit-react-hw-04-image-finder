import axios from 'axios';

export const fetchImage = async (page, query) => {
  const url = `https://pixabay.com/api/`;
  const API_KEY = `key=29432031-54944c319385602ed128077f3`;
  const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  return axios.get(`${url}?${API_KEY}&q=${query}&${urlOptions}`);
};

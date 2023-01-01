import axios from 'axios';
const API_KEY = '31732427-bb24441bdd1666c8e09d7ceac';

const getImage = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    key: API_KEY,
    per_page: '15',
  },
});

export const axiosGetImage = (query, page = 1) => {
  const res = getImage.get(`?q=${query}&page=${page}`);
  return res;
};

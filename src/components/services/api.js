import axios from 'axios';

const API_KEY = '25768905-c1ae5571e78baab059b11338b';

export const onFetchImg = async query => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
};

import {
  ImagesResponseData,
} from '@/interfaces/gallery';
import axios, { AxiosResponse } from 'axios';

const fetchImages = async (): Promise<AxiosResponse<ImagesResponseData[], unknown>> => axios
  .get(
    'https://agencyanalytics-api.vercel.app/images.json'
  );

export default { fetchImages };

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.aiven.io/v1',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface ICloudItem {
  cloud_description: string
  cloud_name: string,
  geo_latitude: number,
  geo_longitude: number,
  geo_region: string,
}

export const getClouds = async () => {
  const response = await instance.get('/clouds')
  return response.data.clouds
}

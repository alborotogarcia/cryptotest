import { CryptoAsset } from '../types'
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.coincap.io/v2/'
});

const intervals = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'] // rollout avg time
// const startEnd= [] start=UNIXtime&end=UNIXtime

interface ServerData {
    assetData: CryptoAsset[]
    timestamp: String
  }

// export const getAssets = () => api.get<ServerData>('/assets').then(res => res.data);
export const getAssets = () => api.get('/assets').then(res => res.data?.data || []);

export const getAsset = (id: string) => api.get(`/assets/${id}`).then(res => res.data);
export const getAssetHistory = (id: string) => api.get(`/assets/${id}/history?interval=d1`).then(res => res.data);
// const getAssets = () => api.get('/assets').then(res => res.data);

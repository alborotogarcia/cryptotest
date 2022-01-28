import React from 'react';
import {useQuery} from 'react-query';
import * as api from './marketApi';
import { CryptoAsset } from '../types'

interface Props {
  cryptoAsset: CryptoAsset;
}

export default function Assets(): JSX.Element {
  const { data } = useQuery<CryptoAsset[]>('assets',api.getAssets);
  // const assets = data.data?.data || [];
  console.log(data)
  return (
    <div>
      <ul>{data?.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  )
}

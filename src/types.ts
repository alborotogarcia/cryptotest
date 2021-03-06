export interface CryptoNew{
    id: number;
    kind: string;
    published_at: string;
    domain: string;
    title: string;
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
    comments: number;
    sourceUrl: string;
    SHIB?: boolean;
    ETH?: boolean;
    BTC?: boolean;
    MATIC?: boolean;
    USDT?: boolean;
    DOGE?: boolean;
    AAVE?: boolean;
    SOL?: boolean;
    sentiment?: string;
}
export interface CryptoAsset 
{
    id: string;
    rank: number;
    symbol: string;
    name: string;
    supply: number;
    maxSupply: number;
    marketCapUsd: number;
    volumeUsd24Hr: number;
    priceUsd: number;
    changePercent24Hr: number;
    vwap24Hr: number;
    explorer: number;
  }

export interface IUser {
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    username: string;
    auth?: boolean;
    token?: string;
    __v: number;
    _id: string;
}

export const initialUser = {
    googleId: '',
    twitterId: '',
    githubId: '',
    username: '',
    auth: false,
    token: '',
    __v: -1,
    _id: ''
}
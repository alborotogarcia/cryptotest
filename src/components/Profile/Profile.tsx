import jwt from 'jwt-decode';
export interface tokenContent {
    username: string;
    sub: number;
    providerid: string;
    iat: number,
    exp: number,
}

export const Profile = () => {

    const token = window.localStorage.getItem('token');
    
    const data = {} as tokenContent; 
    if (token){
        data.username = (jwt(token) as tokenContent).username;
    }
    // if token 
    
    return <>
        <h1>SUPPP
            {data?.username}
        </h1>
    </>
}
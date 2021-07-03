const env = process.env.REACT_APP_ENV;

let domain = 'http://localhost:8000';

if (env === 'test') {
    domain = 'http://localhost:8010';
}

export const apiURL = domain;
export const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

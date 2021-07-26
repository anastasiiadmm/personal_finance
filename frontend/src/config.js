const env = process.env.REACT_APP_ENV;

let domain = 'localhost:8000';

if (env === 'test') {
    domain = 'localhost:8010';
} else if (env === 'production') {
    domain = '178.62.206.204:8000';
}

export const apiURL = 'http://' + domain;
export const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

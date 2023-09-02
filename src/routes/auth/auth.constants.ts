const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION ?? '48h';
const tokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION ?? '24h';

const refreshSecret = process.env.JWT_SECRET_REFRESH_KEY;
const tokenSecret = process.env.JWT_SECRET_KEY;

export { refreshTokenExpiration, tokenExpiration, refreshSecret, tokenSecret };

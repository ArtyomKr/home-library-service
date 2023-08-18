import { sign } from 'jsonwebtoken';

const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION ?? '12h';
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION ?? '48h';

export function generateAccessToken(id, login) {
  return sign({ userId: id, login }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: accessTokenExpiration,
  });
}

export function generateRefreshToken(id, login) {
  return sign(
    { userId: id, login },
    process.env.JWT_SECRET_REFRESH_KEY as string,
    {
      expiresIn: refreshTokenExpiration,
    },
  );
}

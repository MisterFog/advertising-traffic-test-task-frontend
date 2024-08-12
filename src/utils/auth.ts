const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return true;
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
};

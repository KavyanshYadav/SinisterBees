export const generateToken = (payload) => {
  const secretKey = 'your_jwt_secret_key';
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
};

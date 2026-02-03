const sendToken = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',

    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

export default sendToken;

import express from 'express';

const PORT = 4000;
const app = express();

// request
// response
// next
// -> express 에서 자동으로 해당 이벤트값을 넘여줌 ( req, res, next )
// MVC, controller == middleware

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === '/protected') {
    return res.send('<h1>Not Allowed</h1>');
  }
  console.log('Allowed...');
  next();
};

const handleHome = (req, res) => {
  return res.send('I like middleware');
};

const handleProtected = (req, res) => {
  return res.send('Welcome to private lounge');
};

app.use(logger); // 모든 route 에서 use 를 사용 ( as global middleware ) 순서 중요
app.use(privateMiddleware);
app.get('/', handleHome); // get request to root path
app.get('/protected', handleProtected);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);

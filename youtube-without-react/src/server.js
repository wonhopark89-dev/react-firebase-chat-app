import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();
const logger = morgan('combined');

// request
// response
// next
// -> express 에서 자동으로 해당 이벤트값을 넘여줌 ( req, res, next )
// MVC, controller == middleware

const handleHome = (req, res) => {
  return res.send('I like middleware');
};

const handleProtected = (req, res) => {
  return res.send('Welcome to private lounge');
};

// 모든 route 에서 use 를 사용 ( as global middleware ) 순서 중요
app.use(logger);
app.get('/', handleHome); // get request to root path
app.get('/protected', handleProtected);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);

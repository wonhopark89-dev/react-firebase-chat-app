import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();
const logger = morgan('tiny');

const globalRouter = express.Router();
const handleHome = (req, res) => res.send('Home');
globalRouter.get('/', handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send('Edit User');
userRouter.get('/edit', handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send('Watch Video');
videoRouter.get('/watch', handleWatchVideo);

// request
// response
// next
// -> express 에서 자동으로 해당 이벤트값을 넘여줌 ( req, res, next )
// MVC, controller == middleware

// 모든 route 에서 use 를 사용 ( as global middleware ) 순서 중요
app.use(logger);
app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

// app.get('/', handleHome); // get request to root path

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);

import express from 'express';

const PORT = 4000;
const app = express();

// request
// response
// -> express 에서 자동으로 해당 이벤트값을 넘여줌

app.get('/', (req, res) => {
  console.log(req);
  return res.send('response hi'); // res.end();
}); // get request to root path

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);

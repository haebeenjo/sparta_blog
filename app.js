const express = require('express');
const app = express();
const port = 3000;

const portsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const connect = require("./schemas");
connect();

app.use(express.json());

app.use("/posts", portsRouter);
app.use("/comments", commentsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
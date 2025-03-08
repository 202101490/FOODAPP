const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const mongodb=require("./db")
mongodb();


app.use(cors({ origin: "http://localhost:3000" }));
// app.use((req,res,next)=>
// {
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,  Content-Type, Accept"
//   );
//   next();
// }) <-- in place of cors


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/Displaydata"));
app.use('/api',require("./Routes/OrderData"));
app.use('/api',require("./Routes/MyProfile"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
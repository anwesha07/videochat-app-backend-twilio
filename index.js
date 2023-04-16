const express = require('express');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const router = require("./routes");
app.use(express.json())


app.get('/', (req, res) => {
    console.log("ok!");
    res.send({result: "ok"});
});

app.use('/api', router);






app.listen(8000, () => {
    console.log("server started at port 8000");
})
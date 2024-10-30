import express from "express"

const app = express();
const port = 3030;

app.use(express.json());


app.listen(port, () => {
    console.log(`Started Tyria Tracker backend on port ${port}`);
})
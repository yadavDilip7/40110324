import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    let arr = [];
    let cnt = 0;
    urls.forEach(async (url) => {
        try {
            const {data} = await axios.get(url);
            arr.push(...data.numbers)
            cnt++;
            if(cnt == urls.length) {
                const removeDupAndSort = (a) => {
                    let unique = [];
                    a.forEach(element => {
                        if(!unique.includes(element)) {
                            unique.push(element);
                        }
                    })
                    unique.sort((a, b) => a - b);
                    return unique;
                }
                arr = removeDupAndSort(arr);
                // console.log(arr);
                res.send(arr);
            }
        } catch (error) {
            console.log(error.message);
        }
    })
})

const PORT = 8008;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
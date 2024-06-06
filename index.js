const express = require("express");
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

const mock_database = [
    {"id": 1, "item": "Burrito", "price": 8.99, "calories": 600},
    {"id": 2, "item": "Bowl", "price": 7.49, "calories": 450},
    {"id": 3, "item": "Taco", "price": 2.99, "calories": 250}
]

app.get("/api/data", (req, res) => {
    res.send(mock_database)
})

app.post("/api/data", (req, res) => {
    const data = req.body;
    mock_database.push(data);
    res.send(`Received: ${JSON.stringify(data)}, current database: ${JSON.stringify(mock_database)}`)
})

app.put("/api/data/:id", (req, res) => {
    const [id, data] = [parseInt(req.params.id),  req.body];
    const index = mock_database.indexOf(mock_database.find(element => element.id === id))

    if (index === -1){
        res.send('id not found')
        return
    }

    mock_database[index] = data
    res.send(`Received: updated index ${index} with ${JSON.stringify(data)}, current database: ${JSON.stringify(mock_database)}`)
})

app.delete("/api/data/:id", (req, res) => {
    console.log("waiting on conformation: 5 second wait")
    setTimeout(() => {
        const id = parseInt(req.params.id);
        const index = mock_database.indexOf(mock_database.find(element => element.id === id))
        delete mock_database[index];
        res.send(`Removed: index ${index} in ${JSON.stringify(mock_database)}`)
    }, 5000)
})

const port = 4000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
import express from 'express'

const app = express()
const port = 3003

app.get('/', (req, res) => {
    const a=5
    if(a>6){
        res.send(`a равна ${a}`)
    }
    res.send('Hello World!!!!')
})

app.listen(port, () => {
    console.log(`My App start to port: ${port}`)
})
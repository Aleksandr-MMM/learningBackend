import express from 'express'

const app = express()
const port = 3001

let students =[
    {
        id: 1,
        name:'Andrei'
    },
    {
        id: 2,
        name:'Aleksander'
    },
    {
        id: 3,
        name:'Vica'
    },
]
app.get('/', (req, res) => {
    const a=5
    if(a>6){
        res.send(`a равна ${a}`)
    }
    res.send('Hello World!!!!')
})

app.get('/students', (req, res) => {

    res.send(students)
})
app.listen(port, () => {
    console.log(`My App start to port: ${port}`)
})
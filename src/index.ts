import express from 'express'

export const app = express()
const port = 3001
const expressMiddleware = express.json()
app.use(expressMiddleware)

const statusCode ={
    OK_200: 200,
    Created_201:201,
    No_Content_204:204,
    Bad_Request_400:400,
    Not_Found_404:404,

}

export let db ={
    students :[
        {id: 1, name:'Andrei'},
        {id: 2, name:'Aleksander'},
        {id: 3, name:'Vica'},
    ],
    lesson :[
        {id: 1, type:'Match'},
        {id: 2, type:'English'},
        {id: 3, type:'Physics'},
    ]
}


app.get('/', (req, res) => {
    res.json('Hello World!!!!')
})

app.get('/students', (req, res) => {
    let foundStudents = db.students;
    if(req.query.name)
    {
        foundStudents=foundStudents.filter(s=>s.name.indexOf(req.query.name as string)>-1)
    }

    res.json(foundStudents)
})

app.post('/students', (req, res) => {

    !req.body.name?
        res.sendStatus(statusCode.Bad_Request_400):
        res.status(statusCode.Created_201)
            res.json( {
                id: +new Date(),
                name: req.body.name})
})



app.get('/lesson', (req, res) => {
    res.json(db.lesson)
})
app.get('/lesson/:id', (req, res) => {

    const foundLesson=db.lesson.find(les=>les.id===+req.params.id)
    if(!foundLesson){
        res.sendStatus(statusCode.Not_Found_404)
        return
    }
    res.json(foundLesson)
})
app.delete('/lesson/:id', (req, res) => {

    const newLesson=db.lesson.filter(les=>les.id!==+req.params.id)
    newLesson.length!==db.lesson.length?
        res.sendStatus(statusCode.No_Content_204):
        res.sendStatus(statusCode.Not_Found_404)
})

app.delete("/__test__/data",(req,res)=>{
    db.students=[]
    db.lesson=[]
    res.sendStatus(statusCode.OK_200)
})
app.listen(port, () => {
    console.log(`My App start to port: ${port}`)
})

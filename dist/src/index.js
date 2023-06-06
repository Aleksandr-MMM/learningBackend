"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3001;
const expressMiddleware = express_1.default.json();
exports.app.use(expressMiddleware);
const statusCode = {
    OK_200: 200,
    Created_201: 201,
    No_Content_204: 204,
    Bad_Request_400: 400,
    Not_Found_404: 404,
};
exports.db = {
    students: [
        { id: 1, name: 'Andrei' },
        { id: 2, name: 'Aleksander' },
        { id: 3, name: 'Vica' },
    ],
    lesson: [
        { id: 1, type: 'Match' },
        { id: 2, type: 'English' },
        { id: 3, type: 'Physics' },
    ]
};
exports.app.get('/', (req, res) => {
    res.json('Hello World!!!!');
});
exports.app.get('/students', (req, res) => {
    let foundStudents = exports.db.students;
    if (req.query.name) {
        foundStudents = foundStudents.filter(s => s.name.indexOf(req.query.name) > -1);
    }
    res.json(foundStudents);
});
exports.app.post('/students', (req, res) => {
    !req.body.name ?
        res.sendStatus(statusCode.Bad_Request_400) :
        res.status(statusCode.Created_201);
    res.json({
        id: +new Date(),
        name: req.body.name
    });
});
exports.app.get('/lesson', (req, res) => {
    res.json(exports.db.lesson);
});
exports.app.get('/lesson/:id', (req, res) => {
    const foundLesson = exports.db.lesson.find(les => les.id === +req.params.id);
    if (!foundLesson) {
        res.sendStatus(statusCode.Not_Found_404);
        return;
    }
    res.json(foundLesson);
});
exports.app.delete('/lesson/:id', (req, res) => {
    const newLesson = exports.db.lesson.filter(les => les.id !== +req.params.id);
    newLesson.length !== exports.db.lesson.length ?
        res.sendStatus(statusCode.No_Content_204) :
        res.sendStatus(statusCode.Not_Found_404);
});
exports.app.delete("/__test__/data", (req, res) => {
    exports.db.students = [];
    exports.db.lesson = [];
    res.sendStatus(statusCode.OK_200);
});
exports.app.listen(port, () => {
    console.log(`My App start to port: ${port}`);
});

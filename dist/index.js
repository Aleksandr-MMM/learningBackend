"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
let students = [
    {
        id: 1,
        name: 'Andrei'
    },
    {
        id: 2,
        name: 'Aleksander'
    },
    {
        id: 3,
        name: 'Vica'
    },
];
app.get('/', (req, res) => {
    const a = 5;
    if (a > 6) {
        res.send(`a равна ${a}`);
    }
    res.send('Hello World!!!!');
});
app.get('/students', (req, res) => {
    res.send(students);
});
app.listen(port, () => {
    console.log(`My App start to port: ${port}`);
});

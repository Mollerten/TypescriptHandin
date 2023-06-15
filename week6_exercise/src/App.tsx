import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import morgan from 'morgan';
import log4js from 'log4js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DATA_FILE = process.env.DATA_FILE;

app.use(bodyParser.json());
app.use(morgan('combined'));
log4js.configure({
    appenders: { file: { type: 'file', filename: 'server.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } },
});

const logger = log4js.getLogger('Server');

interface Person {
    id: string;
    name: string;
    age: number;
}

// GET /people - Get a list of people
app.get('/people', (req: Request, res: Response) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            res.json(people);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// GET /people/:id - Get a single person
app.get('/people/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            const person = people.find((p) => p.id === id);

            if (!person) {
                res.status(404).json({ error: 'Person not found' });
                return;
            }

            res.json(person);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// POST /people - Create a new person
app.post('/people', (req: Request, res: Response) => {
    const newPerson: Person = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            const id = generateId();
            const person: Person = { id, ...newPerson };
            people.push(person);

            fs.writeFile(DATA_FILE, JSON.stringify(people), (err) => {
                if (err) {
                    logger.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.status(201).json(person);
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// PUT /people/:id - Update a person (entire object)
app.put('/people/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPerson: Person = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            const index = people.findIndex((p) => p.id === id);

            if (index === -1) {
                res.status(404).json({ error: 'Person not found' });
                return;
            }

            people[index] = { ...updatedPerson, id };

            fs.writeFile(DATA_FILE, JSON.stringify(people), (err) => {
                if (err) {
                    logger.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json(people[index]);
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// PATCH /people/:id - Update a person (partial object)
app.patch('/people/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFields = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            const index = people.findIndex((p) => p.id === id);

            if (index === -1) {
                res.status(404).json({ error: 'Person not found' });
                return;
            }

            people[index] = { ...people[index], ...updatedFields };

            fs.writeFile(DATA_FILE, JSON.stringify(people), (err) => {
                if (err) {
                    logger.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json(people[index]);
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// DELETE /people/:id - Delete a person
app.delete('/people/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            logger.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const people: Person[] = JSON.parse(data);
            const index = people.findIndex((p) => p.id === id);

            if (index === -1) {
                res.status(404).json({ error: 'Person not found' });
                return;
            }

            const deletedPerson = people.splice(index, 1)[0];

            fs.writeFile(DATA_FILE, JSON.stringify(people), (err) => {
                if (err) {
                    logger.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json(deletedPerson);
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Generate a random ID (in this case, a simple timestamp-based ID)
function generateId(): string {
    return Date.now().toString();
}

export default app;

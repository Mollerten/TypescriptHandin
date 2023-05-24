import express, { Request, Response } from 'express';
import log4js from 'log4js';
import Car from '../models/carModel';

const logger = log4js.getLogger();
logger.level = 'error';

const router = express.Router();

// GET /api/v1/cars - returns all cars
router.get('/api/v1/cars', async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/cars/:id - returns a single car
router.get('/api/v1/cars/:id', async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/cars - creates a new car
router.post('/api/v1/cars', async (req: Request, res: Response) => {
  try {
    const newCar = new Car({
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      color: req.body.color,
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/v1/cars/:id - updates a car (partially)
router.patch('/api/v1/cars/:id', async (req: Request, res: Response) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/v1/cars/:id - deletes a car
router.delete('/api/v1/cars/:id', async (req: Request, res: Response) => {
  try {
    const car = await Car.findByIdAndRemove(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

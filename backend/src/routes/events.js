const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Create new event
router.post('/', auth, async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            organizer: req.user._id
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'username');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'username')
            .populate('participants', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update event
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        await event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Join event
router.post('/:id/join', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        if (event.participants.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already joined this event' });
        }
        
        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ message: 'Event is full' });
        }
        
        event.participants.push(req.user._id);
        await event.save();
        res.json({ message: 'Joined event successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 
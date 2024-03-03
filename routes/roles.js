const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const getRole = require('../middleware/getRole');
const authenticationToken = require('../middleware/authenticationToken');


router.get('/', authenticationToken, async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', authenticationToken, getRole, async (req, res) => {
    res.send(res.role);
});


router.post('/', authenticationToken, async (req, res) => {

    const role = new Role({
        name: req.body.name
    });

    role.save()
        .then(data => { res.json(data) })
        .catch(err => res.json({ message: err }))
});

router.patch('/:id', authenticationToken, getRole, async (req, res) => {

    if (req.body.name != null) {
        res.role.name = req.body.name;
    }
    try {
        const updatedRole = await res.role.save();
        res.json(updatedRole);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', authenticationToken, getRole, async (req, res) => {
    try {
        await res.role.deleteOne();
        res.json(res.role._id)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Permission = require('../models/permission');
const getPermission = require('../middleware/getPermission');
const authenticationToken = require('../middleware/authenticationToken');
 
router.get('/', authenticationToken, async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', authenticationToken, getPermission, async (req, res) => {
    res.send(res.permission);
});


router.post('/', authenticationToken, async (req, res) => {

    const permission = new Permission({
        name: req.body.name,
        roleId: req.body.roleId,
        userId: req.body.userId
    });

    permission.save()
        .then(data => { res.json(data) })
        .catch(err => res.json({ message: err }))
});


router.delete('/:id', authenticationToken, getPermission, async (req, res) => {
    try {
        await res.permission.deleteOne();
        res.json(res.permission._id)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
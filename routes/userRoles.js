const express = require('express');
const router = express.Router();
const UserRole = require('../models/userRole');
const User = require('../models/user');
const Role = require('../models/role');

// const getUserRole = require('../middleware/getUserRole');
const authenticationToken = require('../middleware/authenticationToken');


router.get('/deneme/', authenticationToken, async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $lookup: {
                    from: 'UserRoles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'roleDetails'
                }
            },
            {
                $unwind: '$roleDetails'
            },
            {
                $lookup: {
                    from: 'Roles',
                    localField: 'roleDetails.roleId',
                    foreignField: '_id',
                    as: 'roleDetails.roleInfo'
                }
            },
            {
                $unwind: '$roleDetails.roleInfo'
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    roles: '$roleDetails.roleInfo',
                    roleId: '$roleDetails.roleInfo.id'
                }
            }
        ]);

        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// router.get('/:id', authenticationToken, getUserRole, async (req, res) => {
//     res.send(res.userRole);
// });


router.post('/', authenticationToken, async (req, res) => {

    const userRole = new UserRole({
        userId: req.body.userId,
        roleId: req.body.roleId
    });

    userRole.save()
        .then(data => { res.json(data) })
        .catch(err => res.json({ message: err }))
});

// router.delete('/:id', authenticationToken, getUserRole, async (req, res) => {
//     try {
//         await res.userRole.deleteOne();
//         res.json(res.userRole._id)
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;
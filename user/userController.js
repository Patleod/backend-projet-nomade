var userModel = require('./userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            var i = 0;
            var usrs = [];
            users.forEach(function (element) {
            var user = new userModel({
                connection: element.connection,
                email: element.email,
                name: element.name ? element.name : element.email,
                img: element.picture?element.picture:null,
                role: element.role?element.role:[],
                mineur: element.mineur?element.mineur:null,
                nonAccompagne: element.nonAccompagne?element.nonAccompagne:null,
                pays: element.pays? element.pays:null,
                langue: element.langue?element.langue:(element.locale?element.locale:null),
            });           
                usrs.push(user);
                //console.log( element.family_name?element.family_name:null);
                i++;
                if (i === users.length) {
                     return res.json(usrs);
                }
            }, this);
           
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({
            _id: id
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },
    showByEmal: function (req, res) {
        var email = req.body.params.email;
        userModel.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user._id);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            connection: req.body.connection,
            email: req.body.email,
            name: req.body.name,
            img: req.body.picture,
            password: req.body.password,
            role: req.body.role,
            mineur: req.body.mineur,
            nonAccompagne: req.body.nonAccompagne,
            pays: req.body.pays,
            langue: req.body.langue,
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({
            _id: id
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.connection = req.body.connection ? req.body.connection : user.connection;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;
            user.role = req.body.role ? req.body.role : user.role;
            user.mineur = req.body.mineur ? req.body.mineur : user.mineur;
            user.nonAccompagne = req.body.nonAccompagne ? req.body.nonAccompagne : user.nonAccompagne;
            user.pays = req.body.pays ? req.body.pays : user.pays;
            user.langue = req.body.langue ? req.body.langue : user.langue;


            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
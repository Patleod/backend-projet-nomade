var associationModel = require('./associationModel.js');

/**
 * associationController.js
 *
 * @description :: Server-side logic for managing associations.
 */
module.exports = {

    /**
     * associationController.list()
     */
    list: function (req, res) {
        associationModel.find(function (err, associations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting association.',
                    error: err
                });
            }
            return res.json(associations);
        });
    },

    /**
     * associationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        associationModel.findOne({_id: id}, function (err, association) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting association.',
                    error: err
                });
            }
            if (!association) {
                return res.status(404).json({
                    message: 'No such association'
                });
            }
            return res.json(association);
        });
    },

    /**
     * associationController.create()
     */
    create: function (req, res) {
        var association = new associationModel({
             _id:null,
			name : req.body.name,
			adress : req.body.adress,
			email : req.body.email,
			tel : req.body.tel,
			schedule : req.body.schedule,
			description : req.body.description,
			website : req.body.website,
			validate : req.body.validate,
			members : req.body.members,
			manager : req.body.manager,
			followers : req.body.followers
        });

        association.save(function (err, association) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating association',
                    error: err
                });
            }
            return res.status(201).json(association);
        });
    },

    /**
     * associationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        associationModel.findOne({_id: id}, function (err, association) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting association',
                    error: err
                });
            }
            if (!association) {
                return res.status(404).json({
                    message: 'No such association'
                });
            }

            association.name = req.body.name ? req.body.name : association.name;
			association.adress = req.body.adress ? req.body.adress : association.adress;
			association.email = req.body.email ? req.body.email : association.email;
			association.tel = req.body.tel ? req.body.tel : association.tel;
			association.schedule = req.body.schedule ? req.body.schedule : association.schedule;
			association.description = req.body.description ? req.body.description : association.description;
			association.website = req.body.website ? req.body.website : association.website;
			association.validate = req.body.validate ? req.body.validate : association.validate;
			association.members = req.body.members ? req.body.members : association.members;
			association.manager = req.body.manager ? req.body.manager : association.manager;
			association.followers = req.body.followers ? req.body.followers : association.followers;
			
            association.save(function (err, association) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating association.',
                        error: err
                    });
                }

                return res.json(association);
            });
        });
    },

    /**
     * associationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        associationModel.findByIdAndRemove(id, function (err, association) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the association.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

var eventModel = require('./eventModel.js');
var userModel = require('../user/userModel.js');
var mongoose = require('mongoose');
/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

    /**
     * eventController.list()
     */
    list: function (req, res) {
        eventModel.find(function (err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }
            return res.json(events);
        });
    },

    /**
     * eventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        eventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }
            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }
            return res.json(event);
        });
    },

    /**
     * eventController.create()
     */
    create: function (req, res) {

        console.log("body",req.body.organisatorId);
        userModel.findOne({_id: req.body.organisatorId.toString()}, function (err, user) {
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
             console.log("user",user._id);
             
                var event = new eventModel({
                _id:null,
                name : req.body.name,
                description : req.body.description,
                date : req.body.date,
                eventType : 1,
                organisateur: user._id,
                participants:[]
                });
                //event.organisateur = user._id;
                event.participants.push(user._id);
                event.participants.push(user._id);
                console.log("evenet", event);
                event.save(function (err, ev) {
                    console.log(ev);
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating event',
                            error: err
                        });
                    }
                    console.log(ev);
                    return res.status(201).json(ev);
            
                });
            //return res.status(201).json(event);
        });
          /*  var event = new eventModel({
                name : req.body.name,
                description : req.body.description,
                date : req.body.date,
                eventType : 1,
                organisateur : mongoose.Types.ObjectId(req.body.organisatorId),
                participants : [mongoose.Types.ObjectId(req.body.organisatorId)]
            });
            console.log(event);
        event.save( (err, event) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating event',
                    error: err
                });
            }
            return res.status(201).json(event);
      
        });*/

    },

    /**
     * eventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        eventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event',
                    error: err
                });
            }
            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            event.name = req.body.name ? req.body.name : event.name;
			event.description = req.body.description ? req.body.description : event.description;
			event.date = req.body.date ? req.body.date : event.date;
			event.eventType = req.body.eventType ? req.body.eventType : event.eventType;
			event.organisateur = req.body.organisateur ? req.body.organisateur : event.organisateur;
			event.participants = req.body.participants ? req.body.participants : event.participants;
			
            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating event.',
                        error: err
                    });
                }

                return res.json(event);
            });
        });
    },

    /**
     * eventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        eventModel.findByIdAndRemove(id, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the event.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

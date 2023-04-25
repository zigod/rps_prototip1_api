var UsersModel = require('../models/usersModel.js');

/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {

    /**
     * usersController.list()
     */
    list: function (req, res) {
        UsersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }

            return res.json(userss);
        });
    },

    /**
     * usersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UsersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }

            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            return res.json(users);
        });
    },

    /**
     * usersController.create()
     */
    create: function (req, res) {
        var user = new UsersModel({
			username : req.body.username,
			password : req.body.password,
			points : req.body.points
        });
        
        user.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating users',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UsersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }

            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            users.username = req.body.username ? req.body.username : users.username;
			users.password = req.body.password ? req.body.password : users.password;
			users.points = req.body.points ? req.body.points : users.points;
			
            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating users.',
                        error: err
                    });
                }

                return res.json(users);
            });
        });
    },

    /**
     * usersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UsersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the users.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    login: function (req, res) {
        console.log(req.body.username)
        try {
            UsersModel.findOne({ username:req.body.username }, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'User not found!.',
                        error: err
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: 'No such users'
                    });
                }

                return res.json(user);
            });
            
            //const user = await UsersModel.findOne({ username: req.body.username });
            //console.log(user ," This is user");
           // //if (user) {
            //  //check if password matches
            //  const result = await bcrypt.compare(req.body.password, user.password);
            //  if (result) {
            //    // sign token and send it in response
            //    res.json({ token });
            //  } else {
            //    res.status(400).json({ error: "password doesn't match" });
            //  }
            //} else {
            //  res.status(400).json({ error: "User doesn't exist" });
            //}
          } catch (error) {
            res.status(400).json({ error });
          }
    },    
};

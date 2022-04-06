const db = require('../src/database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    listAll: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: ['name', 'email']
            });
            res.json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    getOne: async (req, res) => {
        
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: ['name', 'email']
            });

            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            return res.json({
                success: true,
                data: user
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    accountConfirm: async (req, res) => {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        try {
            const user = await db.User.findOne({
                where: {
                    email: decoded.email
                }
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid token'
                });
            }

            user.confirmed = true;
            user.token = null;
            await user.save();

            res.status(200).json({
                success: true,
                message: 'Account confirmed'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    register: async (req, res) => {

        const {name, email, password} = req.body;

        try {
            const userVerify = await db.User.findOne({
                where: {
                    email
                }
            });

            if (!userVerify){
                const user = await db.User.create({
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    token: jwt.sign({email}, process.env.JWT_SECRET),
                });

                res.status(200).json({
                    success: true,
                    message: 'User created successfully'
                });
            } else {
                res.status(409).json({
                    success: false,
                    message: 'User already exists'
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;

        try {
            const user = await db.User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User or password incorrect'
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    success: false,
                    message: 'User or password incorrect'
                });
            }

            if (!user.confirmed) {
                return res.status(401).json({
                    success: false,
                    message: 'Account not confirmed'
                });
            }

            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token: jwt.sign({email}, process.env.JWT_SECRET),
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    olvidePassword: async (req, res) => {
        const {email} = req.body;
        try {
            const user = await db.User.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            if(user && user.confirmed) {
                user.token = jwt.sign({email}, process.env.JWT_SECRET);
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: 'Reset email sent'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Account not confirmed'
            });

        } catch(error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    tokenValidator: async (req, res) => {
        const {token} = req.params;
        const tokenValidate = await db.User.findOne({where: {token}});

        if(tokenValidate) {
            return res.status(200).json({ 
                success: true,
                message: 'Token valid'
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Token invalid'
            });
        }
    },
    passwordReset: async (req, res) => {

        const {token} = req.params;
        const { password} = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        try {
            const user = await db.User.findOne({
                where: {
                    email: decoded.email
                }
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            user.password = bcrypt.hashSync(password, 10);
            user.token = null;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'Password reset successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    update: async (req, res) => {
        const {name, email} = req.body;
        const {id} = req.params;

        try {
            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            user.name = name;
            user.email = email;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'User updated successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    hardDelete: async (req, res) => {
        const {id} = req.params;

        try {
            const user = await db.User.findByPk(id, {
                paranoid: false
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            await db.User.destroy({
                where: {id},
                force: true
            });

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
    },
    softDelete: async (req, res) => {
        const {id} = req.params;

        try {
            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            user.destroy();
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
            
            
    },
};

module.exports = userController;
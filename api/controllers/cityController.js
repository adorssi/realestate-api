const db = require('../src/database/models');

const cityController = {
    listAll: async (req, res) => {
            
        try {
            const cities = await db.City.findAll();

            res.status(200).json({
                success: true,
                count: cities.length,
                data: cities
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    /* listOnlyWithProperties: async (req, res) => {
            
        try {
            const cities = await db.City.findAll({
                include: [{
                    association: 'properties',
                    required: true
                }]
            });

            res.status(200).json({
                success: true,
                count: cities.length,
                data: cities
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }, */
    getOne: async (req, res) => {
            
        const {id} = req.params;

        try {
            const city = await db.City.findByPk(id);
            
            if(city) {
                return res.status(200).json({
                    success: true,
                    data: city
                });
            }

            res.status(404).json({
                success: false,
                message: 'City not found'
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    add: async (req, res) => {
                
        const {name} = req.body;

        try {
            const city = await db.City.create({
                name
            });
            
            if(city) {
                return res.status(200).json({
                    success: true,
                    data: city
                });
            }

            res.status(404).json({
                success: false,
                message: 'City not found',
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    update: async (req, res) => {
            
        const {id} = req.params;
        const {name} = req.body;
        
        try {
            const city = await db.City.update({
                name
            }, {
                where: {
                    id
                }
            });
            
            if(city) {
                return res.status(200).json({
                    success: true,
                    message: 'The city has been updated',
                });
            }
        
            res.status(404).json({
                success: false,
                message: 'City not found'
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
        const city = await db.City.findByPk(id);

        if(city) {
            try {
                await db.City.destroy({
                    where: { id },
                    force: true
                });
                
                return res.status(200).json({
                    success: true,
                    message: 'The city has been deleted'
                });
                
            } catch (error) {
                res.status(500).json({
                success: false,
                message: error.message
            });
            }
        }
        res.status(404).json({
            success: false,
            message: 'City not found'
        });
    },
}

module.exports = cityController;
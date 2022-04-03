const db = require('../src/database/models');

const cityController = {
    listAll: async (req, res) => {
            
        try {
            const cities = await db.City.findAll();

            res.status(200).json({
                count: cities.length,
                data: cities
            })
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {
            
        const {id} = req.params;

        try {
            const city = await db.City.findByPk(id);
            
            if(city) {
                return res.status(200).json({
                    data: city
                });
            }

            res.status(404).json({
                result: false,
                message: 'City not found'
            });
            
        } catch (error) {
            console.log(error);
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
                    data: city
                });
            }

            res.status(404).json({
                result: false,
                message: 'City not found',
            });
            
        } catch (error) {
            console.log(error);
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
                    result: true,
                    message: 'The city has been updated',
                });
            }
        
            res.status(404).json({
                result: false,
                message: 'City not found'
            });
            
        } catch (error) {
            console.log(error);
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
                    result: true,
                    message: 'The city has been deleted'
                });
                
            } catch (error) {
                console.log(error);
            }
        }
        res.status(404).json({
            result: false,
            message: 'City not found'
        });
    },
}

module.exports = cityController;
const db = require('../src/database/models');

const propertyTypesController = {
    listAll: async (req, res) => {
            
        try {
            const type = await db.Type.findAll();

            res.status(200).json({
                count: type.length,
                data: type
            })
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {
            
        const {id} = req.params;

        try {
            const type = await db.Type.findByPk(id);
            
            if(type) {
                return res.status(200).json({
                    data: type
                });
            }

            res.status(404).json({
                result: false,
                message: 'Property type not found'
            });
            
        } catch (error) {
            console.log(error);
        }
    },
    add: async (req, res) => {
                
        const {name} = req.body;

        try {
            const type = await db.Type.create({
                name
            });
            
            if(type) {
                return res.status(200).json({
                    message: 'Property type created successfully',
                    data: type
                });
            }

            res.status(404).json({
                result: false,
                message: 'The property type could not be created',
            });
            
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
            
        const {id} = req.params;
        const {name} = req.body;
        
        try {
            const type = await db.Type.update({
                name
            }, {
                where: {
                    id
                }
            });
            
            if(type) {
                return res.status(200).json({
                    result: true,
                    message: 'The property type has been updated',
                });
            }
        
            res.status(404).json({
                result: false,
                message: 'Property type not found',
            });
            
        } catch (error) {
            console.log(error);
        }
    },
    hardDelete: async (req, res) => {
                
        const {id} = req.params;
        const type = await db.Type.findByPk(id);

        if(type) {
            try {
                await db.Type.destroy({
                    where: { id },
                    force: true
                });
                
                return res.status(200).json({
                    result: true,
                    message: 'The property type has been deleted'
                });
                
            } catch (error) {
                console.log(error);
            }
        }
        res.status(404).json({
            result: false,
            message: 'Property type not found'
        });
    },
}

module.exports = propertyTypesController;
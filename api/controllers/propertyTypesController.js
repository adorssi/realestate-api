const db = require('../src/database/models');

const propertyTypesController = {
    listAll: async (req, res) => {
            
        try {
            const type = await db.Type.findAll();

            res.status(200).json({
                success: true,
                count: type.length,
                data: type
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    getOne: async (req, res) => {
            
        const {id} = req.params;

        try {
            const type = await db.Type.findByPk(id);
            
            if(type) {
                return res.status(200).json({
                    success: true,
                    data: type
                });
            }

            res.status(404).json({
                success: false,
                message: 'Property type not found'
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
            const type = await db.Type.create({
                name
            });
            
            if(type) {
                return res.status(200).json({
                    success: true,
                    message: 'Property type created successfully',
                    data: type
                });
            }

            res.status(404).json({
                success: false,
                message: 'The property type could not be created',
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
            const type = await db.Type.update({
                name
            }, {
                where: {
                    id
                }
            });
            
            if(type) {
                return res.status(200).json({
                    success: true,
                    message: 'The property type has been updated',
                });
            }
        
            res.status(404).json({
                success: false,
                message: 'Property type not found',
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
        const type = await db.Type.findByPk(id);

        if(type) {
            try {
                await db.Type.destroy({
                    where: { id },
                    force: true
                });
                
                return res.status(200).json({
                    success: true,
                    message: 'The property type has been deleted'
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
            message: 'Property type not found'
        });
    },
}

module.exports = propertyTypesController;
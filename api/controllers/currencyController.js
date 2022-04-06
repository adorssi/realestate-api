const db = require('../src/database/models');

const currencyController = {
    listAll: async (req, res) => {
            
        try {
            const currency = await db.Currency.findAll();

            res.status(200).json({
                success: true,
                count: currency.length,
                data: currency
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
            const currency = await db.Currency.findByPk(id);
            
            if(currency) {
                return res.status(200).json({
                    success: true,
                    data: currency
                });
            }

            res.status(404).json({
                sucess: false,
                message: 'Currency not found'
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    add: async (req, res) => {
                
        const {name, symbol} = req.body;

        try {
            const currency = await db.Currency.create({
                name,
                symbol
            });
            
            if(currency) {
                return res.status(200).json({
                    success: true,
                    message: 'Currency created successfully',
                    data: currency
                });
            }

            res.status(404).json({
                success: false,
                message: 'The currency could not be created',
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
        const {name, symbol} = req.body;
        
        try {
            const currency = await db.Currency.update({
                name,
                symbol
            }, {
                where: {
                    id
                }
            });
            
            if(currency) {
                return res.status(200).json({
                    success: true,
                    message: 'The currency has been updated',
                });
            }
        
            res.status(404).json({
                success: false,
                message: 'Curreny not found',
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
        const currency = await db.Currency.findByPk(id);

        if(currency) {
            try {
                await db.Currency.destroy({
                    where: { id },
                    force: true
                });
                
                return res.status(200).json({
                    success: true,
                    message: 'The currency has been deleted'
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
            message: 'Currency not found'
        });
    },
}

module.exports = currencyController;
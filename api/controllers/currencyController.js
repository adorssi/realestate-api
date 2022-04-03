const db = require('../src/database/models');

const currencyController = {
    listAll: async (req, res) => {
            
        try {
            const currency = await db.Currency.findAll();

            res.status(200).json({
                count: currency.length,
                data: currency
            })
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {
            
        const {id} = req.params;

        try {
            const currency = await db.Currency.findByPk(id);
            
            if(currency) {
                return res.status(200).json({
                    data: currency
                });
            }

            res.status(404).json({
                result: false,
                message: 'Currency not found'
            });
            
        } catch (error) {
            console.log(error);
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
                    message: 'Currency created successfully',
                    data: currency
                });
            }

            res.status(404).json({
                result: false,
                message: 'The currency could not be created',
            });
            
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
            
        const {id} = req.params;
        const {name, symbol} = req.body;
        
        try {
            const currency = await db.Currency.update({
                name
            }, {
                where: {
                    id
                }
            });
            
            if(currency) {
                return res.status(200).json({
                    result: true,
                    message: 'The currency has been updated',
                });
            }
        
            res.status(404).json({
                result: false,
                message: 'Curreny not found',
            });
            
        } catch (error) {
            console.log(error);
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
                    result: true,
                    message: 'The currency has been deleted'
                });
                
            } catch (error) {
                console.log(error);
            }
        }
        res.status(404).json({
            result: false,
            message: 'Currency not found'
        });
    },
}

module.exports = currencyController;
const db = require('../src/database/models');

const amenitieController = {
    
    add: async (req, res) => {
                
        const {body} = req;

        try {
            const amenitie = await db.Amenitie.create(body);
            
            if(amenitie) {
                return res.status(200).json({
                    success: true,
                    data: amenitie
                });
            }

            res.status(404).json({
                success: false,
                message: 'Amenitie not found',
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    
}

module.exports = amenitieController;
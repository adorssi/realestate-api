const db = require('../src/database/models');

const propertyController = {
    listAll: async (req, res) => {
        
        try {
            const properties = await db.Property.findAll();

            res.status(200).json({
                count: properties.length,
                data: properties
            })
        } catch (error) {
            console.log(error);
        }
    },
    listAllPublished: async (req, res) => {

        try {
            const properties = await db.Property.findAll({
                where: {
                    published: true
                }
            });

            res.status(200).json({
                count: properties.length,
                data: properties
            })
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (req, res) => {

        const {id} = req.params;

        try {
            const property = await db.Property.findByPk(id);
            
            if(property) {
                return res.status(200).json({
                    data: property
                });
            }

            res.status(404).json({
                message: 'Property not found',
                data: null});
            
        } catch (error) {
            console.log(error);
        }
    },
    add: async (req, res) => {

        let gallery = null;
        if(req.files && req.files.gallery){
            const imgGaleria = req.files.gallery;
            imgGaleria.forEach( item => {
                gallery.push(item.filename)
            });
            gallery = JSON.stringify(gallery);
        }

        let mainImage;
        if(req.files && req.files.mainImage) {
            mainImage = '/images/properties/' + req.files.mainImage[0].filename;
        } else {
            mainImage = '/images/properties/default.png';
        }

            try {
                let newProperty = await db.Property.create({
                    title: req.body.title,
                    ref: Number(req.body.ref),
                    currency_id: Number(req.body.currency_id),
                    price: Number(req.body.price),
                    financing:  Number(req.body.financing),
                    address: req.body.address,
                    operationType: req.body.operationType,
                    landSize: Number(req.body.landSize),
                    builtSize: Number(req.body.builtSize),
                    bedrooms: Number(req.body.bedrooms),
                    toilets: Number(req.body.toilets),
                    garage: Number(req.body.garage),
                    description: req.body.description,
                    mainImage,
                    gallery,
                    published: Number(req.body.published),
                    featured: Number(req.body.featured),
                    showPrice: Number(req.body.showPrice),
                    city_id: Number(req.body.city_id),
                    type_id: Number(req.body.type_id),
                });

                res.status(200).json({
                    message: 'success',
                    newProperty
                });

            } catch (error) {
                console.log(error);
            }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const property = await db.Property.findByPk(id);

        if(property) {
            let gallery = null;
            if(req.files && req.files.gallery){
                const imgGaleria = req.files.gallery;
                imgGaleria.forEach( item => {
                    gallery.push(item.filename)
                });
                gallery = JSON.stringify(gallery);
            }

            let mainImage;
            if(req.files && req.files.mainImage) {
                mainImage = '/images/properties/' + req.files.mainImage[0].filename;
            } else {
                mainImage = '/images/properties/default.png';
            }

                try {
                    let updateProperty = await db.Property.update({
                        title: req.body.title,
                        ref: Number(req.body.ref),
                        currency_id: Number(req.body.currency_id),
                        price: Number(req.body.price) || null,
                        financing:  Number(req.body.financing),
                        address: req.body.address || null,
                        operationType: req.body.operationType,
                        landSize: Number(req.body.landSize) || null,
                        builtSize: Number(req.body.builtSize) || null,
                        bedrooms: Number(req.body.bedrooms) || null,
                        toilets: Number(req.body.toilets) || null,
                        garage: Number(req.body.garage) || null,
                        description: req.body.description,
                        mainImage,
                        gallery,
                        published: Number(req.body.published) || 0,
                        featured: Number(req.body.featured) || 0,
                        showPrice: Number(req.body.showPrice) || 0,
                        city_id: Number(req.body.city_id),
                        type_id: Number(req.body.type_id),
                    },
                    {
                        where: { id }
                    });
                    return res.status(200).json({
                        message: 'The property has been updated',
                        updateProperty: await db.Property.findByPk(id)
                    });

                } catch (error) {
                    console.log(error);
                }
        }
        return res.status(404).json({
            message: 'Property not found', 
        });
        

    },
    delete: async (req, res) => {
        const id = req.params.id;

        const property = await db.Property.findByPk(id);

        if(property) {
            try {
                await db.Property.destroy({
                    where: {id}
                });
                return res.status(200).json({
                    message: 'The property has been deleted'
                });
            } catch (error) {
                console.log(error);
            }
        }

        return res.status(404).json({ message: 'Property not found' });
    },
    hardDelete: async (req, res) => {
        const id = req.params.id;

        const property = await db.Property.findByPk(id);

        if(property) {
            try {
                await db.Property.destroy({
                    where: {id},
                    force: true
                });
                return res.status(200).json({
                    message: 'The property has been deleted'
                });
            } catch (error) {
                console.log(error);
            }
        }

        return res.status(404).json({ message: 'Property not found' });
    },
    restore: async (req, res) => {
        const id = req.params.id;

        const property = await db.Property.findByPk(id, {
            paranoid: false
        });
        
        if(property) {    
            try {
                await db.Property.restore({
                    where: {id}
                });
                return res.status(200).json({
                    message: 'The property has been restored'
                });
            } catch (error) {
                console.log(error);
            }
        }
        return res.status(404).json({ message: 'Property not found' });
    },
}

module.exports = propertyController;
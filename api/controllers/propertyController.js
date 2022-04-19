const db = require("../src/database/models");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const sequelize = require("../src/database/models").sequelize;

const propertyController = {
  citiesHaveProperties: async (req, res) => {
    try {
      const cities = await sequelize.query('SELECT distinct cities.id AS cityId, cities.name FROM properties INNER JOIN cities ON cities.id = properties.city_id', { type: QueryTypes.SELECT });
      res.status(200).json(cities);
    } catch (error) {
      console.log(error);
    }

  },
  listAll: async (req, res) => {
    const { cityId, published, featured } = req.query;

    try {
      const properties = await db.Property.findAll({
        include: [
          { association: "city", required: true },
          { association: "currency", required: true },
          { association: "type" },
          { association: "amenitie" },
        ],
        where: {
          [Op.and]: [
            {
              city_id: {
                [Op.like]: cityId || "%",
              },
            },
            {
              published: {
                [Op.like]: published ? true : "%",
              },
            },
            {
              featured: {
                [Op.like]: featured ? true : "%",
              },
            },
          ],
        },
      });

      return res.status(200).json({
        success: true,
        count: properties.length,
        data: properties,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  detail: async (req, res) => {
    const { PID } = req.query;

    try {
      const property = await db.Property.findByPk(PID, {
        include: [
          { association: "city" },
          { association: "currency" },
          { association: "type" },
          { association: "amenitie" },
        ],
      });

      if (property) {
        return res.status(200).json({
          success: true,
          data: property,
        });
      }

      res.status(404).json({
        success: false,
        message: "Property not found",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    try {
      const property = await db.Property.findByPk(id, {
        include: [
          { association: "city" },
          { association: "currency" },
          { association: "type" },
          { association: "amenitie" },
        ],
      });

      if (property) {
        return res.status(200).json({
          success: true,
          data: property,
        });
      }

      res.status(404).json({
        success: false,
        message: "Property not found",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  add: async (req, res) => {
    let gallery = [];
    if (req.files && req.files.gallery) {
      const imgGaleria = req.files.gallery;
      imgGaleria.forEach((item) => {
        gallery.push({
          src: item.filename,
        });
      });
      gallery = JSON.stringify(gallery);
    }

    let mainImage;
    if (req.files && req.files.mainImage) {
      mainImage = "/images/properties/" + req.files.mainImage[0].filename;
    } else {
      mainImage = "/images/properties/default.png";
    }

    try {
      let newProperty = await db.Property.create({
        title: req.body.title,
        ref: req.body.ref,
        currency_id: Number(req.body.currency_id),
        price: Number(req.body.price),
        financing: Number(req.body.financing),
        address: req.body.address,
        operationType: req.body.operationType,
        landSize: Number(req.body.landSize),
        builtSize: Number(req.body.builtSize),
        bedrooms: Number(req.body.bedrooms),
        toilets: Number(req.body.toilets),
        garage: Number(req.body.garage),
        description: req.body.description,
        mainImage,
        gallery: JSON.stringify(gallery),
        published: Number(req.body.published),
        featured: Number(req.body.featured),
        showPrice: Number(req.body.showPrice),
        city_id: Number(req.body.city_id),
        type_id: Number(req.body.type_id),
      });

      const amenities = JSON.parse(req.body.amenities); // Los input en el frontend son varios input type checkbox con el MISMO name="amenities" y el value es el id de la comodidad

      amenities.forEach((amenitie) => {
        db.PropertyAmenitie.create({
          property_id: newProperty.id,
          amenitie_id: amenitie,
        });
      });

      res.status(200).json({
        success: true,
        newProperty,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const property = await db.Property.findByPk(id);

    if (property) {
      let gallery = null;
      if (req.files && req.files.gallery) {
        const imgGaleria = req.files.gallery;
        imgGaleria.forEach((item) => {
          gallery.push(item.filename);
        });
        gallery = JSON.stringify(gallery);
      }

      let mainImage;
      if (req.files && req.files.mainImage) {
        mainImage = "/images/properties/" + req.files.mainImage[0].filename;
      } else {
        mainImage = "/images/properties/default.png";
      }

      try {
        let updateProperty = await db.Property.update(
          {
            title: req.body.title,
            ref: Number(req.body.ref),
            currency_id: Number(req.body.currency_id),
            price: Number(req.body.price) || null,
            financing: Number(req.body.financing),
            address: req.body.address || null,
            operationType: req.body.operationType,
            landSize: Number(req.body.landSize) || null,
            builtSize: Number(req.body.builtSize) || null,
            bedrooms: Number(req.body.bedrooms) || null,
            toilets: Number(req.body.toilets) || null,
            garage: Number(req.body.garage) || null,
            description: req.body.description,
            mainImage,
            gallery: JSON.stringify(req.body.gallery),
            published: Number(req.body.published) || 0,
            featured: Number(req.body.featured) || 0,
            showPrice: Number(req.body.showPrice) || 0,
            city_id: Number(req.body.city_id),
            type_id: Number(req.body.type_id),
          },
          {
            where: { id },
          }
        );

        const amenities = JSON.parse(req.body.amenities); // Los input en el frontend son varios input type checkbox con el MISMO name="amenities" y el value es el id de la comodidad

        amenities.forEach((amenitie) => {
          db.PropertyAmenitie.create({
            property_id: id,
            amenitie_id: amenitie,
          });
        });

        return res.status(200).json({
          success: true,
          message: "The property has been updated",
          updateProperty: await db.Property.findByPk(id),
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  },
  softDelete: async (req, res) => {
    const id = req.params.id;

    const property = await db.Property.findByPk(id);

    if (property) {
      try {
        await db.Property.destroy({
          where: { id },
        });
        return res.status(200).json({
          success: true,
          message: "The property has been deleted",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  },
  hardDelete: async (req, res) => {
    const id = req.params.id;

    const property = await db.Property.findByPk(id, {
      paranoid: false,
    });

    if (property) {
      try {
        await db.Property.destroy({
          where: { id },
          force: true,
        });
        return res.status(200).json({
          success: true,
          message: "The property has been deleted",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }

    return res.status(404).json({ message: "Property not found" });
  },
  restore: async (req, res) => {
    const id = req.params.id;

    const property = await db.Property.findByPk(id, {
      paranoid: false,
    });

    if (property) {
      try {
        await db.Property.restore({
          where: { id },
        });
        return res.status(200).json({
          success: true,
          message: "The property has been restored",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  },
};

module.exports = propertyController;

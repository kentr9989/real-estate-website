const Property = require('../models/Property');
const propertyController = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

// get all properties
propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({}).populate(
      'currentOwner',
      '-password'
    );
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get featured
propertyController.get('/find/featured', async (req, res) => {
  try {
    const featuredProperty = await Property.find({ featured: true }).populate(
      'currentOwner',
      '-password'
    );
    // console.log(featuredProperty);
    return res.status(200).json(featuredProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get all from a specific type
propertyController.get('/find', async (req, res) => {
  const type = req.query.type;
  try {
    if (type) {
      const properties = await Property.find({ type }).populate(
        'currentOwner',
        '-password'
      );
      return res.status(200).json(properties);
    } else {
      return res.status(500).json({ msg: 'No such type' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get counts of types -> ex : {apartment,house: 2,townhouse: 5 , apartment : 3}
propertyController.get('/find/types', async (req, res) => {
  try {
    const apartmentType = await Property.countDocuments({ type: 'apartment' });
    const houseType = await Property.countDocuments({ type: 'house' });
    const duplexType = await Property.countDocuments({ type: 'duplex' });
    const townhouseType = await Property.countDocuments({ type: 'townhouse' });

    return res.status(200).json({
      apartment: apartmentType,
      house: houseType,
      duplex: duplexType,
      townhouse: townhouseType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get individual property
propertyController.get('/find/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'currentOwner',
      '-password'
    );
    if (!property) {
      throw new Error('No such property with this id');
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// create an property
propertyController.post('/',  async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });
    console.log(newProperty)
    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// update estate
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error('You are not allowed to update other people properties');
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedProperty);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// delete estate
propertyController.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    console.log(property);
    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error('You are not allowed to delete other people properties');
    } else {
      await Property.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: 'Successfully delete property' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = propertyController;

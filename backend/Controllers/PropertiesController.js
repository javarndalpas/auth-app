const PropertyModel = require('../Models/Properties');

const addProperty = async (req, res) => {
    try {
        const { image, price, name, owner, city, type } = req.body;

        if (!image || !price || !name || !owner || !city || !type) {
            return res.status(400)
                .json({ message: "All fields are required", success: false });
        }

        const newProperty = new PropertyModel({ image, price, name, owner, city, type });
        await newProperty.save();

        res.status(201)
            .json({
                message: "Property added successfully",
                success: true,
                property: newProperty,
            });
    } catch (err) {
        console.log("Error:", err);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false,
            });
    }
};

const getProperties = async (req, res) => {
    try {
        const properties = await PropertyModel.find();
        res.status(200).json({
            message: "Properties fetched successfully",
            success: true,
            properties,
        });
    } catch (err) {
        console.error("Error fetching properties:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

module.exports = {
    addProperty,
    getProperties
};

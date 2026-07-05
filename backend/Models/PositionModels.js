const { model } = require("mongoose");
const { PositionSchema } = require("../Schema/PositionSchema");

const PositionModel = new model("position", PositionSchema);

module.exports = { PositionModel };

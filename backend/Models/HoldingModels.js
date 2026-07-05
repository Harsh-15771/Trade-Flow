const { model } = require("mongoose");

const { HoldingSchema } = require("../Schema/HoldingSchema");

const HoldingModel = new model("holding", HoldingSchema);

module.exports = { HoldingModel };

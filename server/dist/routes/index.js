"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getPlantController_1 = require("../contollers/getPlantController");
const router = (0, express_1.Router)();
router.get('/plants', getPlantController_1.getPlantData);
exports.default = router;

"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./book.ctrl");

router.get("/", ctrl.output.home);
router.get("/year/:year", ctrl.output.home);
router.get("/test", ctrl.output.test);
router.get("/list", ctrl.output.list);
router.get("/year/:year/mm/:mm", ctrl.output.list);
router.get("/search/year/:year", ctrl.output.search);
router.get("/search/year/:year/mm/:mm", ctrl.output.search);
router.get("/syncData/year/:year", ctrl.output.syncData);
router.get("/syncData/year/:year/mm/:mm", ctrl.output.syncData);
router.get("/syncData", ctrl.output.syncData);
//router.get("/search", ctrl.output.search);

router.post("/search", ctrl.process.search);
// router.post("/save", ctrl.process.save);

module.exports = router;
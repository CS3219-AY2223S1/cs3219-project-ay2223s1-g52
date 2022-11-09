const express = require("express");
const { getHistory, addHistory } = require("../controller/historyController");

const router = express.Router();

router.get("/:username", getHistory);
router.post("/:username", addHistory);

module.exports = router;

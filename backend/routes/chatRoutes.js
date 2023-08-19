const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  renameFromGroup,
  fetchUser,
} = require("../controller/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,renameFromGroup);
router.route("/groupadd").put(protect,addToGroup);
router.get("/:chatId",fetchUser);

module.exports = router;

const express = require("express");
const router = express.Router();

// import
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/person.controller");
// import middleware
const { auth } = require("../middleware/auth.middleware");
const { upload } = require("../middleware/uploadfile.middleware");
// localhost:8000/api/register

router.get("/person", auth, list);
router.get("/person/:id", auth, read);
router.post("/person", auth, upload, create);
router.put("/person/:id", auth, upload, update);
router.delete("/person/:id", auth, remove);

module.exports = router;

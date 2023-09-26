const express = require("express");

const router = express.Router();

const TermsController = require("../controllers/TermsController");

router.post("/terms/create", TermsController.Create);
router.post("/terms/list", TermsController.List);
router.get("/terms/getById/:id", TermsController.GetById);
router.patch("/terms/update/:id", TermsController.Update);
router.delete("/terms/delete/:id", TermsController.Delete);

module.exports = router;

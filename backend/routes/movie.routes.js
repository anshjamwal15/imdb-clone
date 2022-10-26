const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get("/welcome", auth, (req, res) => {
    console.log(auth);
    console.log(req);
    res.status(200).json({hello:"Welcome"});
});

module.exports = router;


const { getProfile, updateProfile, deleteProfile } = require("../controllers/usercontroller");


// ✅ Get User Profile
router.get("/profile", authenticateUser, getProfile);

// ✅ Update User Profile
router.put("/profile", authenticateUser, updateProfile);

// ✅ Delete User Account
router.delete("/profile", authenticateUser, deleteProfile);
module.exports = router;

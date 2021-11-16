const controller = require("../controllers/evault.controller");

module.exports = app => {
    // users
    app.get("/api/user/name/:username", controller.findUserByName);
    app.get("/api/user/email/:email", controller.findUserByEmail)
    app.get("/api/user/:_id", controller.findUser);
    app.put("/api/user/update/:_id", controller.updateUser);
    app.post("/api/user/new", controller.createUser);
    app.delete("/api/user/delete/:_id", controller.deleteUser);

    // reviews
    app.get("/api/reviews", controller.findAllReviews);

    // passwords
    app.get("/api/passwords/:_id", controller.findSpecPasswords);
}
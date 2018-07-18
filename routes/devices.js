var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/sensors/search', (req, res) => {
        var name = req.body.name;
        db.collection("sensors").findOne({ "name": name }, (err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                })
            }
        })
    })
    app.post('/sensors/update', (req, res) => {
        var id = req.body._id;
        var rvalue = req.body.value;
        console.log(req.body);
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { value: rvalue } };
        db.collection("sensors").updateOne(myquery, newvalues, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Updated Successfully"
                })
            }
        });
    })
    app.post('/sensors/add', (req, res) => {
        db.collection("sensors").insertOne(req.body, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Added Successfully"
                })
            }
        });
    })
    app.post('/devices/control', (req, res) => {
        var id = req.body._id;
        var state = req.body.state;
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { state: state } };
        db.collection("devices").updateOne(myquery, newvalues, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Updated Successfully"
                })
            }
        });
    })
    app.post('/devices/rename', (req, res) => {
        var id = req.body._id;
        var name = req.body.name;
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { name: name } };
        db.collection("devices").updateOne(myquery, newvalues, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Updated Successfully"
                })
            }
        });
    })
    app.post('/rooms/rename', (req, res) => {
        var id = req.body._id;
        var name = req.body.name;
        var myquery = { _id: ObjectId(id) };
        var newvalues = { $set: { name: name } };
        db.collection("rooms").updateOne(myquery, newvalues, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Updated Successfully"
                })
            }
        });
    })
    app.post('/rooms/devices', (req, res) => {
        var pid = req.body.parent;
        var query = { parent: ObjectId(pid) };
        db.collection("devices").find(query).toArray(function (err, result) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: result
                })
            }
        });
    })
    app.post('/rooms/sensors', (req, res) => {
        var pid = req.body.parent;
        var query = { parent: ObjectId(pid) };
        db.collection("sensors").find(query).toArray(function (err, result) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: result
                })
            }
        });
    })

}
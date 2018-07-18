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
                    message:  "Updated Successfully"
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
                    message:  "Added Successfully"
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


}
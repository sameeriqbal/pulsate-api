module.exports = function (app, db) {
    app.post('/feed/', (req, res) => {
        var name = req.body.name;
        console.log(req.body);
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
}
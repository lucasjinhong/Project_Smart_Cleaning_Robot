const mongoose = require('mongoose');
const Home = require('../model/home_db');

const async_catch = require('../utils/async_catch');
const verify = require('../model/token_verification');

const updateUser = require('../model/home_updateUser');
const deleteHome = require('../model/home_delete');
const joinHome = require('../model/home_join');
const quitHome = require('../model/home_quit');
const getData = require('../model/home_data');


exports.toCreate = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await verify(token);

    var data = new Home({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        users: [auth],
        create_by: auth,
        create_date: new Date()
    });

    await data.save();
    await updateUser(auth, data._id)
    await res.status(201).send("Create Success");
})

exports.toDelete = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await verify(token);

    var data = req.params.home_id;

    await deleteHome(auth, data)
    await res.status(201).send("Delete Success");
})

exports.toJoin = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await verify(token);

    var data = req.params.home_id;

    await joinHome(auth, data)
    await res.status(201).send("Join Success");
})

exports.toQuit = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await verify(token);

    var data = req.params.home_id;

    await quitHome(auth, data);
    await res.status(201).send("Quit Success");
})

exports.toData = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var id = req.params.home_id;

    await verify(token);
    var data = await getData(id);
    await res.status(201).json(data);
})
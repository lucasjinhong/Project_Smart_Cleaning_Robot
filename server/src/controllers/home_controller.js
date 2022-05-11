const mongoose = require('mongoose');
const Home = require('../model/home_db');

const async_catch = require('../utils/async_catch');
const token_verification = require('../utils/token_verification');
const id_check = require('../utils/id_check');

const updateUser = require('../model/home_updateUser');
const deleteHome = require('../model/home_delete');
const joinHome = require('../model/home_join');
const quitHome = require('../model/home_quit');
const getData = require('../model/home_data');
const pushData = require('../model/home_updateData');


exports.toCreate = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await token_verification(token);

    var data = new Home({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        users: [auth],
        create_by: auth,
        create_date: new Date()
    });

    await data.save();
    await updateUser(auth, data._id)
    await res.status(201).send({message:'Create success', status:201, data:{id:data._id}});
})

exports.toDelete = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await token_verification(token);

    var id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    await deleteHome(auth, id);
    await res.status(201).send({message:'Delete success', status:201});
})

exports.toJoin = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await token_verification(token);

    var id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    await joinHome(auth, id)
    await res.status(201).send({message:'Join success', status:201});
})

exports.toQuit = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    var auth = await token_verification(token);

    var id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    await quitHome(auth, id);
    await res.status(201).send({message:'quit success', status:201});
})

exports.toData = async_catch(async(req, res, next) => {
    var token = req.headers['token'];
    await token_verification(token);

    var id = req.params.home_id;

    await id_check(id);
    var data = await getData(id);
    await res.status(200).json({message:'data get success', status:200, data:data});
})

exports.toUpdateData = async_catch(async(req, res, next) => {
    var id = req.params.home_id;
    var data = req.body.object;

    await id_check(id);
    await pushData(id, data);
    await res.status(200).json({message:'data push success', status:200});
})
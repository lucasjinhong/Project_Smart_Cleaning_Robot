import mongoose from 'mongoose';
import '../db/mongoose';
import {Home} from '../model/home_db';
import {User} from '../model/user_db';

import {async_catch} from '../utils/async_catch';
import {token_verification} from '../utils/token_verification';
import {id_check} from '../utils/id_check';

import deleteHome from '../model/home_delete';
import joinHome from '../model/home_join';
import quitHome from '../model/home_quit';
import getData from '../model/home_data';


export const toCreate = async_catch(async(req:any, res:any) => {
    const token = req.headers['authorization'];
    const auth = await token_verification(token);

    const data = new Home({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        users: [auth],
        create_by: auth,
        create_date: new Date()
    });

    await data.save();
    await User.findByIdAndUpdate(auth, { $push: { homes: data._id } });
    await res.status(201).send({message:'Create success', status:201, data:{id:data._id}});
})

export const toDelete = async_catch(async(req:any, res:any) => {
    const token = req.headers['token'];
    const auth = await token_verification(token);

    const id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    await deleteHome(auth, id);
    await res.status(201).send({message:'Delete success', status:201});
})

export const toJoin = async_catch(async(req:any, res:any) => {
    const token = req.headers['token'];
    const auth = await token_verification(token);

    const id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    const name = await joinHome(auth, id)
    await res.status(201).send({message:'Join success', status:201, data:name});
})

export const toQuit = async_catch(async(req:any, res:any) => {
    const token = req.headers['token'];
    const auth = await token_verification(token);

    const id = req.params.home_id;

    await id_check(id);
    await id_check(auth);
    await quitHome(auth, id);
    await res.status(201).send({message:'quit success', status:201});
})

export const toData = async_catch(async(req:any, res:any) => {
    const token = req.headers['token'];
    await token_verification(token);

    const id = req.params.home_id;

    await id_check(id);
    const data = await getData(id);
    await res.status(200).json({message:'data get success', status:200, data:data});
})

export const toUpdateData = async_catch(async(req:any, res:any) => {
    const id = req.params.home_id;
    const data = req.body.object;

    await id_check(id);
    await Home.findByIdAndUpdate(id, { $push: {object: data} });
    await res.status(200).json({message:'data push success', status:200});
})
const user_mongoose = require('../db/user_mongoose');
const User = require('../model/user_db');
const Home = require('../model/home_db')

result = {};

function checkId(id, data){
    return new Promise ((resolve, reject) => {
        User.find({_id:id, homes: {$in: [data]}}, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj){
                result.status = 400;
                result.message = 'home already joined';
                return reject(result);
            }
            else {
                resolve();
            }          
        })
    })
}

function checkHome(id, data){
    return new Promise ((resolve, reject) => {
        Home.findById({_id:data}, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(!obj){
                result.status = 400;
                result.message = 'home unavailable';
                reject(result);
                return;
            }
            else{
                resolve();
            }
        })

        Home.find({_id:data, users: {$in: [id]}}, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj){
                result.status = 400;
                result.message = 'home already joined';
                reject(result);
                return;
            }
            else{
                resolve();
            }
        })
    })
}

function homeJoin(id, data){
    return new Promise ((resolve, reject) => {
        Home.findByIdAndUpdate({_id: data}, { $push: { users: id } }, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else{
                resolve();
            }
        })
    })
}

function userPush(id, data){
    return new Promise ((resolve, reject) => {
        User.findByIdAndUpdate({_id:id}, { $push: { homes: data } }, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else{
                resolve();
            }
        })
    })
}

module.exports = async function joinHome(id, data){
    await checkId(id, data);
    await checkHome(id, data);
    await homeJoin(id, data);
    await userPush(id, data);
}
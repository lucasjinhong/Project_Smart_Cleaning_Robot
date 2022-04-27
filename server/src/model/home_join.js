const user_mongoose = require('../db/user_mongoose');
const User = require('../model/user_db');
const Home = require('../model/home_db')

result = {};

function checkId(id, data){
    return new Promise ((resolve, reject) => {

        var re = /^[0-9a-fA-F]{24}$/;

        if(!re.test(id)){
            result.status = 500;
            result.message = 'user id error';
            reject(result);
            return;
        };

        if(!re.test(data)){
            result.status = 500;
            result.message = 'home id error';
            reject(result);
            return;
        };

        User.find({_id:id, homes: {$in: [data]}}, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.length){
                result.status = 400;
                result.message = 'user alr join this home';
                reject(result);
                return;
            }
            else {
                resolve();
            }
        })

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
    await homeJoin(id, data);
    await userPush(id, data);
}
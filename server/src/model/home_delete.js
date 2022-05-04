const user_mongoose = require('../db/user_mongoose');
const User = require('../model/user_db');
const Home = require('../model/home_db')

result = {};

function checkId(id, data){
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
            else if(obj.create_by.equals(id)){
                resolve();
            }
            else{
                result.status = 400;
                result.message = 'cant delete this home';
                reject(result);
                return;
            }
        })
    })
}

function homeDelete(data){
    return new Promise ((resolve, reject) => {
        Home.findByIdAndDelete({_id: data}, function(err, obj){
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

function userPull(id, data){
    return new Promise ((resolve, reject) => {
        User.findByIdAndUpdate({_id:id}, { $pull: { homes: data } }, function(err, obj){
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

module.exports = async function deleteHome(id, data){
    await checkId(id, data);
    await homeDelete(data);
    await userPull(id, data);
}
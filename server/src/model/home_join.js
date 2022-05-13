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
            if(obj.length){
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

function checkHome(data){
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
    })
}


module.exports = async function joinHome(id, data){
    await checkId(id, data);
    await checkHome(data);
    await Home.findByIdAndUpdate(data, { $push: { users: id } });
    await User.findByIdAndUpdate(id, { $push: { homes: data } });
    var name = await Home.findById(data, 'name -_id');
    return name;
}
const user_mongoose = require('../db/user_mongoose');
const User = require('../model/user_db');

result = {};

function updateUser(id, data){
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

module.exports = async function update(id, data){
    await updateUser(id, data);
}
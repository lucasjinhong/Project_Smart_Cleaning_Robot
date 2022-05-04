const User = require('../model/user_db');

result = {};

function updateData(id, data){
    return new Promise ((resolve, reject) => {
        User.findByIdAndUpdate({_id:id}, data, function(err, obj){
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
    await updateData(id, data);
}
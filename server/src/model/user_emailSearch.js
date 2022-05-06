const User = require('../model/user_db');

result = {};

function checkId(id){
    return new Promise ((resolve, reject) => {
        User.findById({_id:id}, '_id',function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(!obj){
                result.status = 400;
                result.message = 'user not exist';
                reject(result);
                return;
            }
            else {
                resolve();
            }
        })
    })
}

function checkAuthorize(id){
    return new Promise ((resolve, reject) => {
        User.findById({_id:id}, '-_id email_authorization.authorized', function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.email_authorization.authorized == true){
                result.status = 400;
                result.message = 'user alr authorized';
                reject(result);
                return;
            }
            else {
                resolve();
            }
        })
    })
}

function dataUpdate(id, data){
    return new Promise ((resolve, reject) => {
        User.findByIdAndUpdate({_id: id}, data, function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else { 
                resolve();
            }
        })
    })
}

function emailSearch(id){
    return new Promise ((resolve, reject) => {
        User.findById({_id: id}, '-_id email', function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else {
                resolve(obj.email);
            }
        })
    })
}

module.exports = async function search(id, data){
    await checkId(id);
    await checkAuthorize(id);
    await dataUpdate(id, data);
    return await emailSearch(id);
}
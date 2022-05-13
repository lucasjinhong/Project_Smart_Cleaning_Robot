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


module.exports = async function search(id, data){
    await checkId(id);
    await checkAuthorize(id);
    await User.findByIdAndUpdate(id, data);
    return await User.findById(id, '-_id email');
}
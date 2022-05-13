const User = require('./user_db');

var result = {}

function checkCode (id, code){
    return new Promise((resolve, reject) => {
        if(!code){
            result.status = 422;
            result.message = 'pls input code';
            reject(result);
            return;
        }

        User.findById({_id:id}, 'email_authorization', function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else if (obj.email_authorization.authorization_code !== code){
                result.status = 422;
                result.message = 'wrong verification code';
                reject(result);
                return;
            }
            else{
                resolve();
            }
        })
    })
}


module.exports = async function emailAuthorize(id, code, data){
    await checkCode(id, code);
    await User.findByIdAndUpdate(id, data);
    return;
}
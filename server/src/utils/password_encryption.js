const crypto = require('crypto');

result = {};

function passwordCheck(password){
    return new Promise ((resolve, reject) => {
        if(password.length < 6 || password.length > 12){
            result.status = 409;
            result.message = "password is required in length (6~12)";
            reject(result);
        }
        else { 
            resolve();
        }
    })
}

module.exports = async function encryption(password){
    
    await passwordCheck(password);

    var hashPassword = crypto.createHash('sha256');

    hashPassword.update(password);

    var newPassword = hashPassword.digest('hex');
    return newPassword;
};
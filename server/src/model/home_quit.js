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
            if(!obj.length){
                result.status = 400;
                result.message = 'not in this home';
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

function checkHome(data){
    return new Promise ((resolve, reject) => {
        Home.findById({_id:data}, function(err, obj){
            console.log(obj.users)
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            if(obj.users.length){
                resolve();
            }
            else{
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
            }
        })       
    })
}


module.exports = async function quitHome(id, data){
    await checkId(id, data);
    await Home.findByIdAndUpdate(data, { $pull: { users: id } });
    await checkHome(data);
    await User.findByIdAndUpdate(id, { $pull: { homes: data } });
}
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
                result.status = 403;
                result.message = 'unauthorized';
                reject(result);
                return;
            }
        })
    })
}


module.exports = async function deleteHome(id, data){
    await checkId(id, data);
    await Home.findByIdAndDelete(data);
    await User.findByIdAndUpdate(id, { $pull: { homes: data } })
}
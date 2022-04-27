const user_mongoose = require('../db/user_mongoose');
const Home = require('../model/home_db')

result = {};

function checkId(id){
    return new Promise ((resolve, reject) => {

        var re = /^[0-9a-fA-F]{24}$/;

        if(!re.test(id)){
            result.status = 500;
            result.message = 'home id error';
            reject(result);
        }
        else{
            resolve();
        }
    })
}

function homeData(id){
    return new Promise ((resolve, reject) => {
        Home.findById({_id:id}, 'data -_id', function(err, obj){
            if(err){
                result.status = 500;
                result.message = err;
                reject(result);
                return;
            }
            else{
                resolve(obj);
            }
        })
    })
}

module.exports = async function getData(id){
    await checkId(id);
    return await homeData(id);
}
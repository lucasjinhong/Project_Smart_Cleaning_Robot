const Home = require('../model/home_db')

result = {};

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
    return await homeData(id);
}
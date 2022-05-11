const Home = require('../model/home_db')

result = {};

function pushData(id, data){
    return new Promise ((resolve, reject) => {
        Home.findByIdAndUpdate({_id: id}, { $push: {object: data} }, function(err){
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

module.exports = async function updateData(id, data){
    return await pushData(id, data);
}
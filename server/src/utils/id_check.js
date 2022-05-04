result = {};

function checkId(id){
    return new Promise ((resolve, reject) => {
        var re = /^[0-9a-fA-F]{24}$/;

        if(!re.test(id)){
            result.status = 400;
            result.message = 'id error';
            reject(result);
        }
        else{
            resolve();
        }
    })
}

module.exports = async function id_check(id){
    await checkId(id);
}
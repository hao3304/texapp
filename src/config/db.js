const level = require('level');
const path = require('path');

const db = level(path.join(process.cwd(),"/bank/math_level_db"));

db.find = function (putoption,callback) {
    var option = {keys: true, values: true, revers: false,  fillCache: true};
    if (!putoption)
        return callback('nothing', null);
    else {
        if (putoption.prefix) {
            option.start = putoption.prefix;
            option.end = putoption.prefix.substring(0, putoption.prefix.length - 1)
                + String.fromCharCode(putoption.prefix[putoption.prefix.length - 1].charCodeAt() + 1);
        }

        if (putoption.limit)
            option.limit = putoption.limit;

        db.createReadStream(option).on('data',function (data) {
            data&&callback(data.key, data.value);
        }).on('error',function (err) {
        }).on('close',function () {
        }).on('end', function () {
            return callback(null, Date.now());
        });
    }
}

db.randomFind = function (options) {
    let rep = [],result = [];
    let limit = 1;
    if(options.limit) {
        limit = options.limit;
        delete options.limit;
    }
    
    return new Promise(function (resolve,reject) {
        db.find(options,function (key,value) {
            if(key) {
                rep.push({key:key,value:value});
            }else{
                for(var i=0;i<limit;i++) {
                    var idx=parseInt(Math.random()*rep.length)
                    result.push(rep[idx])
                    rep.splice(idx,1)
                }
                resolve(result);
            }
        })

    })
    

}

module.exports = db;
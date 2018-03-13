const path = require('path');
const template = require('art-template');
const levelDB = require("../config/db");

exports.getTex =async function(col,row,title,prefix){
    let data = await levelDB.randomFind({prefix,limit:col*row});
    let result = [];

    for(let i = 0;i< row; i ++) {
        for(let j = 0; j < col; j++) {
            let val = getVal(i*j + j)
            if(i == 0 && j !=(col-1)) {
                val += "\\quad";
            }else if(j == (col-1)) {
                val += "\\\\"
            }
            if(j != 0 ){
                val = "&" +val;
            }
            data.push(val);
        }
    }

    template.defaults.escape = false;
    let tpl = template(path.join(process.cwd(),"/tex-tpl/test.art"),{
        title:title,
        content:data.join('')
    });

    return tpl
}

function getVal(range) {
    return ""
}

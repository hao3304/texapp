const path = require('path');
const template = require('art-template');
const levelDB = require("../config/db");

exports.getTex =async function(col,row,title,prefix){
    let data = await levelDB.randomFind({prefix,limit:col*row});
    let result = [];

    for(let i = 0;i< row; i ++) {
        for(let j = 0; j < col; j++) {
            let val = getVal(data[i*j + j])
            if(i == 0 && j !=(col-1)) {
                val += "\\quad";
            }else if(j == (col-1)) {
                val += "\\\\"
            }
            if(j != 0 ){
                val = "&" +val;
            }
            result.push(val);
        }
    }
    template.defaults.escape = false;
    let tpl = template(path.join(process.cwd(),"/tex-tpl/test.art"),{
        title:title,
        content:result.join('')
    });
    return tpl
}

function getVal(obj) {
    return obj.value.replace(/=/g,"&=").replace(/x/g,"\\times").replace(/\//g,'\\div');
}

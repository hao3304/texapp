const path = require('path');
const template = require('art-template');

exports.getTex = function(max,min,col,row,title,method){
    const range = [min,max];
    const symbol = method||"+";
    let data = [];
    for(let i = 0;i< row; i ++) {
        for(let j = 0; j < col; j++) {
            let val = `${getRangeNum(range)} ${symbol} ${getRangeNum(range)} &=`;
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
    let tpl = template(path.join(process.cwd(),"/tex-tpl/test.art"),{
        title:title,
        content:data.join('')
    });
    return tpl
}

function getRangeNum(range) {
    return parseInt(Math.random() * (range[1]-range[0]) + range[0])
}



exports.getTex = function(max,min,col,row){
    const range = [min,max];
    const symbol = "+";
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
    let tpl = `
        \\documentclass[12pt,a4paper]{article}
            \\pagestyle{empty}
            \\usepackage{CJK}
            \\usepackage{mathrsfs}
            \\usepackage{amsmath}
            \\usepackage{bm}
            \\LARGE
            \\begin{align*}
            ${data.join("")}
            \\end{align*}
            \\end{document}
    `;
    return tpl
}

function getRangeNum(range) {
    return parseInt(Math.random() * (range[1]-range[0]) + range[0])
}

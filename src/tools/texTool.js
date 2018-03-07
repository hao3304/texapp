

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
            \\pagestyle{empty}
            \\usepackage{CJK}%中文包
            \\usepackage{mathrsfs}%用于产生一种数学用的花体字
            \\usepackage{amsmath}%数学符号
            \\usepackage{bm}%专门处理数学粗体的bm宏包
            \\usepackage[cmintegrals]{newtxmath}%高质量数学字体/黑体
            \\begin{CJK}{UTF8}{gkai}
            \\LARGE 口算练习题 \\\\
            \\end{CJK}
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

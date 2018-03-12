const Base = require('./base.js');
const cmd = require('cmd-promise')
const Tex = require('../tools/texTool');
const mkfiles = require('mkfiles');
const levelDB = require("../config/db");


module.exports = class extends Base {
    async indexAction() {
        if(this.ctx.isPost) {
            const {max=99,min=10,col=4,row=10,title,method} = this.post();
            let tpl = Tex.getTex(parseInt(max),parseInt(min),parseInt(col),parseInt(row),title,method);
            let timestamp = new Date().valueOf();
            mkfiles({
                path: './www/tex',
                files: [{
                    file:timestamp + '.tex',
                    content:tpl
                }]
            });
            let filepath = process.cwd() + `/www/tex/${timestamp}.tex`;
            const rep =  await cmd(`cd www/tex && pdflatex ${filepath} `);
            console.log(rep);
            this.redirect(`/index?id=${timestamp}`)
        }else{
            return this.display();
        }
    }

   async testAction() {
        let {prefix,limit} = this.ctx.query;
        let result = await levelDB.randomFind({prefix,limit});
        this.ctx.body = result;
    }
};

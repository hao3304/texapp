const Base = require('./base.js');
const cmd = require('cmd-promise')
const Tex = require('../tools/texTool');
const mkfiles = require('mkfiles');
const levelDB = require("../config/db");
const shortid = require('shortid');


module.exports = class extends Base {
    async texAction() {
        if(this.ctx.isPost) {
            const {col=4,row=10,title="标题",prefix} = this.post();
            let tpl = await Tex.getTex(parseInt(col),parseInt(row),title,prefix);
            let sid = shortid.generate();
            mkfiles({
                path: './www/tex',
                files: [{
                    file:sid + '.tex',
                    content:tpl
                }]
            });
            let filepath = process.cwd() + `/www/tex/${sid}.tex`;
            const rep =  await cmd(`cd www/tex && pdflatex ${filepath} `);
            console.log(rep);
            return this.ctx.body = {
                code:0,
                message:'',
                response: sid +'.tex'
            }
            // console.log(rep);
            // this.redirect(`/index?id=${sid}`)
        }else{
            // return this.display();
            this.ctx.body = "不支持该方法";
        }
    }

   async testAction() {
        let {prefix="A1",limit=1} = this.ctx.query;
        let result = await levelDB.randomFind({prefix,limit});
        this.ctx.body = result;
    }
};

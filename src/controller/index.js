const Base = require('./base.js');
const cmd = require('cmd-promise')
const Tex = require('../tools/texTool');
const mkfiles = require('mkfiles');
const path = require('path');

module.exports = class extends Base {
    async indexAction() {
        if(this.ctx.isPost) {
            const {max=99,min=10,col=4,row=10} = this.post();
            let tpl = Tex.getTex(parseInt(max),parseInt(min),parseInt(col),parseInt(row));
            let timestamp = new Date().valueOf();
            mkfiles({
                path: './tex',
                files: [{
                    file:timestamp + '.tex',
                    content:tpl
                }]
            });
            let filepath = process.cwd() + `\\tex\\${timestamp}.tex`;
            const rep =  await cmd(`cd tex && pdflatex ${filepath} `);
            this.download(path.join(think.ROOT_PATH, `./tex/${timestamp}.pdf`));
        }else{
            this.display();
        }
    }

};

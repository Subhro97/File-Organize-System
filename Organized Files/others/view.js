let fs=require("fs");
let path=require("path");

function view(dirpath,mode){
    if(mode=="tree"){
        viewTree(dirpath,"");

    }else if(mode=="flat"){
        viewFlat(dirpath);

    }else{
        console.log("Wrong command");
    }
}
    
function isFileorNot(dirpath){
    return fs.lstatSync(dirpath).isFile();

}

function getContent(dirpath){
    return fs.readdirSync(dirpath);

}

function viewFlat(dirpath){
    let isFile=isFileorNot(dirpath);
    if(isFile){
        console.log(dirpath+"*");

    }else{
        console.log(dirpath);
        let content=getContent(dirpath);
        for(let idx=0;idx<content.length;idx++){
            let child=path.join(dirpath,content[idx]);
            viewFlat(child);
        }

    }

}

function viewTree(dirpath,indent){
    let isFile=isFileorNot(dirpath);
    if(isFile){
        console.log(indent,path.basename(dirpath)+"*");

    }else{
        console.log(indent,path.basename(dirpath));
        let content=getContent(dirpath);
        for(let idx=0;idx<content.length;idx++){
            let child=path.join(dirpath,content[idx]);
            viewTree(child,indent+"\t");
        }

    }

}

module.exports={
        viewFun:view
    }
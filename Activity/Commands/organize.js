//modules
let fs=require("fs");
let path=require("path");
//inputs
function organizeFn(currDir){
    let toOrganizeFile=path.join(currDir,"Organized Files");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    others:[]
    
}

//Directories created
function toCreate(toOrganizeFile){
    if(!fs.existsSync(toOrganizeFile)){
        fs.mkdirSync(toOrganizeFile);
        for(let key in types){
            fs.mkdirSync(path.join(toOrganizeFile,key))
        }
    }
}

toCreate(toOrganizeFile);

//Traverse entire file and set the destination directory
function isFileorNot(dirpath){
    return fs.lstatSync(dirpath).isFile();

}

function getContent(dirpath){
    return fs.readdirSync(dirpath);

}

/*function destPath(dirpath){
    isFile=isFileorNot(dirpath);
    if(isFile){
        let strArr=dirpath.split(".");
        let ext=strArr.pop();
        for(let key in types){
            for(let idx=0;idx<types[key].length;idx++){
                if(types[key][idx]==ext){
                    let destFolderPath=path.join(toOrganizeFile,key);
                    //console.log(destFolderPath);
                    return destFolderPath;
                }

            }if(key=='others'){
                //console.log(path.join(toOrganizeFile,'others'));
                return path.join(toOrganizeFile,'others');
            }
           
        }
        

    }else{
        let contents=getContent(dirpath);
        for(let idx=0;idx<contents.length;idx++){
            let childs=path.join(dirpath,contents[idx]);
                 destPath(childs);

        }

    }
}*/
function destPath(dirpath){
        let strArr=dirpath.split(".");
        let ext=strArr.pop();
        for(let key in types){
            for(let idx=0;idx<types[key].length;idx++){
                if(types[key][idx]==ext){
                    let destFolderPath=path.join(toOrganizeFile,key);
                    return destFolderPath;
                }

            }if(key=='others'){
               // console.log(path.join(toOrganizeFile,'others'));
               let dest=path.join(toOrganizeFile,'others');
                return dest;
            }
           
        }
}

//destPath(currDir);

//copy files from directory to destination path

function copyD(dirpath,destSt){
   fs.copyFileSync(dirpath,destSt);

}

function copytoDest(temp){
    let isFile=isFileorNot(temp);
    if(isFile){
        let destFolderName=destPath(temp);
        console.log(destFolderName);
        let orgName=path.join(destFolderName,path.basename(temp));
       // console.log(orgName);
        copyD(temp,orgName);


    }else{
        let contents=getContent(temp);
        for(let idx=0;idx<contents.length;idx++){
            let childs=path.join(temp,contents[idx]);
            copytoDest(childs);

        }


    }
}
copytoDest(currDir);

}



module.exports={
    organizeFun:organizeFn
}
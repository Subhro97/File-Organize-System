//input
let input=process.argv.slice(2);
let cmd=input[0];


//functin call
let viewFileObj=require("./commands/view");
let helpFileObj=require("./commands/help");
let organizeFileObj=require("./commands/organize");

switch(cmd){
    case "view": 
    viewFileObj.viewFun(input[1],input[2]);
    break;
    case "organize":
        organizeFileObj.organizeFun(input[1]);
        break;
    case "help":
        helpFileObj.helperFun();
        break;
    default:
        console.log("Wrong Command");
        break;
}
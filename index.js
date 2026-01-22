const http = require("http");

const handler=(req,res)=>{
    if(req.method=="GET"){
        if(req.url=="/user"){
            res.end("User - READ");
        } else{
            res.end("Not Found");
        }
    } 
    
    else if(req.method=="POST"){
    if( req.url=="/user/create"){
        res.end("User-CREATE");
        } else{
            res.end("Not Found");
        }
    } 
    
    else if(req.method=="PATCH"){
        if(req.url=="/user/change-status"){
            res.end("User-CHANGE STATUS");
        } else{
            res.end("Not Found");
        }
    }
    
    else if( req.method=="PUT"){
        if(req.url=="/user/update"){
            res.end("User-UPDATE");
        } else{
            res.end("Not Found");
        }
    }
    // console.log(req.method);
    // console.log(req.url);
    // res.end("Hello Mihir");
};

const server=http.createServer(handler);

server.listen(
  5000,
    ()=>{
        console.log('server started on port 5000')
    }
);
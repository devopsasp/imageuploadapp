import express from 'express'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
const app=express()
app.get("/uploadform",(req,res)=>{
    const options = {
        root: path.join("../imageuploadapp/public/")
        
    };
    res.sendFile('index.html',options,(err)=>{
        if(err) console.log(err)
        console.log("sent")
      })
})
app.post("/upload",(req,res,)=>{
    const form=new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        let oldpath=files.profilePic.filepath
        console.log(files.profilePic.originalFilename)
        let newpath=path.join("../imageuploadapp",'uploads/'+files.profilePic.originalFilename)
        console.log(newpath)
        let rawdata=fs.readFileSync(oldpath)
        fs.writeFile(newpath,rawdata,function(err){
            if(err)console.log(err)
            return res.send("successfully uploaded")
        })
    })
})
app.listen(4000,()=>{
    console.log("app listening")
})

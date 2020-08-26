var request = require("request");
 var cheerio=require("cheerio");

 const fs = require('fs');
var i=0;
 var k=100;
var atags=[]


 function loadUrls(url,callback1){
  request(url,(err,res,html)=>{
   if(!err && res.statusCode==200){
       const $=cheerio.load(html)
       $('a').each((i,el)=>{
           if(($(el).attr('href')).includes("www",0) || ($(el).attr('href')).includes("http",0)){
            atags.push(($(el).attr('href')));
            
           }         
       });
    callback1();
}})}



 loadUrls("https://www.npmjs.com/package/cheerio",check);
    
    
    

    function check(){
       
         while(atags.length<=k &&  i<atags.length){
            if(atags[i]){
             loads(atags[i++])}
             console.log(atags.length)
         }
        
    }


    function loads(url){
        console.log(url)
       request(url,(err,res,html)=>{
            if(err){
                console.log(err)
            }
       if(!err && res.statusCode==200){
           const $=cheerio.load(html)
           $('a').each((i,el)=>{
               if(atags.length<k){
               atags.push(($(el).attr('href')));            
               console.log($(el).attr('href'), atags.length)
               if(atags.length==k){
               fs.writeFileSync('./result.txt',  atags,(err,res)=>{
                if(err){
                    console.log(err);
                }
            return}
                )}
    }})}})};





  

      
   
 

 
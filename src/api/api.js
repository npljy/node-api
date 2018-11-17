const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var api = express();
const dataUrl = 'mongodb://localhost:27017'
api.get('/product',function(req,res){
    MongoClient.connect(dataUrl,function(err,client){
        if(err){
            console.log("数据库连接失败");
            res.json('{"code":"-1","msg":"数据库连接失败"}');
            return;
        }
        console.log("数据库连接成功");
        let result = [];
        const db = client.db("nodeapi");
        let ret = db.collection('product').find();
        ret.each(function(err,item){
            if(err){
                console.log("游标遍历失败");
                res.json('{"code":"0","msg":"获取数据失败"}');
                return;
            }
            if(item !=null){
                result.push(item)
            }else{
                console.log("游标遍历完毕")
                res.json('{"code":"-1","msg":"获取数据成功","list:'+JSON.stringify(result)+'}"');
                client.close();
                res.end()
            }
        })
    })
})
api.listen(1989,'127.0.0.1')
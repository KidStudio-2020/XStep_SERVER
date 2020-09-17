module.exports = notice;

function notice(app, Message, rndstring){
    app.post('/notice/maxchk', async(req,res)=>{
        let result = await Message.find();
        if ( parseInt(req.body.docNum) == result.length){
            return res.status(200).json(true)
        }
        else{
           return res.status(200).json(false)
        }
    })
    app.post('/notice/write', async(req,res)=>{
        var today = new Date();
        var hh = today.getHours();
        var nn = today.getMinutes(); 
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+"년"+mm+"월"+dd+"일 "+hh+"시"+nn+"분";
        var messages = new Message(req.body);
        let listNum = await Message.find()
        listNum = listNum.length;
        messages.docNum = listNum + 1;
        messages.token =  rndstring.generate(23);
        messages.nowDate = today;
        if(req.body.phone == null || req.body.phone == 0 || req.body.phone == ""|| req.body.phone == "null"){
            var result = await Message.remove({docNum : req.body.docNum})
            var list = await Message.find()
            for ( var i = parseInt(req.body.docNum)+1; i <= list.length+1;i++) {
                let upateResult = await Message.update({ docNum : i }, {
                    $set : { docNum : i - 1}
                })
            }
            return res.status(200).json({message : "null 에러 막기 성공!"})    
        }
        var result = await messages.save();    
        if(!result.ok) res.status(200).json(messages);
        else res.status(500).json({message : "fail!"});
    })
    // length - (page - 1 ) * 10 부터 length - page * 10 까지 findOne으로 10개씩 찾아서 list에 push
    app.post('/notice/read', async(req,res)=>{
        let result = await Message.find().sort({ docNum : -1 });
        let list = []
        for (var i=0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                token : result[i].token
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
    })

    app.post('/notice/search/:userToken', async(req,res)=>{
        let result = await Message.find({userToken : req.body.userToken}).sort({docNum : -1})
        let list = []
        for( var i = 0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                nowDate : result[i].nowDate,
                token : result[i].token
            }
            list.push(json)
        }
        return res.status(200).json(list)
    })
    app.post('/notice/searchPhone', async(req,res)=>{
        let result = await Message.find({userToken : req.body.userToken, phone:req.body.phone}).sort({docNum : -1})
        let list = []
        for( var i = 0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                nowDate : result[i].nowDate,
                token : result[i].token
            }
            list.push(json)
        }
        return res.status(200).json( list )
    })

}

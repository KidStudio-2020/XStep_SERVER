const { Game } = require("../mongo");

module.exports = auth;


function auth(app, Users, rndstring){

  app.post('/signup', async(req,res)=>{
    var new_user = new Users(req.body);
    new_user.token = rndstring.generate(23);
    new_user.finalNickChanged = "0";
    try{
      var result = await new_user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200).json({message : "success!"});
  })

  .post('/signin', async(req,res)=>{
    var result = await Users.findOne({id: req.body.id, passwd: req.body.passwd});
    if(!result) return res.status(404).json({message : "User not found!"})
    else return res.status(200).json({id: result.id, name : result.name, token : result.token, finalNickChanged : result.finalNickChanged})
  })

  .get('/auto/:token', async(req,res)=>{
    var token = req.params.token;
    var result = await Users.findOne({"token":token});
    if(!result) return res.status(404).json({message : "Not found user"})
    else return res.status(200).json({user : result})
  })

  .post('/change/nick', async(req,res)=>{
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
    Users.updateOne({token : req.body.token}, { $set : { name : req.body.name, finalNickChanged: today} }).then(()=>{
      return res.status(200).json({message: "변경에 성공했습니다."})
    }).catch(e =>{
      return res.status(500).json({err : e})
    })
  })

  .post('/chk', async(req,res)=>{
    var result = await Users.find();
    res.send(result);
  })

  .get('/', (req,res)=>{
    res.send('G')
  })
}

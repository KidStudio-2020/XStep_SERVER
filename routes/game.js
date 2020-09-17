module.exports = game; 


function game(app, Game, rndstring){
    app.post('/gameFinish', async(req,res)=>{
        var new_game = new Game(req.body);
        new_game.musicToken = req.body.musicToken;
        try{
          var result = await new_game.save();
        }catch(e){
        }
        return res.status(200).json({message : "success!"});
      })

    app.post('/gameData/ranking/read/all', async(req,res)=>{
        let result = await Game.find().sort({ perPlay : -1, recordTotal: -1 });
        let list = []
        for (var i=0; result[i] != null; i++) {
            let json = {
                musicName : result[i].musicName,
                recordTotal : result[i].recordTotal,
                playedUser : result[i].playedUser,
                perPlay : result[i].perPlay,
                level : result[i].level,
                musicToken : result[i].musicToken
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    app.post('/gameData/ranking/read/one', async(req,res)=>{
      let result = await Game.find({musicToken : req.body.musicToken}).sort({recordTotal : -1})
      let list = []
      for( var i = 0; result[i] != null; i++) {
          let json = {
            musicName : result[i].musicName,
            recordTotal : result[i].recordTotal,
            playedUser : result[i].playedUser,
            level : result[i].level,
            musicToken : result[i].musicToken
          }
          list.push(json)
      }
      return res.status(200).json( list )
  })
  app.post('/gameData/ranking/read/one/my', async(req,res)=>{
    let result = await Game.find({musicToken : req.body.musicToken, userToken : req.body.userToken}).sort({recordTotal : -1})
    let list = []
    for( var i = 0; result[i] != null; i++) {
        let json = {
          musicName : result[i].musicName,
          recordTotal : result[i].recordTotal,
          playedUser : result[i].playedUser,
          level : result[i].level,
          musicToken : result[i].musicToken
        }
        list.push(json)
    }
    return res.status(200).json( list )
})
app.post('/gameData/ranking/read/all/my', async(req,res)=>{
  let result = await Game.find({userToken : req.body.userToken}).sort({recordTotal : -1})
  let list = []
  for( var i = 0; result[i] != null; i++) {
      let json = {
        musicName : result[i].musicName,
        recordTotal : result[i].recordTotal,
        playedUser : result[i].playedUser,
        level : result[i].level,
        musicToken : result[i].musicToken
      }
      list.push(json)
  }
  return res.status(200).json( list )
})

app.post('/add/game', async(req,res)=>{
  var new_game = new Game(req.body);
  new_game.musicToken = rndstring.generate(23);
  try{
    var result = await new_game.save();
  }catch(e){
    if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
    if(e instanceof ValidationError) return res.status(400).json({message: e.message});
    if(e instanceof paramsError) return res.status(400).json({message: e.message});
  }
  return res.status(200).json({message : "success!"});
})



}
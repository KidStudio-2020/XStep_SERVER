## XSTEP

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas

    id : {type: String, unique: true}, // 아이디

    name: {type: String} // 닉네임
    
    passwd : {type : String}, // 비밀번호

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요
    
    

* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // ex. id: "shimhg02" 

      name: {type: String} // 닉네임
      
      token : {type: String}, // 토큰 // ex. token: "akdlszfger12f"
     } 

    HTTP 404 : { message : "User Not Found!"}




* GET /auto/:token( 자동 로그인 )

> Params

    token : { type : String } // 유저 토큰

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // ex. id: "shimhg02" 

      name: {type: String} // 닉네임
      
      token : {type: String}, // 토큰 // ex. token: "akdlszfger12f"
     } 

    HTTP 404 : { message : "User Not Found!"}





* POST /chang/nick( 자동 로그인 )

> Params

    token : { type : String } // 유저 토큰

    name : { type : String } // 변경할 이름

> Response

    HTTP 200 : { message :
        "변경에 성공했습니다."
     } 

    HTTP 404 : { message : "User Not Found!"}





* POST /gameFinish ( 게임이 끝났을때마다 보내기 )

> Params

    musicName : {type: String} // 음악 이름
    recordTotal : {type :String} // 그 판의 점수
    perPlay : {type : String} // 클리어 퍼센트
    playedUser : {type: String} // 플레이한 유저 이름
    musicToken : {type : String} // 플레이한 음악 토큰
    level : {type: String} // 난이도
    userToken : {type: String} // 플레이한 유저 토큰

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요




* POST /gameData/ranking/read/all ( 모든 게임의 랭킹보기 )

> Params
 
    null
    
> Response

     HTTP 200 : { list :
    
        "musicName": "RADWIMPS - 前前前世" //음악 이름

        "recordTotal": "99" // 플레이한 음악 점수

        "level" : "상현" // 난이도
        
        "musicToken": "asdf1" // 플레이한 음악 토큰
     } 

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요
    
    
    

* POST /gameData/ranking/read/one ( 한 게임의 랭킹보기 )

> Params
    
    musicToken : {type: String, unique: true}, // 찾고자하는 음악의 토큰

> Response

     HTTP 200 : { list :
    
        "musicName": "RADWIMPS - 前前前世" //음악 이름

        "recordTotal": "99" // 플레이한 음악 점수

        "level" : "상현" // 난이도
        
        "musicToken": "asdf1" // 플레이한 음악 토큰
     } 

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요




* POST /gameData/ranking/read/one ( 특정 게임의 랭킹보기 )

> Params
    
    musicToken : {type: String, unique: true}, // 찾고자하는 음악의 토큰

> Response

     HTTP 200 : { list :
    
        "musicName": "RADWIMPS - 前前前世" //음악 이름

        "recordTotal": "99" // 플레이한 음악 점수

        "level" : "상현" // 난이도
        
        "musicToken": "asdf1" // 플레이한 음악 토큰
     } 

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요



* POST /gameData/ranking/read/all/my ( 특정 유저의 모든 게임 점수 보기 )

> Params
    
    userToken : {type: String, unique: true}, // 찾고자하는 유저의 토큰

> Response

     HTTP 200 : { list :
    
        "musicName": "RADWIMPS - 前前前世" //음악 이름

        "recordTotal": "99" // 플레이한 음악 점수

        "level" : "상현" // 난이도
        
        "musicToken": "asdf1" // 플레이한 음악 토큰
     } 

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요




* POST /gameData/ranking/read/one/my ( 특정 유저의 특정 게임 점수 보기 )

> Params
    
    userToken : {type: String, unique: true}, // 찾고자하는 유저의 토큰

    musicToken : {type: String, unique: true}, // 찾고자하는 음악의 토큰

> Response

     HTTP 200 : { list :
    
        "musicName": "RADWIMPS - 前前前世" //음악 이름

        "recordTotal": "99" // 플레이한 음악 점수

        "level" : "상현" // 난이도
        
        "musicToken": "asdf1" // 플레이한 음악 토큰
     } 

    HTTP 400 : { message : e.message } // 나올 일 없음 나오면 날 욕해줘요





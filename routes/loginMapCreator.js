require("dotenv").config();

function createLoginMap(identpoolid,cognitoidp,token,user,region) {
    return {
      IdentityPoolId: identpoolid,
      Logins: {
        [cognitoidp]: token
      },
      LoginId: user,
      region: region
    };
  }

  storeData={
    token:null,
    user:null
    
  }

  function showstuff(){
    console.log(process.env.IdentityPoolId)
  }
  module.exports={createLoginMap,storeData,showstuff}
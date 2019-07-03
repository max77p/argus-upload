
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
module.exports={createLoginMap};
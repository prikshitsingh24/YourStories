import jwt from 'jsonwebtoken'

const notSecret= "feelTheCLAW@$"

function setUser(user:any){
    const payload= {
        _id: user._id,
        email: user.email
        
    }
    return jwt.sign(payload,notSecret);
}
function getUser(token: any){
    if(!token){
        return null;
    }
    return jwt.verify(token,notSecret);
}

export default{
    setUser,
    getUser
};
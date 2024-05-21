import auth from '../service/auth'

async function restrictToLoggedinUserOnly(req:any,res: any,next: any) {
    const useUid = req.cookies?.uid;
    if(!useUid) return res.json({message:"user not loggedIn"});
    const user =auth.getUser(useUid);
    if(!user) return res.json({message:"user not loggedIn please login"});
    req.user=user;
    next();
}
export default{
    restrictToLoggedinUserOnly,
};
import User from "../models/User";
import bcrypt from "bcrypt"; 

export const getSignUp = (req,res) => res.render("signup", {pageTitle: "Create Account"});
export const postSignUp = async(req,res) => {
    const { name, email, username, password, confirmPassword} = req.body;
    const pageTitle = "Create Account"
    if(password !== confirmPassword){
        return res.status(400).render("signup", {
            pageTitle, 
            errorMessage: "The password do not match, confirm password again."
        });
    }
    const usernameExists = await User.exists({ username});
    if (usernameExists) {
        return res.status(400).render("signup", {
            pageTitle, 
            errorMessage: "This Username is already used"
        });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
        return res.status(400).render("signup", {
            pageTitle, 
            errorMessage: "This Email is already used"
        });
    }
    try {
        await User.create({
        name, email, username, password
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("signup", {
            pageTitle: "Create Account", 
            errorMessage: error._message
        });
    }
};

export const getLogin = (req,res) => res.render("login", {pageTitle: "Log in"});
export const postLogin = async(req,res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "The username does not exist"
        });
    }
    const pwVerification = await bcrypt.compare(password, user.password);
    if (!pwVerification) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "You have the wrong password"
        });
    }
    console.log("로그인 기능은 현재 만드는 중입니다.")
    return res.redirect("/");
};


export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const logout = (req,res) => res.send("logout");
export const see = (req,res) => res.send("See User");

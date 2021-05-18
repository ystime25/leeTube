import User from "../models/User";
import fetch from "node-fetch";
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

export const getLogin = (req,res) => 
    res.render("login", {pageTitle: "Log in"});

export const postLogin = async(req,res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({ username, socialOnly:false });
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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const githubSocialLoginReq = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope:"read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const githubAuthUrl= `${baseUrl}?${params}`;
    return res.redirect(githubAuthUrl);
};

export const githubSocialLoginRes =async(req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const githubAuthUrl= `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch (githubAuthUrl,{
            method:"POST",
            headers:{
                Accept: "application/json"
            }
        })
    ).json();
    if ("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json();
        const emailObj =emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj) {
            // set notification
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailObj.email});
        if (!user){
            user = await User.create({
                name:userData.name,
                email:emailObj.email, 
                username:userData.login, 
                password:"",
                socialOnly:true,
                avatarUrl: userData.avatar_url
            });
        }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEdit = (req,res) => {
    return res.render("edit-profile",{pageTitle: "Edit Profile"});
};

export const postEdit = (req,res) => {
    return res.render(edit-profile);
};

export const see = (req,res) => res.send("See User");

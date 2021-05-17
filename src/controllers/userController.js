import User from "../models/User";

export const getSignUp = (req,res) => res.render("signup", {pageTitle: "Create Account"});
export const postSignUp = async(req,res) => {
    const { name, email, username, password, confirmPassword} = req.body;
    const pageTitle = "Create Account"
    if(password !== confirmPassword){
        return res.render("signup", {
            pageTitle, 
            errorMessage: "The password do not match, confirm password again."
        });
    }
    const usernameExists = await User.exists({ username});
    if (usernameExists) {
        return res.render("signup", {
            pageTitle, 
            errorMessage: "This Username is already used"
        });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
        return res.render("signup", {
            pageTitle, 
            errorMessage: "This Email is already used"
        });
    }
    await User.create({
        name, email, username, password
    });
    return res.redirect("/login");
};
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const login = (req,res) => res.send("login");
export const logout = (req,res) => res.send("logout");
export const see = (req,res) => res.send("See User");

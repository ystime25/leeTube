import User from "../models/User";

export const getSignUp = (req,res) => res.render("signup", {pageTitle: "Create Account"});
export const postSignUp = async(req,res) => {
    const { name, email, username, password} = req.body;
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

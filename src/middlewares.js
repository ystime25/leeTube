import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Leetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const membersAccessMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const visitorsAccessMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/");
    }
};

export const multerMiddleware = multer({dest: "uploads/"});
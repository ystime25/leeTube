import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Leetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const membersAccessMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not Authorized");
    return res.redirect("/login");
  }
};

export const visitorsAccessMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not Authorized");
    return res.redirect("/");
  }
};

export const multer4Avatar = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 10485760,
  },
});

export const multer4Video = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 209715200,
  },
});

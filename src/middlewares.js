import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multer4S3 = multerS3({
  s3: s3,
  bucket: "leetubeproject",
  acl: "public-read",
});

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
  storage: multer4S3,
});

export const multer4Video = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 209715200,
  },
  storage: multer4S3,
});

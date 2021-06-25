import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const productionEnv = process.env.NODE_ENV === "production";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3Image = multerS3({
  s3: s3,
  bucket: "leetubeproject/images",
  acl: "public-read",
});

const s3Video = multerS3({
  s3: s3,
  bucket: "leetubeproject/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Leetube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.productionEnv = productionEnv;
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
  storage: productionEnv ? s3Image : undefined,
});

export const multer4Video = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 209715200,
  },
  storage: productionEnv ? s3Video : undefined,
});

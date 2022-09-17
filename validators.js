const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];
    if (title == null) { 
      errors.push({ field: "title", message: "The field 'title' is required" });
    } else if (title.length >= 255) {
      errors.push({ field: "title", message: "Should contain less than 255 characters" });
    }
    if (director == null) { errors.push({ field: "director", message: "The field 'director' is required" });}
    if (year == null) { errors.push({ field: "year", message: "The field 'year' is required" });}
    if (color == null) { errors.push({ field: "color", message: "The field 'color' is required" });}
    if (duration == null) { errors.push({ field: "duration", message: "The field 'duration' is required" });}

    if(errors.length >0) {
        res.status(422).json({validationErrors: errors});
    } else { next();
    };
};

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

/*const validateUser = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  // ...

  ----->EMAIL REGEX!!!!<--------
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  // ...

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};*/
  
module.exports = {
validateMovie,
validateUser
};
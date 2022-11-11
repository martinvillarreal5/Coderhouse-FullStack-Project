import * as userServices from "../../services/userServices.js";

const getUserInfo = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(204).end();
    }
    res.status(200).json({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      phone: req.user.phone,
      avatarUrl: req.user.avatarUrl,
      isAdmin: req.user.isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const postLogin = (req, res, next) => {
  try {
    res.status(201).json("Is authenticated: " + req.isAuthenticated());
  } catch (error) {
    next(error);
  }
};

const postRegister = async (req, res, next) => {
  try {
    const existingUser = await userServices.getByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json("Email is already in use");
    }
    if (!req.file) {
      //TODO improve error handling here or in the multer.js
      return res.status(409).json("Avatar didnt upload");
    }
    req.body.avatarUrl = req.file.path;
    await userServices.registerUser(req.body);
    res.status(201).json("Register Ok");
  } catch (error) {
    next(error);
  }
};

const getUsersList = async (req, res, next) => {
  try {
    const users = await userServices.getUsers();
    if (users.length < 1) {
      res.status(404).json("No users in database");
    } else {
      res.status(200).json(users); // ! TODO check if this return sensible info of users
    }
  } catch (error) {
    next(error);
  }
};

const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      /* req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      }); */
      // TODO check if session destroy is needed, and more security options,
      res.status(200).send("LogOut successful");
    }
  });
};

// TODO: add a delete user method, that also deletes the user's cart

export { getUserInfo, getUsersList, postLogin, postRegister, postLogout };

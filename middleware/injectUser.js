module.exports = (req, res, next) => {
    res.locals.username = req.session.user?.username || null;
    res.locals.fullname = req.session.user?.fullname || null;
    next();
  };
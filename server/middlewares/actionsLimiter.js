module.exports = async (req, res, next) => {
  try {
    const user = req.user; // Mongoose doc from verifyJWT
    const today = new Date().toISOString().slice(0, 10);

    if (user.lastActionDate !== today) {
      user.actionsLeft = user.maxActions;
      user.lastActionDate = today;
    }

    if (user.actionsLeft <= 0) {
      await user.save();
      return res
        .status(403)
        .json({
          error: 'Daily action limit reached. Please try again tomorrow.',
        });
    }

    user.actionsLeft -= 1;
    await user.save();

    next();
  } catch (err) {
    next(err);
  }
};

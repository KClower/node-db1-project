const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  // if (!req.body.name || !req.body.buget)
  //   return res.status(400).json({ Message: 'Name and Budget are required.' });
  // if (req.body.name < 3 || req.body.name > 100)
  //   return res.status(400).json({ Message: "Name of Account must be between 3 and 100." });
  // if (req.body.budget === "")
  //   return res.status(400).json({ Message: "Budget of account must be a number." });
  // if (req.body.budget < 0 || req.body.budget > 1000000)
  //   return res.status(400).json({ Message: "Budget6 of account is too large or too small." });
  // next()
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: "name and budget are required" });
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return res.status(400).json({ message: "name of account must be between 3 and 100" });
  }

  const budgetNumber = Number(budget);

  if (isNaN(budgetNumber)) {
    return res.status(400).json({ message: "budget of account must be a number" });
  }

  if (budgetNumber < 0 || budgetNumber > 1000000) {
    return res.status(400).json({ message: "budget of account is too large or too small" });
  }

  next();
}


exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  db('accounts')
    .where({ id: req.params.id })
    .then(result => {
      const [account] = result
      if (account === undefined)
        return res.status(404).json({ Message: "Account not found." })
      next()
    })
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db('accounts')
    .where({ name: req.body.name })
    .then(result => {
      const [account] = result
      if (account === undefined)
        return res.status(400).json({ message: "that name is taken" })
    })

}

const router = require('express').Router()

const Accounts = require('./accounts-model.js');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware.js');



router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll(req.query)
    .then(accounts => {
      return res.status(200).json(accounts)
    });
});

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(account => {
      if (account) {
        return res.status(200).json(account)
      } else {
        return res.status(404).json({ Message: "Account not found." })
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ Message: "Error retrieving Account." })
    });
});

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(error => {
      console, log(error);
      return res.status(500).json({ Message: "Error creating Account." });
    });
});

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const account = req.body;
  Accounts.updateById(req.params.id, account)
    .then(account => {
      if (account) {
        return res.status(200).json(account);
      } else {
        return res.status(404).json({ Message: "Account could  not be found" });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ Message: "Error updating Account." });
    });
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(count => {
      if (count > 0) {
        return res.status(200).json({ Message: "Account has been deleted." });
      } else {
        return res.status(404).json({ Message: "Account could not be found." });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ Message: "Error removing Account." });
    });
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;

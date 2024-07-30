const db = require('../../data/db-config.js');


const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id: id })
    .first()
}

async function create(account) {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts')
    .where({ id })
    .update({ ...account });
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .delete();

}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

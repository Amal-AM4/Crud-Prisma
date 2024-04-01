var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const allUser =  await prisma.user.findMany();
  res.json(allUser);
});

router.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;
  const updatedUser = await prisma.user.update({ 
    where: {id: parseInt(id)}, 
    data: {age: newAge}  
  });
  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteUser = await prisma.user.delete({ 
    where: {id: parseInt(id)}
  });
  res.json(deleteUser);
});

module.exports = router;

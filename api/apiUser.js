let api = {};

api.listUsers = (req, res) => {
  res.json([
    { name: "Paulo", age: 20 },
    { name: "Ian", age: 20 },
    { name: "Roger", age: 20 }
  ]);
};

module.exports = api;

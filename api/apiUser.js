let api = {};

api.listUsers = (req, res) => {
  res.json([
    { name: "Paulo", age: 20 },
    { name: "Morales", age: 50 },
    { name: "Roger", age: 20 }
  ]);
};

module.exports = api;

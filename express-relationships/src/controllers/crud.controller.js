const post = (model) => async (req, res) => {
    try {
      const item = await model.create(req.body);
  
      return res.status(201).send(item);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };
  module.exports={post}
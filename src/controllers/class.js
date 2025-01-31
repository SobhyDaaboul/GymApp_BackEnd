exports.bookClass = async (req, res) => {
  try {
    console.log("11111");
    const body = req.body;
    console.log("body", body);
  } catch (error) {
    throw new Error(error);
  }
};

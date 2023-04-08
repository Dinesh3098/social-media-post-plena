const connectToDB = require("./libs/mongoose");
const { app } = require("./app");
const { PORT } = require("./utils/constants");

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is up and running on port no. ${PORT} 🚀`);
});

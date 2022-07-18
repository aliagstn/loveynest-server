const { exec } = require("child_process");
exec("npx sequelize-cli --env=test db:seed:all", (_err, output, _stderr) => {
    console.log(output);
});

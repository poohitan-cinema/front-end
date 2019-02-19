const execSSH = require('exec-ssh');
const fs = require('fs');
const { server, repository, appName } = require('../config');

const { host, username, folder } = server;

const privateKey = fs.readFileSync('/Users/poohitan/.ssh/id_rsa');

const exec = command => execSSH({ host, username, privateKey })(`source ~/.profile && ${command}`);

const envVariables = {
  NODE_ENV: 'production',
  POOHITAN_COM_JWT_SECRET: process.env.POOHITAN_COM_JWT_SECRET,
  POOHITAN_COM_SUPERSECRET: process.env.POOHITAN_COM_SUPERSECRET,
};

const envVariablesString = Object.keys(envVariables).map(envVariableName => `export ${envVariableName}=${envVariables[envVariableName]}`).join(' && ');

exec(`git clone -b master ${repository} ${folder}/new`)
  .then(() => exec(`npm install --prefix ${folder}/new`))
  .then(() => exec(`rm -rf ${folder}/current`))
  .then(() => exec(`mv ${folder}/new ${folder}/current`))
  .then(() => exec(`npm run build --prefix ${folder}/current`))
  .then(() => exec(`pm2 stop ${appName}`))
  .then(() => exec(`${envVariablesString} && cd ${folder}/current && pm2 start server.js --name ${appName} --update-env`))
  .then(() => console.log('Deployed successfully.'))
  .catch(error => console.error(error))
  .then(() => process.exit());
const setEnv = (targetPath: string, platform: string, production: boolean) => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const appVersion = require('../../package.json').version;
  const envConfigFile = `export const environment = {
  appVersion: "${appVersion}",
  production: ${production},
  platform: "${platform}",
  awsProxyUrl: 'https://5qwzyqsvol.execute-api.us-west-2.amazonaws.com/production/',
  awsProxyApiKey: "${process.env['AWS_PROXY_API_KEY']}",
  firebase: {
    apiKey:  "${process.env['FIREBASE_API_KEY']}",
    authDomain: "gameblast-a6f01.firebaseapp.com",
    projectId: "gameblast-a6f01",
    storageBucket: "gameblast-a6f01.appspot.com",
    messagingSenderId: "486960411240",
    appId: "1:486960411240:web:82cbd0489e10de3ea881dd",
    measurementId: "G-EC5DV4L24E"
  }
};
`;
  //console.log('The file `environment.ts` will be written with the following content: \n');
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.log(targetPath + " file NOT generated correctly");
      //console.error(err);
      throw err;
    } else {
      console.log(targetPath + " file generated correctly");
      //console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv('./src/environments/environment.ts','web', false);
setEnv('./src/environments/environment.prodWeb.ts','web', true);
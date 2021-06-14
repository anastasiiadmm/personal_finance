const fs = require('fs').promises;
const axios = require("axios");
const path = require('path');
const config = require("./config/config");
const {nanoid} = require('nanoid');


const downloadAvatar = async url => {
  const picResponse = await axios.get(url, {responseType: 'arraybuffer'});
  const avatarFileName = path.join('avatar', nanoid() + '.jpg');
  const avatarFilePath = path.join(config.uploadPath, avatarFileName);
  await tryToCreateDir('avatar');
  await fs.writeFile(avatarFilePath, picResponse.data);
  return avatarFileName;
};

const tryToCreateDir = async dirName => {
  const dirPath = path.join(config.uploadPath, dirName);
  try {
    await fs.access(dirPath);
  } catch (e) {
    await fs.mkdir(dirPath, {recursive: true});
  }
};

const tryToDeleteFile = async (file, dir) => {
  try {
    const filename = file.split('/').pop().split('#')[0].split('?')[0];
    await fs.unlink(config.uploadPath + '/' + dir + '/' + filename);
  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  downloadAvatar,
  tryToCreateDir,
  tryToDeleteFile
};
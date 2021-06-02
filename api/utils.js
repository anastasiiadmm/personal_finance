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

const serializeForm = form => {
  const obj = {};
  const formData = new FormData(form);
  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
};

const tryToCreateDir = async dirName => {
  const dirPath = path.join(config.uploadPath, dirName);

  try {
    await fs.access(dirPath);
  } catch (e) {
    await fs.mkdir(dirPath, {recursive: true});
  }
};

module.exports = {
  downloadAvatar,
  tryToCreateDir,
  serializeForm
};
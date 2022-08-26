const fs = require('fs');
const superagent = require('superagent');

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, (err, data) => {
      if (err) reject('Could not write file');
      resolve('success');
    });
  });
};

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not read file');
      resolve(data);
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro('${__dirname}/dog.txt');
    console.log(`Breed ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    await writeFilePro('dog-img.txt', res.body.message);
    console.log(`random img saved`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

getDogPic();

/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('random img')
  })
  .catch(err => {
    console.log(err.message);
  });
*/

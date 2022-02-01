'use strict';

(async () => {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  const fs = require("fs");
  const path = require('path');

  const INPUT_DIRECTORY = './input/';
  const OUTPUT_DIRECTORY = './output/';

  const files = fs.readdirSync(INPUT_DIRECTORY).filter(file => fs.lstatSync(INPUT_DIRECTORY+file).isFile());
  console.log(files);
  
  const client = new vision.ImageAnnotatorClient();

  const promises = files.map(file => client.textDetection(`${INPUT_DIRECTORY}${file}`));

  const results = await Promise.all(promises);

  console.log(results[0]);
  
  results
  .map(([ result ]) => result)
  .map(({ fullTextAnnotation: { text } }) => text)
  .forEach((text, index) => fs.writeFileSync(`${OUTPUT_DIRECTORY}${files[index]}.txt`, text));

  // results.map(([ result ]) => result)
  // .map(({ textAnnotations }) => textAnnotations)
  // .map(textAnnotations => textAnnotations
  //   .map(({ description }) => description)
  //   .map(e => e.replace(/\s+/g, ' ').trim())
  //   .join(' ')
  // )
  // .forEach(e => console.log(e));
  // .forEach((text, index) => fs.writeFileSync(`${OUTPUT_DIRECTORY}${files[index]}.txt`, text));
})();
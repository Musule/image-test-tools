const sharp = require('sharp');
const chalk = require('chalk');
const fs = require('fs');
const textToSvg = require('text-to-svg');
var program = require('commander');
var basePicture;
var fontSize;
var text;
var color;
var left;
var top;
var newFilePath;
program
    .version('1.0.0')
    .option('-b, --basePicture [type]', '原图路径', "WaterMake/image/watermake.jpg")
    .option('-s, --fontSize [type]', '字体大小', 50,)
    .option('-t, --text [type]', '水印内容', '我是水印')
    .option('-c, --color [type]', '字体颜色','yellow')
    .option('-l, --left [type]', '横坐标位置（像素）', 100)
    .option('-o, --top [type]', '纵坐标位置（像素）', 100)
    .option('-p, --newFilePath [type]', '打完水印后，图片存放位置', "WaterMake/output/watermarked.jpg")
    .parse(process.argv);
console.log(chalk.green.bold('params:'));
if (program.basePicture === undefined) {
    console.log(chalk.green.bold('no basePicture'));
} else if (program.basePicture === true) {
    console.log(chalk.green.bold('add basePicture'));
} else {
    console.log(chalk.green.bold(`add basePicture type ${chalk.blue.bold(program.basePicture)}`));
    basePicture = program.basePicture;
}
if (program.fontSize === undefined) {
    console.log(chalk.green.bold('no fontSize'));
} else if (program.fontSize === true) {
    console.log(chalk.green.bold('add fontSize'));
} else {
    console.log(chalk.green.bold(`add fontSize type ${chalk.blue.bold(program.fontSize)}`));
    fontSize = program.fontSize;
}
if (program.text === undefined) {
    console.log(chalk.green.bold('no text'));;
} else if (program.text === true) {
    console.log(chalk.green.bold('add text'));;
} else {
    console.log(chalk.green.bold(`add text type ${chalk.blue.bold(program.text)}`));
    text = program.text;
}
if (program.color === undefined) {
    console.log(chalk.green.bold('no color'));;
} else if (program.color === true) {
    console.log(chalk.green.bold('add color'));;
} else {
    console.log(chalk.green.bold(`add color type ${chalk.blue.bold(program.color)}`));
    color = program.color;
}
if (program.left === undefined) {
    console.log(chalk.green.bold('no left'));;
} else if (program.left === true) {
    console.log(chalk.green.bold('add left'));;
} else {
    console.log(chalk.green.bold(`add left type ${chalk.blue.bold(program.left)}`));
    left = program.left;
}
if (program.top === undefined) {
    console.log(chalk.green.bold('no top'));;
} else if (program.top === true) {
    console.log(chalk.green.bold('add top'));;
} else {
    console.log(chalk.green.bold(`add top type ${chalk.blue.bold(program.top)}`));
    top = program.top;
}

if (program.newFilePath === undefined) {
    console.log(chalk.green.bold('no newFilePath'));;
} else if (program.newFilePath === true) {
    console.log(chalk.green.bold('add newFilePath'));;
} else {
    console.log(chalk.green.bold(`add newFilePath type ${chalk.blue.bold(program.newFilePath)}`));
    newFilePath = program.newFilePath;
}
addText(
  basePicture,
  {fontSize: Number(fontSize),text: text,color: color,left: Number(left),top: Number(top)},
  newFilePath
);
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const bufferList = []
    stream.on('data', data => {
      bufferList.push(data)
    })
    stream.on('error', err => {
      reject()
    })
    stream.on('end', () => {
      resolve(Buffer.concat(bufferList))
    })
  })
}

function readFileBuffer(basePicture) {
  sharp(basePicture)
    .toBuffer()
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
}

function dealWithStream(basePicture) {
  const readableStream = fs.createReadStream(basePicture)
  const transformer = sharp().resize({
    width: 200,
    height: 200,
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  })
  readableStream.pipe(transformer)

  streamToBuffer(transformer).then(function(newPicBuffer) {
    fs.writeFile(`${__dirname}/static/云雾缭绕2.png`, newPicBuffer, function(
      err
    ) {
      if (err) {
        console.log(err)
      }
      console.log('done')
    })
  })
}

function dealWithBuffer(basePicture) {
  sharp(basePicture)
    .resize(300, 300, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFormat('jpeg')
    .toBuffer()
    .then(function(outputBuffer) {
      fs.writeFile(`${__dirname}/static/云雾缭绕3.jpeg`, outputBuffer, function(
        err
      ) {
        if (err) {
          console.log(err)
        }
        console.log('done')
      })
    })
}
function addWatermark(basePicture, watermarkPicture, newFilePath) {
  sharp(basePicture)
    .rotate(180)
    .composite([
      {
        input: watermarkPicture,
        top: 10,
        left: 10
      }
    ]) 
    .withMetadata()
    .webp({
      quality: 90
    }) 
    .toFile(newFilePath)
    .catch(err => {
      console.log(err)
    })

}

function addText(basePicture, font, newFilePath) {

  const { fontSize, text, color, left, top } = font;
if (font==={}) {
    
}
  const textToSvgSync = textToSvg.loadSync();
  const attributes = {
    fill: color
  };
  const options = {
    fontSize,
    anchor: 'top',
    attributes
  };
  const svgTextBuffer = Buffer.from(textToSvgSync.getSVG(text, options));
  sharp(basePicture)
    //  .rotate(180)
    .composite([
      {
        input: svgTextBuffer,
        top,
        left
      }
    ]) 
    .withMetadata() 
    .webp({
      quality: 90
    }) 
    .toFile(newFilePath).then(()=>{
      console.log(`${chalk.green.bold('Success output file path:')} ${chalk.blue.bold(newFilePath)}`)
    })
    .catch(err => {
      console.log(err)
    });
}

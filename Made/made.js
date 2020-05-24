var sharp = require("sharp");
var chalk = require("chalk");
var program = require('commander');
var imageFormat;
var width;
var height;
var inputImage;
var outputImage;
program
    .version('1.0.0')
    .option('-f, --imageFormat [type]', '生成图片的格式，例如：jpg、jpeg、png、bmp、gif、webp、tiff、svg等', "jpg")
    .option('-w, --width [type]', '生成图片的宽（单位：像素）', 200)
    .option('-e, --height [type]', '生成图片的 图片存放位置', 200)
    .option('-i, --inputImage [type]', '原始图片存放位置', "Made/image/format.jpg")
    .option('-o, --outputImage [type]', '生成图片后，图片所存放的置', "Made/output/format")
    .parse(process.argv);

console.log(chalk.green.bold('params:'));
if (program.imageFormat === undefined) {
    console.log(chalk.green.bold('no imageFormat'));;
} else if (program.imageFormat === true) {
    console.log(chalk.green.bold('add imageFormat'));;
} else {
    console.log(chalk.green.bold(`add imageFormat type ${chalk.blue.bold(program.imageFormat)}`));
    imageFormat = program.imageFormat;
}
if (program.width === undefined) {
    console.log(chalk.green.bold('no width'));;
} else if (program.width === true) {
    console.log(chalk.green.bold('add width'));;
} else {
    console.log(chalk.green.bold(`add width type ${chalk.blue.bold(program.width)}`));
    width = program.width;
}
if (program.height === undefined) {
    console.log(chalk.green.bold('no height'));;
} else if (program.height === true) {
    console.log(chalk.green.bold('add height'));;
} else {
    console.log(chalk.green.bold(`add height type ${chalk.blue.bold(program.height)}`));
    height = program.height;
}
if (program.inputImage === undefined) {
    console.log(chalk.green.bold('no inputImage'));;
} else if (program.inputImage === true) {
    console.log(chalk.green.bold('add inputImage'));;
} else {
    console.log(chalk.green.bold(`add inputImage type ${chalk.blue.bold(program.inputImage)}`));
    inputImage = program.inputImage;
}
if (program.outputImage === undefined) {
    console.log(chalk.green.bold('no outputImage'));;
} else if (program.outputImage === true) {
    console.log(chalk.green.bold('add outputImage'));;
} else {
    console.log(chalk.green.bold(`add outputImage type ${chalk.blue.bold(program.outputImage)}`));
    outputImage = program.outputImage;
}


sharp(inputImage).resize(Number(width), Number(height)).toFile(`${outputImage}.${imageFormat}`, function (err) {
    if (err) {
        console.error(chalk.red.bold(err));
    }
    console.log(chalk.green.bold("Success")+" 执行完毕");
    console.log(chalk.green.bold("Please view file dir")+" Made/output");
})
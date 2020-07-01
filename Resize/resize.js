var sharp = require("sharp");
var chalk = require("chalk");
var program = require('commander');
var inputImage;
var width;
var height;
var outputImage;program
    .version('1.0.0')
    .option('-i, --inputImage [type]', '被修改图片存放位置', "Resize/image/resize.jpg")
    .option('-w, --width [type]', '宽（单位：像素）', 200)
    .option('-e, --height [type]', '高（单位：像素）', 200)
    .option('-o, --outputImage [type]', '被修改后的图片存放位置', "Resize/output/resize.jpg")
    .parse(process.argv);
console.log(chalk.green.bold('params:'));
if (program.inputImage === undefined) {
    console.log(chalk.green.bold('no inputImage'));;
} else if (program.inputImage === true) {
    console.log(chalk.green.bold('add inputImage'));;
} else {
    console.log(chalk.green.bold(`add inputImage type ${chalk.blue.bold(program.inputImage)}`));
    inputImage = program.inputImage;
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
} else if (program.newFileName === true) {
    console.log(chalk.green.bold('add height'));;
} else {
    console.log(chalk.green.bold(`add height type ${chalk.blue.bold(program.height)}`));
    height = program.height;
}
if (program.outputImage === undefined) {
    console.log(chalk.green.bold('no outputImage'));;
} else if (program.newFileName === true) {
    console.log(chalk.green.bold('add outputImage'));;
} else {
    console.log(chalk.green.bold(`add outputImage type ${chalk.blue.bold(program.outputImage)}`));
    outputImage = program.outputImage;
}sharp(inputImage).resize(Number(width), Number(height)).toFile(outputImage, function (err) {
    if (err) {
        console.error(chalk.red.bold(err));
    }
    console.log(chalk.green.bold("Success")+" 执行完毕");
})




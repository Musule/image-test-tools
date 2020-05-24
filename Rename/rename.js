
var fs = require("fs");
var chalk = require("chalk");
var program = require('commander');
var newFileName;
var newFileFormat;
var newFilePath;
program
    .version('1.0.0')
    .option('-n, --newFileName [type]', '图片名称', "Image")
    .option('-f, --newFileFormat [type]', '图片格式', "bmp")
    .option('-p, --newFilePath [type]', '图片存放位置', "image")
    .parse(process.argv);
console.log(chalk.green.bold('params:'));
if (program.newFileName === undefined) {
    console.log(chalk.green.bold('no newFileName'));;
} else if (program.newFileName === true) {
    console.log(chalk.green.bold('add newFileName'));;
} else {
    console.log(chalk.green.bold(`add newFileName type ${chalk.blue.bold(program.newFileName)}`));
    newFileName = program.newFileName;
}
if (program.newFileFormat === undefined) {
    console.log(chalk.green.bold('no newFileFormat'));;
} else if (program.newFileFormat === true) {
    console.log(chalk.green.bold('add newFileFormat'));;
} else {
    console.log(chalk.green.bold(`add newFileFormat type ${chalk.blue.bold(program.newFileFormat)}`));
    newFileFormat = program.newFileFormat;
}
if (program.newFilePath === undefined) {
    console.log(chalk.green.bold('no newFilePath'));;
} else if (program.newFileName === true) {
    console.log(chalk.green.bold('add newFilePath'));;
} else {
    console.log(chalk.green.bold(`add newFilePath type ${chalk.blue.bold(program.newFilePath)}`));
    newFilePath = program.newFilePath;
}
var path = `${__dirname}/${newFilePath}`;
fs.readdir(path, function (err, files) {
    if (err) {
        return console.error(chalk.red(err));
    }
    var n = 0;
    files.forEach(function (file) {
        n++;
        if (file.replace('^.*\.(jpg|gif|png|bmp)$i')) {
            var oldfilePath = path + `/${file}`;
            var newFilePath = `${path}/${newFileName}${n}.${newFileFormat}`;
            console.log(`${chalk.green('Batch Rename Success ')}${chalk.green.blue(newFileName)}${chalk.yellow.bold(n)}.${chalk.blue.bold(newFileFormat)}`);
            fs.rename(oldfilePath, newFilePath, function (error) {
                if (error) {
                    console.error(`${chalk.red(err)}`);
                }

            })
        }
    });
})
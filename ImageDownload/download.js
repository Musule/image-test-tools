const cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var chalk = require('chalk');
var program = require('commander');
var CurrentFilePath=__dirname;
var FilePath;
program
    .version('1.0.0')
    .option('-p, --FilePath [type]', '下载后图片文件存放位置', "image")
    .parse(process.argv);
// 判断是否有入参
console.log(chalk.green.bold('params:'));
if (program.FilePath === undefined) {
    console.log(chalk.green.bold('no FilePath'));;
} else if (program.FilePath === true) {
    console.log(chalk.green.bold('add FilePath'));;
} else {
    console.log(chalk.green.bold(`add FilePath type ${chalk.blue.bold(program.FilePath)}`));
    FilePath = program.FilePath;
}

fs.readFile(`${CurrentFilePath}/index.html`,"utf-8",function(err,data){
    if(err) {
      console.log("index.html loading is failed :"+err);
    }
    else{
        var $ = cheerio.load(data); 
        var tr_list = $('table tr');
        tr_list.each((index, item) => {
            var imgName = $(item).find('td').eq(0).text(); 
            var imgUrl = $(item).find('td').eq(1).text(); 
            var writeStream = fs.createWriteStream(`${CurrentFilePath}/${FilePath}/${imgName}${imgUrl.substring(imgUrl.lastIndexOf('.'))}`); 
            var readStream = request(imgUrl);
            readStream.pipe(writeStream);
            readStream.on('end', function() { 
                console.log(`${chalk.blue.bold(imgName)} ${chalk.blue.bold("Download Finish")} ${chalk.green.bold("Finish")}`);
            });
            readStream.on('error', function() {
                console.log(chalk.red.bold("Error:" + err))
            });
            writeStream.on("finish", function() {
                console.log(`${chalk.blue.bold(imgName)} ${chalk.blue.bold("Save")} ${chalk.green.bold("Success")}`);
                writeStream.end();
            });
        });
    }

});


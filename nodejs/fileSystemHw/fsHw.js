const fs = require('fs');
const path = require('path');

const inputStr = 'one tow three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen tweny';
const file1 = path.join(__dirname, '/file1');
const file2 = path.join(__dirname, '/file2');
const dataTxtFiles = [];
let textStrOutput = '';

fs.writeFile(path.join(__dirname, 'input.txt'), inputStr, (err) => {
    if (err) throw err;
    fs.readFile(path.join(__dirname, 'input.txt'), (err, data) => {
        if (err) throw err;
        let dataStr = data.toString()
        let words = dataStr.split(' ')

        createFiles(words);
    });
});

function createFiles(words) {
    let counter = 0;
    let wordsLengthHalf = Math.ceil((words.length / 2))

    fs.access(file1, (err) => {
        if (err) {
            createfile2();

            fs.mkdir(file1, (err) => {
                if (err) throw err;
                for (i = 0; i < words.length; i++) {
                    counter++
                    if (counter <= wordsLengthHalf) {
                        fs.writeFile(path.join(file1, `${words[i]}.txt`), words[i], (err) => {
                            if (err) throw err;
                        });
                    } else {
                        fs.writeFile(path.join(file2, `${words[i]}.txt`), words[i], (err) => {
                            if (err) throw err;
                        });
                    }
                    if (counter == words.length) {
                        allCheckedfun(wordsLengthHalf, 'file1');
                        allCheckedfun(wordsLengthHalf, 'file2');
                        createOutputFile(words.length)
                    }
                }
            });
        } else {
            for (i = 0; i < words.length; i++) {
                counter++
                if (counter <= wordsLengthHalf) {
                    fs.writeFile(path.join(file1, `${words[i]}.txt`), words[i], (err) => {
                        if (err) throw err;
                    });
                } else {
                    fs.writeFile(path.join(file2, `${words[i]}.txt`), words[i], (err) => {
                        if (err) throw err;
                    });
                }
                if (counter == words.length) {
                    allCheckedfun(wordsLengthHalf, 'file1');
                    allCheckedfun(wordsLengthHalf, 'file2');
                    createOutputFile(words.length)
                }
            }
        }
    });
}

function createfile2() {
    fs.access(file2, (err) => {
        if (err) {
            fs.mkdir(file2, (err) => {
                if (err) throw err;
            });
        } else {
            return false
        }
    });
};

function allCheckedfun(wordsLengthHalf, fileStr) {
    fs.readdir(`${fileStr}`, (err, files) => {
        if (err) throw err;
        if (files.length !== wordsLengthHalf) {
            setImmediate(() => allCheckedfun(wordsLengthHalf, fileStr));
        } else {
            for (let i = 0; i < files.length; i++) {
                fs.readFile(`${fileStr}/${files[i]}`, (err, data) => {
                    if (err) throw err;
                    dataTxtFiles.push(data.toString())
                });
            }
        }
    });
};

function createOutputFile(wordsLength) {
    if (dataTxtFiles.length !== wordsLength) {
        setImmediate(() => createOutputFile(wordsLength));
    } else {
        dataTxtFiles.forEach(element => {
            textStrOutput += `${element} `
            fs.unlink(path.join(__dirname, 'file1', `${element}.txt`), (err) => {
                if (err) {
                    fs.unlink(path.join(__dirname, 'file2', `${element}.txt`), (err) => {
                        if (err) throw err
                    })
                };
            })
        });

        fs.writeFile(path.join(__dirname, `output.txt`), textStrOutput, (err) => {
            if (err) throw err;
        });

        deleteFiles('file1');
        deleteFiles('file2');
    }
};

function deleteFiles(file) {
    fs.rmdir(path.join(__dirname, file), (err) => {
        if (err) {
            setImmediate(() => deleteFiles(file));
        };
    });
};
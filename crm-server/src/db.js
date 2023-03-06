const mongoose = require('mongoose');
const fs = require('fs')
const folderName = 'src/models'

module.exports = () => {
    return new Promise((resolve) => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
            .then(connected => {
                fs.readdir(folderName, (err, files) => {
                    files.forEach(file => {
                        const fileOrder = file.split('.')
                        if (fileOrder[1] === 'model' && fileOrder[2] == 'js') {
                            global[fileOrder[0]] = require(`./models/${fileOrder[0]}.model`);
                        }
                    })
                })
                resolve('CRM DB CONNECTED!')
            },
                err => {
                    console.log(`DB Connecting error :`, err)
                    resolve('DB Connecting error :')
                }
            )
    })
}

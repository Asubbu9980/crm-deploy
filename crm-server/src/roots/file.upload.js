const root = require('express').Router();
const csv = require("csvtojson");
const asyncLoop = require('node-async-loop');
const { errorHandler } = require('../services/ErrorHandler');
const fs = require('fs');


root.post("/upload", (req, res) => {
    const newpath = _root + "/files/";
    const file = req.files.file;
    const filename = file.name;
    // const newpath = __dirname ;
    console.log(newpath)
    const createdBy = req.session.data.employee._id;
    const fileName = `${newpath}${filename}`;

    file.mv(fileName, (err) => {
        if (err) {
            res.status(500).send({ message: "File upload failed", code: 200 });
        }
        csv()
            .fromFile(`${newpath}${filename}`)
            .then(async (jsonObj) => {
                const emailIDs = []
                let data = jsonObj.map(row => {
                    emailIDs.push(row.email)
                    return {
                        clientId: "",
                        createdBy: createdBy,
                        companyName: row.companyName,
                        jobTitle: row.jobTitle,
                        firstName: row?.firstName,
                        lastName: row?.lastName,
                        designation: row?.designation,
                        email: row.email,
                        mobile: row?.mobile,
                        location: row?.location,
                        jobLink: row?.jobLink,
                        companyURL: row?.companyURL,
                        personURL: row?.personURL,
                        status: row?.status ? row?.status : 'N/A',
                        comments: row?.comments,
                    }
                })
                const resp = await Clients.find({ email: { $in: emailIDs } }, { email: 1 });
                data = data.filter((row) => !resp.find(e => e.email === row.email));
                const message = []
                resp.forEach(element => {
                    message.push({
                        email: element.email,
                        status: false,
                        message: "Record already exists"
                    })
                });

                if (data.length !== 0) {
                    asyncLoop(data, async function (query, next) {
                        const { serialNumber, session, opts } = await MongoIdGenerator({ model: "Clients", prefix: "CLI", sufix: "", startNumber: 1, increment: 1 });
                        const clientId = serialNumber;
                        try {
                            query.clientId = clientId;
                            const resp = await Clients(query).save(opts);
                            await session.commitTransaction();
                            session.endSession();
                            message.push({
                                email: query.email,
                                status: true,
                                message: "Successfully uploaded"
                            })

                        } catch (err) {
                            await session.abortTransaction();
                            message.push({
                                status: false,
                                email: query.email,
                                message: err.message
                            })

                        } finally {
                            next();
                        }

                    }, async function (err) {
                        if (fs.existsSync(fileName)) {
                            fs.unlink(fileName, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('deleted');
                            })
                        }
                        if (err) {
                            let errorMsg = await errorHandler(err);
                            ResponseService.error(res, errorMsg, err);
                            return;
                        };
                        ResponseService.success(res, "Records Added successfully", message);
                    });
                } else {
                    ResponseService.success(res, "Records already exists", message);
                }
            })

    });

});


module.exports = root;
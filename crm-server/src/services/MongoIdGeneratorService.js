
const mongoose = require('mongoose');
var schema = mongoose.Schema
var serialNumberSchema = new schema({
    model: { type: String, unique: true },
    prefix: { type: String },
    sufix: { type: String },
    startNumber: { type: Number },
    increment: { type: Number },
    currentNumber: { type: Number }
})

const serialNumber = mongoose.model('serial_number', serialNumberSchema)

module.exports = async function ({ model, prefix = "", sufix = "", startNumber = 1, increment = 1 }) {
    const session = await global[model].startSession();
    session.startTransaction();
    const opts = { session };
    const currentSerialNumber = await serialNumber.findOne({ model });
    if (currentSerialNumber) {
        const number = currentSerialNumber.currentNumber + increment;

        const respUpdate = await serialNumber.updateOne({ model }, {
            $set: {
                currentNumber: number
            }
        }, opts)
        let num = "";
        if (currentSerialNumber.prefix) {
            num += currentSerialNumber.prefix
        }
        num += number;
        if (currentSerialNumber.sufix) {
            num += currentSerialNumber.sufix
        }
        return {
            serialNumber: num,
             session: session,
            opts
        }
    } else {
        await serialNumber({
            model, prefix, sufix, startNumber, increment, currentNumber: startNumber
        }).save(opts);
        let num = "";
        if (prefix) {
            num += prefix
        }
        num += startNumber;
        if (sufix) {
            num += sufix
        }
        return {
            serialNumber: num,
            session: session,
            opts
        }
    }
}
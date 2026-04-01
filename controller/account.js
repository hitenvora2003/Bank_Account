const account = require('../model/account')


exports.createdata = async (req, res) => {
    try {
        let passdata = req.body
        // passdata.image = req.file.filename
        const data = await account.create(passdata)

        let formattedData = {
            ...data._doc,
            bank_balance: data.bank_balance.toLocaleString('en-IN')
        }
        res.status(200).json({
            status: 'success',
            Message: 'date create successfully',
            data: formattedData
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            Message: error.message

        })
    }
}
exports.deletedata = async (req, res) => {
    try {

        const deleteid = req.params.deleteid
        const deletedata = await account.findByIdAndDelete(deleteid)
        if (!deletedata) {
            return res.status(404).json({
                status: "fail",
                message: "account not found"
            });
        }
        res.status(200).json({
            status: 'success',
            Message: 'date delete successfully',
            data: deletedata
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message

        })
    }
}
exports.updatedata = async (req, res) => {
    try {

        const updateid = req.params.updateid
        const updatedata = await account.findByIdAndUpdate(updateid,req.body,{new : true})
        if (!updatedata) {
            return res.status(404).json({
                status: "fail",
                message: "account not found"
            });
        }
        res.status(200).json({
            status: 'success',
            Message: 'date update successfully',
            data: updatedata
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message

        })
    }
}
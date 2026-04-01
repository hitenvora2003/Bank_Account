const user = require('../model/user')
const account = require('../model/account')

exports.getalldata = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const types = req.query.type;

        if (!types) {
            const [users, accounts, totalUsers, totalAccounts] = await Promise.all([
                user.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                account.find().populate("name").sort({ createdAt: -1 }).skip(skip).limit(limit),
                user.countDocuments(),
                account.countDocuments()
            ]);

            // 🔹 account formatting
            const formattedAccounts = accounts.map(acc => ({
                ...acc._doc,
                bank_balance: acc.bank_balance.toLocaleString('en-IN')
            }));

            return res.status(200).json({
                status: 'success',
                page,
                limit,
                message: 'pagination successfully',
                totalUsers,
                totalAccounts,

                totalUserPages: Math.ceil(totalUsers / limit),
                totalAccountPages: Math.ceil(totalAccounts / limit),

                data: { 
                    users, 
                    accounts: formattedAccounts   // 👈 formatted data
                }
            });
        }

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}
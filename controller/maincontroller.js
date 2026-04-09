const user = require('../model/user');
const account = require('../model/account');

exports.getalldata = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const type = req.query.type?.toLowerCase();

        // 🔹 CASE 1: No type → return both
        if (!type) {
            const [users, accounts, totalUsers, totalAccounts] = await Promise.all([
                user.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
                account.find().populate("name").sort({ createdAt: -1 }).skip(skip).limit(limit),
                user.countDocuments(),
                account.countDocuments()
            ]);

            const formattedAccounts = accounts.map(acc => ({
                ...acc._doc,
                bank_balance: acc.bank_balance
                    ? acc.bank_balance.toLocaleString('en-IN')
                    : "0"
            }));

            return res.status(200).json({
                status: 'success',
                message: 'pagination successfully',
                page,
                limit,
                totalUsers,
                totalAccounts,
                totalUserPages: Math.ceil(totalUsers / limit),
                totalAccountPages: Math.ceil(totalAccounts / limit),
                data: {
                    users,
                    accounts: formattedAccounts
                }
            });
        }

        // 🔹 CASE 2: Only Users
        if (type === "user") {
            const users = await user.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalUsers = await user.countDocuments();

            return res.status(200).json({
                status: "success",
                page,
                limit,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                data: users
            });
        }

        // 🔹 CASE 3: Only Accounts
        if (type === "account") {
            const accounts = await account.find()
                .populate("name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalAccounts = await account.countDocuments();

            const formattedAccounts = accounts.map(acc => ({
                ...acc._doc,
                bank_balance: acc.bank_balance
                    ? acc.bank_balance.toLocaleString('en-IN')
                    : "0"
            }));

            return res.status(200).json({
                status: "success",
                page,
                limit,
                totalAccounts,
                totalPages: Math.ceil(totalAccounts / limit),
                data: formattedAccounts
            });
        }

        // 🔹 CASE 4: Invalid type
        return res.status(400).json({
            status: "fail",
            message: "Invalid type. Use 'user' or 'account'"
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
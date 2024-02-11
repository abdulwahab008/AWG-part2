const receiveloanModel = require('../models/receiveloanModel');


async function receiveLoan(req, res) {
    try {
        const { date, transaction_id, name, amount, loan_type, installment_amount, total_installment, installment_number, remaining_amount } = req.body;

        // Save received loan data to the database
        const savedLoanId = await receiveloanModel.saveReceivedLoan(
            date,
            transaction_id,
            name,
            amount,
            loan_type,
            installment_amount,
            total_installment,
            installment_number,
            remaining_amount
        );

        // Dummy response for testing
        const response = {
            id: savedLoanId,
            date,
            transaction_id,
            name,
            amount,
            loan_type,
            installment_amount,
            total_installment,
            installment_number,
            remaining_amount,
        };

        // Send the response
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function searchTransaction(req, res) {
    try {
        const { transaction_id } = req.body;

        const giveloanResult = await receiveloanModel.searchTransactionByTransactionId(transaction_id, 'giveloan');
const receiveloanResult = await receiveloanModel.searchTransactionByTransactionId(transaction_id, 'receiveloan');

        console.log('giveloanResult:', giveloanResult);
        console.log('receiveloanResult:', receiveloanResult);


        if (giveloanResult.length > 0 && receiveloanResult.length > 0) {
            // Transaction ID exists in both giveloan and receiveloan tables, fetch data from receiveloan table
            const data = {
                table: 'receiveloan',
                name: receiveloanResult[0].name,
                amount: receiveloanResult[0].remaining_amount || 0,
            };
            res.status(200).json(data);
        } else if (giveloanResult.length > 0) {
            // Transaction ID exists in giveloan table, fetch data from giveloan table
            const data = {
                table: 'giveloan',
                name: giveloanResult[0].name,
                amount: giveloanResult[0].amount,
            };
            res.status(200).json(data);
        }  else {
            // Transaction not found in either table
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getMonthlyInstallmentAmountHandler(req, res) {
    try {
        const { transaction_id } = req.body;

        const result = await receiveloanModel.getMonthlyInstallmentAmount(transaction_id);

        if (result.length > 0) {
            const data = {
                monthly_installment_amount: result[0].monthly_installment,
                installment: result[0].installment,
            };
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fetchAllData(req, res) {
    try {
        const data = await receiveloanModel.fetchAllData();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function deleteLoan(req, res) {
    try {
        const { transactionId } = req.params;

        // Call the deleteLoan method from your model
        await receiveloanModel.deleteLoan(transactionId);

        res.status(200).json({ success: true, message: 'Loan deleted successfully.' });
    } catch (error) {
        console.error('Error deleting loan:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
module.exports = { receiveLoan, searchTransaction, getMonthlyInstallmentAmountHandler, fetchAllData, deleteLoan };

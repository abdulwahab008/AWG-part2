const salesModel = require('../models/salesModel');
const stockModel = require('../models/inventory');
const commissionModel = require('../models/commissionModel');
const closingModel = require('../models/closingModel');
const giveLoanModel = require('../models/giveLoanModel');
const receiveLoanModel = require('../models/receiveLoanModel');
async function generateReport(req, res) {
    try {
      const reportType = req.body.reportType;
      const fromDate = req.body.fromDate;
      const toDate = req.body.toDate;
  
      let reportData;
  
      switch (reportType) {
        case 'sales':
          // Add logic to filter sales data by date range
          reportData = await salesModel.getSalesReport({ fromDate, toDate });
          break;
        case 'stock':
          // Add logic to filter stock data by date range
          reportData = await stockModel.getStockReport({ fromDate, toDate });
          break;
        case 'commission':
          // Add logic to filter commission data by date range
          reportData = await commissionModel.getCommissionReport({ fromDate, toDate });
          break;
        case 'closing':
          // Add logic to filter closing data by date range
          reportData = await closingModel.getClosingReport({ fromDate, toDate });
          break;
          case 'giveloan':
            // Add logic to filter give loan data by date range
            reportData = await giveLoanModel.giveLoanReport({ fromDate, toDate });
            break;
          case 'receiveloan':
            // Add logic to filter receive loan data by date range
            reportData = await receiveLoanModel.getReceiveLoanReport({ fromDate, toDate });
            break;
        default:
          return res.status(400).json({ success: false, error: 'Invalid report type' });
      }
  
      res.json({ success: true, reportData });
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    generateReport,
  };
const curtomer = require("../models/curtomer");

class customerService {
    async createInformationCustomer(idCustomer, dataInformationCustomer) {
        const newCustomer = new curtomer({ _id: idUser, ...dataInformationCustomer });
        const responseSaveNewUser = await newCustomer.save();
    }
    async updateInformation(idCustomer, newDataInformationCustomer) {
        return await curtomer.updateOne({ _id: idCustomer }, { _id: idCustomer, ...newDataInformationCustomer })
    }
    findCustomerBuyId(idCustomer) {
        return curtomer.findOne({
            _id: idCustomer, phoneNumberOder: { $exists: true, $ne: "" }, address: { $exists: true, $ne: "" }, fullName: { $exists: true, $ne: "" }
        })
    }


}
module.exports = new customerService();
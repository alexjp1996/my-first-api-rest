const { Message } = require('../../utils/Messages');

const message = new Message();
const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

class repositoryServices {

    async getQuotation(brandId, lineId) {
        try {
            const params = {
                TableName: 'quotation-car',
                Key: {
                    'brand': brandId,
                    'line': lineId
                }
            }
            return await dynamodb.get(params).promise().then((response) => {
                let res;
                if(response.Item != undefined){
                  res = message._200_OK;
                  res.model.data = response.Item;
                } else {
                    res = message._404_CAR_NOT_FOUND;
                }
                return res;
            }, (error) => {
                    const resError = message._500_UNCONTROLLER_ERROR;
                    resError.model.message = "Ocurrió el siguiente error: " + error.message;
                    return resError;
            });
        } catch(err){
            const r = message._500_UNCONTROLLER_ERROR;
            r.model.message = "Error desconocido: " + err.message;
            return r;
        }
    }

    async getCar(brandId, lineId) {
        try {
            const params = {
                TableName: 'car-list-concessionary',
                Key: {
                  'brand': brandId,
                  'line': lineId
                }
              }
              return await dynamodb.get(params).promise().then((response) => {
                let res;
                if(response.Item != undefined){
                    res = message._200_OK;
                    res.model.data = response.Item;
                } else {
                    res = message._404_CAR_NOT_FOUND;
                }
                return res;
              }, (error) => {
                const resError = message._500_UNCONTROLLER_ERROR;
                resError.model.message = "Ocurrió el siguiente error: " + error.message;
                return resError;
              });
        } catch(err){
            const r = message._500_UNCONTROLLER_ERROR;
            r.model.message = "Ocurrió el siguiente error: " + err.message;
            return r;
        }
    }
      
    async reserveCar(requestBody) {
        try {
            const params = {
                TableName: 'reserved-cars',
                Item: requestBody
            }
            return await dynamodb.put(params).promise().then(() => {
                return message._200_OK;
            }, (error) => {
                const resError = message._500_UNCONTROLLER_ERROR;
                resError.model.message = "Ocurrió el siguiente error: " + error.message;
                return resError;
            })
        } catch(err){
            const r = message._500_UNCONTROLLER_ERROR;
            r.model.message = "Ocurrió el siguiente error: " + err.message;
            return r;
        }
    }
}

module.exports = {repositoryServices};

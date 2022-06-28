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
                  res = { "code": 200, "model": {"code": "OPERATION_SUCCESSFUL", "message": "Operación Exitosa"}};
                  res.model.data = response.Item;
                } else {
                    res = { "code": 404, "model": {"code": "BRAND_NOT_FOUND", "message": "El carro no existe"}};
                }
                return res;
            }, (error) => {
                    const resError = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
                    resError.model.message = "Ocurrió el siguiente error: " + error.message;
                    return resError;
            });
        } catch(err){
            const r = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
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
                    res = { "code": 200, "model": {"code": "OPERATION_SUCCESSFUL", "message": "Operación Exitosa"}};
                    res.model.data = response.Item;
                } else {
                    res = { "code": 404, "model": {"code": "BRAND_NOT_FOUND", "message": "El carro no existe"}};
                }
                return res;
              }, (error) => {
                const resError = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
                resError.model.message = "Ocurrió el siguiente error: " + error.message;
                return resError;
              });
        } catch(err){
            const r = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
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
                return { "code": 200, "model": {"code": "OPERATION_SUCCESSFUL", "message": "Operación Exitosa"}};
            }, (error) => {
                const resError = _500_UNCONTROLLER_ERROR = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
                resError.model.message = "Ocurrió el siguiente error: " + error.message;
                return resError;
            })
        } catch(err){
            const r = _500_UNCONTROLLER_ERROR = { "code": 500, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
            r.model.message = "Ocurrió el siguiente error: " + err.message;
            return r;
        }
    }
}

module.exports = {repositoryServices};

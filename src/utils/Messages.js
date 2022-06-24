class ResponseCode {
    _200_OK = 200;
    _404_CAR_NOT_FOUND = 404;
    _500_UNCONTROLLER_ERROR = 500;
}

class Message {
    _200_OK = { "code": ResponseCode._200_OK, "model": {"code": "OPERATION_SUCCESSFUL", "message": "Operación Exitosa"}};
    _404_CAR_NOT_FOUND = { "code": ResponseCode._404_CAR_NOT_FOUND, "model": {"code": "BRAND_NOT_FOUND", "message": "El carro no existe"}};
    _500_UNCONTROLLER_ERROR = { "code": ResponseCode._500_UNCONTROLLER_ERROR, "model": {"code": "UNCONTROLLER_ERROR", "message": "Ocurrió un error desconocido"}};
}

module.exports = {ResponseCode, Message}

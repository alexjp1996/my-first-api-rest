const {repositoryServices} =  require('./src/driven/repository/repositoryServices');
const repositories = new repositoryServices();

exports.validateHandler = async function(event) {
  const res = await repositories.getCar(event.queryStringParameters.brand, event.queryStringParameters.line);
  return {
    "isBase64Encoded": true,
    "statusCode": res.code,
    "headers": {},
    "body": JSON.stringify(res.model)
  }
}

exports.quotationHandler = async function(event) {
  const res = await repositories.getQuotation(event.queryStringParameters.brand, event.queryStringParameters.line);
  return {
    "isBase64Encoded": true,
    "statusCode": res.code,
    "headers": {},
    "body": JSON.stringify(res.model)
  }
}

exports.reserveHandler = async function(event) {
  const res = await repositories.reserveCar(JSON.parse(event.body));
  return {
    "isBase64Encoded": true,
    "statusCode": res.code,
    "headers": {},
    "body": JSON.stringify(res.model)
  }
}

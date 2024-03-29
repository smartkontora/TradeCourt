// const axios = require('axios');
const AppError = require('../utils/appError');
const catchAsync = require('./catchAsync');
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.ALCHEMY_HTTP)
);

exports.signatureVerify = catchAsync(async (req, res, next) => {
  const address = req.body.address;
  const messageRaw = req.body.messageRaw;
  const messageSignature = req.body.signature;

  if (!(address && messageRaw && messageSignature)) {
    return next(
      new AppError('Cannot verify signature some args are missing', 400)
    );
  }
  const signer = await web3.eth.accounts.recover(messageRaw, messageSignature);
  if (signer.toLowerCase() != address.toLowerCase()) {
    return next(new AppError('Wrong signature', 400));
  }
  return next();
});

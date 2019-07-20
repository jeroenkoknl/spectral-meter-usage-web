// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var meter$usage_pb = require('./meter-usage_pb.js');

function serialize_main_GetMeasurementsRequest(arg) {
  if (!(arg instanceof meter$usage_pb.GetMeasurementsRequest)) {
    throw new Error('Expected argument of type main.GetMeasurementsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_GetMeasurementsRequest(buffer_arg) {
  return meter$usage_pb.GetMeasurementsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_main_Measurement(arg) {
  if (!(arg instanceof meter$usage_pb.Measurement)) {
    throw new Error('Expected argument of type main.Measurement');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_main_Measurement(buffer_arg) {
  return meter$usage_pb.Measurement.deserializeBinary(new Uint8Array(buffer_arg));
}


var MeterUsageService = exports.MeterUsageService = {
  getMeasurements: {
    path: '/main.MeterUsage/GetMeasurements',
    requestStream: false,
    responseStream: true,
    requestType: meter$usage_pb.GetMeasurementsRequest,
    responseType: meter$usage_pb.Measurement,
    requestSerialize: serialize_main_GetMeasurementsRequest,
    requestDeserialize: deserialize_main_GetMeasurementsRequest,
    responseSerialize: serialize_main_Measurement,
    responseDeserialize: deserialize_main_Measurement,
  },
};

exports.MeterUsageClient = grpc.makeGenericClientConstructor(MeterUsageService);

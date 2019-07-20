const services = require('./meter-usage_grpc_pb');
const messages = require('./meter-usage_pb');
const grpc = require('grpc');
// import * as messages from './meter-usage_pb';


function main() {
    const client = new services.MeterUsageClient('localhost:50051',
                                            grpc.credentials.createInsecure());

    const call = client.getMeasurements( new messages.GetMeasurementsRequest());
    call.on('data', function(measurement) {
        console.log('Found measurement:', measurement.getTimestamp(), measurement.getMetervalue())
    });
}

main();
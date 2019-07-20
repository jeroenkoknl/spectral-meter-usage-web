const services = require('./meter-usage_grpc_pb');
const messages = require('./meter-usage_pb');
const grpc = require('grpc');
var express = require("express");

const client = new services.MeterUsageClient('localhost:50051',
                                            grpc.credentials.createInsecure());

function runGetMeasurements(callback) {
    const measurements = [];
    const call = client.getMeasurements( new messages.GetMeasurementsRequest());
    call.on('data', function(measurement) {
        measurements.push(measurement);
    });
    call.on('end', () => callback(null, measurements));
    call.on('error', callback);
}

function main() {

    const app = express();

    app.use(express.static('public'));

    app.get('/api/measurements', (req, res, next) => {
        runGetMeasurements((err, measurements) => {
            if (err) {
                next(err);
            } else {
                res.json(measurements.map((measurement) => ({ 
                    timestamp: new Date(measurement.getTimestamp()*1000).toISOString(),
                    metervalue: measurement.getMetervalue(),
                })));
            }
        })
    });
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main();
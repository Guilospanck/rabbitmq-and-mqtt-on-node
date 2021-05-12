// import amqp from 'amqplib/callback_api'
var amqp = require('amqplib/callback_api');

// as the publisher (sender), it connectos to the amqp and to the channel (it is the same as the publisher in order to listen to the messages)
amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var queue = 'hello' // same queue as publisher

        channel.assertQueue(queue, {
            durable: false
        })

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)

        channel.consume(queue, (msg) => {
            console.log(' [x] Received %s', msg.content.toString())
        }, {
            noAck: true
        })
    })

})
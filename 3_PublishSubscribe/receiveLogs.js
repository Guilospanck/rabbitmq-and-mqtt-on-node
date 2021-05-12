var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var exchange = 'logs' // same exchange as the emitter (sender, publisher)
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        })

        // declare queue. If no name is passed, it will be automatically generated.
        channel.assertQueue('', {
            exclusive: true // if true, when the connection that declared the queue closes, it [the queue] will be deleted
        }, (error2, q) => {
            if(error2){
                throw error2
            }

            console.log(' [*] Waiting for messages in %s. To exit press CTRL+C.', q.queue)

            // Bind queue to the exchange
            channel.bindQueue(q.queue, exchange, '')

            // consume the message
            channel.consume(q.queue, (msg) => {
                if(msg.content){
                    console.log(' [x] %s', msg.content.toString())
                }
            }, {
                noAck: true
            })
        })

    })
})
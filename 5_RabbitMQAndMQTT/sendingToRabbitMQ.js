var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var exchange = 'rabbitMQAndMqttExchange'
        var msg = JSON.stringify({
            name: 'Guilherme',
            city: 'Divicity',
            age: 25
        })

        channel.assertExchange(exchange, 'fanout', {
            durable: true
        })

        channel.publish(exchange, '', Buffer.from(msg))
        console.log(' [x] Sent %s', msg)
    })

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
})
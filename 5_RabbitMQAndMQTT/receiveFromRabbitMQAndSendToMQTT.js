var amqp = require('amqplib/callback_api');
var publishToMQTT = require('../4_MQTT/index')

amqp.connect('amqp://localhost', (error0, connection) => {
    if(error0){
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if(error1){
            throw error1
        }

        var exchange = 'rabbitMQAndMqttExchange'
        channel.assertExchange(exchange, 'fanout', {
            durable: true
        })

        channel.assertQueue('', {
            exclusive: true
        }, (error2, q) => {
            if(error2){
                throw error2
            }

            console.log(' [*] Waiting for messages in %s. To exit press CTRL+C.', q.queue)

            channel.bindQueue(q.queue, exchange, '')

            channel.consume(q.queue, (msgFromRabbitMQ) => {
                if(msgFromRabbitMQ.content){
                    console.log(' [x] %s', msgFromRabbitMQ.content.toString())

                    // publish to MQTT
                    var topic = 'Fibo/HelloDarkness/Guilherme'
                    publishToMQTT(topic, msgFromRabbitMQ.content.toString())
                }
            }, {
                noAck: true
            })
        })
    })
})
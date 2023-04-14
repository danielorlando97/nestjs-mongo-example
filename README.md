## NestJS + Mongo + RedisQueue

    Project implemented as part of a candidate selection process.

### Problem

This project describes the operation of a restaurant chain where the concepts **Client**, **Restaurants** and **Orders** are handled. The restaurants only accept customers of legal age. One or several orders describe what a customer ordered at a given restaurant. Each of the orders to be registered takes a random time between 3-10 seconds to be ready.

### Description of implementation

Three entities Client, Restaurant and Order were defined. Each restaurant has a client list and each order has a restaurant and a client.

To create a new order with a Client and a Restaurant we check that the client is in the list of that restaurant.

A NestJS event layer was implemented to simulate a cascading deletion. So when a client is deleted the `client.delete` event is fired and when a restaurant is deleted the `restaurant.delete` event is fired.

Finally, to describe the processes of entry and exit of the kitchen we implemented a queue in redis. Each order created starts in a pending state and enters the queue with a random delay within the described range. When this order leaves the queue, the state of the order is modified to ready.

### Execution and testing

For the execution of the project we defined a docker configuration that connects the api with the necessary infrastructure and executes the project. Therefore to start the api you only need to run the following command.

```bash
$> docker-compose up
```

Finally for the testing process we attached a **Postman** collection with which you can test each of the endpoints.

_Note_: All the functionalities that occur in the system background can be seen in the api logs.

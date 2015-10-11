# github-webhooker

This catchy name hides node module to handle github webhooks, inspired from [github-webhook-handler](https://github.com/rvagg/github-webhook-handler).

It's more like a library that will help you to handle [github webhooks](https://developer.github.com/webhooks/), all on the same URL.

## Installation and usage

Just `npm install github-webhooker --save` and use it like the following example.

## Example

    var http = require('http');
    var handler = require('github-webhooker');

    var repos = [{name: 'repoName', 'secret': 'auth-secret'}];

    repos.forEach(function(rawRepo) {
      handler.addRepository(rawRepo.name, rawRepo.secret);
    });

    http.createServer(function (req, res) {
      handler.handle(req, res);
    }).listen(9876);

    handler.on('push', function (event) {
      console.log('push on ' + event.repository.name + ', branch' + event.request.getBranch());
    });

    handler.on('*', function (event) {
      console.log('something happens on ' + event.repository.name + ', ' + event.name);
    });

## Api

The only function of the handler[[Handler](lib/Handler.ts)] is `addRepository`, which allows you, as explicitely said in its name, add a repository.

The hanlder triggers events everytime a request is received from Github to a configured repository. The events emitted depends on those configured in your repositories webhooks.
In addition, you have the wildcard event emitted `*`, which allows you to do whatever you want everytime a request is done, regardless of its type.

Event given to your callback will contains the following properties:

* `name`: [string], the name of the event
* `repository`: [[Repository](lib/Repository.ts)], the repository that triggered the webhook
* `request`: [[Request](lib/Request.ts)], the request of the webhook

/// <reference path="../typings/node/node.d.ts" />

import events = require('events');
import http = require('http');
import {Request} from './Request';
import {Repository} from './Repository';

export class Handler extends events.EventEmitter {
  public repositories:{[name: string] : Repository; } = {};

  public addRepository(name:string, secret:string) {
    this.repositories[name] = new Repository(name, secret);
  }

  public handle(request:http.ServerRequest, response:http.ServerResponse) {
    var rawBody:string = '';
    request.on('data', (chunk:string) => {
      rawBody += chunk;
    });

    request.on('end', () => {
      var githubRequest:Request = new Request(request.headers, rawBody);
      var repo:Repository = this.repositories[githubRequest.getRepositoryName()];
      if(repo && repo.isSignatureValid(githubRequest)) {
        var event:string = githubRequest.getEvent();
        var emitData = {
          name: event,
          request: request,
          repository : repo
        };

        this.emit(event, emitData);
        this.emit('*', emitData);
      }
    });
    response.writeHead(200);
    response.end();
  }
}

/// <reference path="../typings/node/node.d.ts" />

import crypto = require('crypto');
import {Request} from './Request';

export class Repository {
  constructor(public name:string, public secret:string) {
  }

  public isSignatureValid (request:Request):boolean {
    if (!this.secret) {
      return true;
    }
    var signature:string = 'sha1=' + crypto.createHmac('sha1', this.secret).update(request.rawBody).digest('hex');

    return signature === request.getSignature();
  }
}

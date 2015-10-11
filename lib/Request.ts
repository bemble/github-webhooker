export class Request {
  public body:any;

  constructor(public headers:any, public rawBody:string) {
    this.body = JSON.parse(this.rawBody);
  }

  public getSignature():string {
    return this.headers['x-hub-signature'];
  }

  public getEvent():string {
    return this.headers['x-github-event'];
  }

  public getBranch():string {
    return /^.+\/(\w+)$/.exec(this.body.ref)[1];
  }

  public getRepositoryName():string {
    return this.body.repository.name;
  }
}

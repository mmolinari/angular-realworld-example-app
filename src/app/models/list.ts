export class List {
  public lastPulledAt?: Date;

  constructor(public id?: string,
              public name?: string,
              public closed?: boolean,
              public idBoard?: string,
              public pos?: number,
              public subscribed?: boolean) {
  }
}

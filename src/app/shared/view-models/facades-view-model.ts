import {FacadeModel} from '../models/facade.model';

export class FacadesViewModel {
  public categories: Array<FacadeModel>;
  public accounts: Array<FacadeModel>;

  constructor() {
    this.categories = new Array<FacadeModel>();
    this.accounts = new Array<FacadeModel>();
  }
}

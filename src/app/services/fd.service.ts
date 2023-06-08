import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FdService {

  constructor() { }

  isBool(param: any) {
    return param === true || param === false;
  };

  isNum(param: any) {
    return typeof param === 'number';
  };

  isStr(param: any) {
    return typeof param === 'string' || param instanceof String;
  };

  isObj(param: any) {
    return typeof param === 'object' && param !== null;
  };

  isArr(param: any) {
    return param instanceof Array;
  };

  create(obj: any) {
    const formData = new FormData();

    Object.keys(obj)
      .forEach((key: string) => {
        const value = obj[key];

        if (!value) {
          return false;
        } else if (this.isNum(value) || this.isBool(value) || this.isStr(value)) {
          return formData.append(key, value.toString());
        } else if (this.isObj(value) || this.isArr(value)) {
          return formData.append(key + '[]', JSON.stringify(value));
        } else {
          return false;
        }
      });

    return formData;
  }

}

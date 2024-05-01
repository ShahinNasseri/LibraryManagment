import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  shamsiDateTimeFormat: string = 'jYYYY-jMM-jDD HH:mm:ss';
  miladiDateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss';
  shamisDateTimeFormatWithOutTime: string = 'jYYYY-jMM-jDD';
  miladiDateTimeFormatWithOutTime: string = 'YYYY-MM-DD';

  constructor() {}

  /**
   * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
   */
  get exactMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'exact',
    };
  }

  /**
   * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
   */
  get subsetMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'subset',
    };
  }

  /**
   * Generates a random id
   * @param length
   */
  public randomId(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }


  public isNullOrWhiteSpace(input: string | null): boolean {
    return (
      typeof input === 'undefined' ||
      input == null ||
      input.replace(/\s/g, '').length < 1
    );
  }

  public  arraysAreEqual(array1: any[], array2: any[]) {
    if (array1.length !== array2.length) {
      return false; // Different lengths, cannot be equal
    }

    // Sort the arrays and compare the sorted versions
    const sortedArray1 = [...array1].sort();
    const sortedArray2 = [...array2].sort();

    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false; // Values at corresponding positions are different
      }
    }

    return true;
  }

  public generateRandomNumber(min: number = 1 , max: number = 100): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public deepCopy(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    let copy: any;

    if (Array.isArray(obj)) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
    } else {
      copy = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = this.deepCopy(obj[key]);
        }
      }
    }

    return copy;
  }


  /**
  * Get milladi date now
  */
  miladiDateNow(justDate: boolean = false): any {
    const d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    if (justDate)
      return `${[year, month, day].join('-')}`;

    return `${[year, month, day].join('-')} ${[hour, min, sec].join(':')}`;
  }

}

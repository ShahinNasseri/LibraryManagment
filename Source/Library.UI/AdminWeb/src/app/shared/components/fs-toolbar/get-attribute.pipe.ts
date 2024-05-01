import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAttribute',
})
export class GetAttributePipe implements PipeTransform {
  transform(value: any, attName: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value.html, 'text/html');
    const elem = doc.getElementsByTagName('i')[0];
    return elem && elem.getAttribute(attName);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {

  constructor(private dom: DomSanitizer){

  }

  transform(value:any){
    console.log(value);
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }

}

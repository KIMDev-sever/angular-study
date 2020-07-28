import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  imageUpload(file: File) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

  }
}

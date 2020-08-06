import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  corsHeaders: HttpHeaders;
  imageSrc: string | ArrayBuffer;
  constructor(
    private httpClient: HttpClient
  ) { }

  imageUpload(file: File): Promise<object>[] {
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-const
    let promiseList: Promise<object>[] = [];
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const reader = new FileReader();
    reader.readAsDataURL(file); // 이미지 파일을 읽어 Base64로 인코딩취득
    reader.onload = () => {
      this.imageSrc = String(reader.result).replace(/^data:image\/jpeg;base64,/, '');
      console.log(this.imageSrc);
      promiseList.push(this.httpClient.post('http://localhost:3000/createImg',
      { body: this.imageSrc  }, { headers: this.corsHeaders }).toPromise());
    };
    // console.log(reader.);
    return promiseList; // 파일저장
  }
}

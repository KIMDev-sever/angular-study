import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  corsHeaders: HttpHeaders;
  imageSrc: string | ArrayBuffer;
  behaviorSubject = new BehaviorSubject<string>(null);
  constructor(
    private httpClient: HttpClient,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) {
  }

  imageUpload(file: File): Promise<object> {
    // tslint:disable-next-line:one-variable-per-declaration
    // tslint:disable-next-line:prefer-const
    let promise: Promise<object>;
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const reader = new FileReader();
    reader.readAsDataURL(file); // 이미지 파일을 읽어 Base64로 인코딩취득
    return this.getImageSrc(reader).then((value: string) => {
      return this.httpClient.post('http://localhost:3000/createImg',
        { body: value, fileName: file.name }, { headers: this.corsHeaders }).toPromise();
    });
  }

  getImageSrc(reader: FileReader): Promise<string> {
    return new Promise((resolve, reject) => {
      reader.onload = (() => {
        resolve(String(reader.result).replace(/^data:image\/jpeg;base64,/, '')); // 정규표현식 사용 필요
      });
    });
  }
  // tslint:disable-next-line:typedef
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  // tslint:disable-next-line:typedef
  setStringdata(data: string) {
    this.behaviorSubject.next(data);
  }
  // tslint:disable-next-line:typedef
  getStringdata(){
    return this.behaviorSubject.asObservable();
  }
}

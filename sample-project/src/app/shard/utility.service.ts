import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  // tslint:disable:typedef
  // tslint:disable:variable-name
  corsHeaders: HttpHeaders;
  imageSrc: string | ArrayBuffer;

  string_data_subject = new BehaviorSubject<string>(null);
  send_loadingSW = new BehaviorSubject<boolean>(null);
  loginState = new BehaviorSubject<boolean>(null);
  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
  }

  imageUpload(file: File): Promise<object> {
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:prefer-const
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

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  setlogined(state: boolean) {
    this.loginState.next(state);
  }
  getlogined() {
    return this.loginState.asObservable();
  }
  setStringdata(data: string) {
    this.string_data_subject.next(data);
  }

  getStringdata() {
    return this.string_data_subject.asObservable();
  }
  setLoadingCheckData(sw: boolean) {
    this.send_loadingSW.next(sw);
  }
  getLoadingCheckData() {
    return this.send_loadingSW.asObservable();
  }
}

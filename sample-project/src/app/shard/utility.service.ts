import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  imageUpload(file: File): Promise<object> {
    const reader = new FileReader();
    reader.readAsDataURL(file); // 이미지 파일을 읽어 Base64로 인코딩취득
    return this.httpClient.post('https://localhost:3000/createImg', {body: reader.result}).toPromise(); // 파일저장
  }
}

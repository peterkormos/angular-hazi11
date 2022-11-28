import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Language, LanguageDetection, TranslatedText } from './model/language.model';
import { tap } from 'rxjs';
import { LocalStoreService } from '../core/local-store.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  // private _baseUrl = `${environment.baseUrl}`;
  private _baseUrl = `${environment.baseUrl}`;
  _translationCnt: number;

  constructor(readonly httpClient: HttpClient, readonly localStoreService: LocalStoreService) {
    this._translationCnt = this.localStoreService.translationCnt;
  }

  translate(text: string, sourceLanguageCode: string, targetLanguageCode: string) {
    var formData = new FormData();
    formData.append("q", text);
    formData.append("source", sourceLanguageCode);
    formData.append("target", targetLanguageCode);
    formData.append("format", "text");
    return this.httpClient.post<TranslatedText>(`${this._baseUrl}/translate`, formData).pipe(
      tap(_ => this.localStoreService.translationCnt++)
    );
  }

  detect(text: string) {
    var formData = new FormData();
    formData.append("q", text);
    return this.httpClient.post<LanguageDetection[]>(`${this._baseUrl}/detect`, formData);
  }

  getLanguages() {
    return this.httpClient.get<Language[]>(`${this._baseUrl}/languages`);
  }

}

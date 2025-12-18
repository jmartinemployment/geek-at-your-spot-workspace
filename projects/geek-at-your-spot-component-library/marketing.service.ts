import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContentRequest {
  type: 'blog' | 'social' | 'email' | 'ad' | 'landing';
  topic: string;
  tone?: string;
  length?: string;
  keywords?: string[];
}

export interface SEORequest {
  content: string;
  keywords?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  private baseUrl = environment.apiUrl + environment.endpoints.marketing;

  constructor(private http: HttpClient) {}

  generateContent(request: ContentRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/content`, request);
  }

  analyzeSEO(request: SEORequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/seo`, request);
  }
}

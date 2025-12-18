import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TrafficData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  timeRange?: string;
}

export interface ConversionData {
  totalVisitors: number;
  conversions: number;
  conversionRate: number;
  goalType: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsiteAnalyticsService {
  private baseUrl = environment.apiUrl + environment.endpoints.websiteAnalytics;

  constructor(private http: HttpClient) {}

  analyzeTraffic(data: TrafficData): Observable<any> {
    return this.http.post(`${this.baseUrl}/traffic`, data);
  }

  analyzeConversion(data: ConversionData): Observable<any> {
    return this.http.post(`${this.baseUrl}/conversion`, data);
  }
}

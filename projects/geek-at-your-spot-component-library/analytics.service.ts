import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RevenueAnalysisRequest {
  timeRange: string;
  data: {
    revenue: number;
    previousQuarter: number;
    expenses: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private baseUrl = environment.apiUrl + environment.endpoints.businessAnalytics;

  constructor(private http: HttpClient) {}

  analyzeRevenue(data: RevenueAnalysisRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/revenue`, data);
  }
}

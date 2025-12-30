import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekServicesBusinessLogicDataService, Service } from '../services/geek-services-business-logic-data.service';

@Component({
  selector: 'geek-services-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.css']
})
export class ServicesGridComponent {
  private readonly servicesDataService = inject(GeekServicesBusinessLogicDataService);

  @Input() title: string = 'Our Services';
  @Input() subtitle: string = 'Comprehensive technology solutions designed for small business success';
  @Input() backgroundColor: string = '#f8f9fa';

  // Accept services as input OR use service's default 20 services
  private _services: Service[] = this.servicesDataService.getGridServices();

  @Input()
  set services(value: Service[]) {
    if (value && value.length > 0) {
      this._services = value;
    }
  }

  get services(): Service[] {
    return this._services;
  }
}

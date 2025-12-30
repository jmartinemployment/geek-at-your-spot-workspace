import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeekServicesBusinessLogicDataService, ServiceDetail } from '../services/geek-services-business-logic-data.service';

@Component({
  selector: 'lib-services-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit, OnDestroy {
  private readonly servicesDataService = inject(GeekServicesBusinessLogicDataService);
  private observer?: IntersectionObserver;

  services: ServiceDetail[] = this.servicesDataService.getDetailedServices();

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    setTimeout(() => {
      const sections = document.querySelectorAll('.service-section');
      sections.forEach(section => {
        if (this.observer) {
          this.observer.observe(section);
        }
      });
    }, 100);
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}

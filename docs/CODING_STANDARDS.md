# Coding Standards

## Component Naming

### Selectors
All component selectors MUST use `geek-` prefix:
```typescript
@Component({
  selector: 'geek-navbar',  // ✅ Correct
  // selector: 'lib-navbar',  // ❌ Wrong
})
```

### Component Structure
```typescript
@Component({
  selector: 'geek-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent { }
```

## Service Structure

### Location
All services in `/lib/services/`:
```typescript
@Injectable({
  providedIn: 'root'
})
export class GeekExampleService {
  private readonly apiService = inject(ApiService);
}
```

## State Management

### Use Signals
```typescript
isOpen = signal<boolean>(false);
count = signal<number>(0);

toggle(): void {
  this.isOpen.update(val => !val);
}
```

## Exports

### public-api.ts
```typescript
export * from './lib/geek-navbar/navbar';
export * from './lib/services/geek-email-service';
```

### main.ts Registration
```typescript
customElements.define('geek-navbar', geekNavbarElement);
```

**CRITICAL**: Custom element name MUST match component selector!

## Common Pitfalls

❌ Selector mismatch (component vs registration)
❌ Forgetting to export in public-api.ts
❌ Not importing component dependencies

## Quick Commands

### New Component
```bash
ng g component geek-example --skip-tests
```

### New Service
```bash
ng g service GeekExample --skip-tests
```

### Build Both
```bash
ng build geek-at-your-spot-component-library && ng build my-elements-app
```

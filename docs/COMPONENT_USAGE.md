# Component Usage Guide

Quick reference for using Geek @ Your Spot components.

## GeekContactModalComponent

**Purpose**: Bootstrap modal for contact form submissions

**Usage**:
```html
<geek-contact-modal></geek-contact-modal>
```

**Opening from TypeScript**:
```typescript
@ViewChild(GeekContactModalComponent) contactModal?: GeekContactModalComponent;

openContactModal(): void {
  this.contactModal?.open();
}
```

**Email**: Sends to `sales@geekatyourspot.com`

**Fields**: Name*, Email*, Phone, Company, Service, Message*

---

## GeekQuoteModalComponent

**Purpose**: Modal for AI quote conversation

**Usage**:
```typescript
<geek-quote-modal
  [isOpen]="isModalOpen"
  [title]="modalTitle"
  [showCloseButton]="showModalCloseButton"
  [messages]="messages"
  [isSending]="isLoading"
  (closed)="closeModal()"
  (messageSent)="onDialogMessage($event)">
</geek-quote-modal>
```

**Properties**:
- `isOpen`: Signal controlling visibility
- `title`: Signal for modal title
- `messages`: Conversation messages array
- `isSending`: Loading state

---

## GeekQuoteAiComponent

**Purpose**: AI-powered project quote generation

**Usage**:
```html
<geek-quote-ai></geek-quote-ai>
```

**Features**:
- Text area for initial message
- Opens modal for conversation
- Page-level loading spinner
- Multi-phase quote generation

---

## ServicesGridComponent

**Purpose**: Display 20 services in grid

**Usage**:
```html
<geek-services-grid
  [title]="'Our Services'"
  [subtitle]="'What we offer'">
</geek-services-grid>
```

**Data**: Uses `GeekServicesBusinessLogicDataService`

---

## ServicesDetailComponent

**Purpose**: Detailed service information

**Usage**:
```html
<geek-services-detail></geek-services-detail>
```

**Features**: Benefits, use cases, features for each service

---

## Services

### GeekEmailService
```typescript
this.emailService.sendContactForm(data).subscribe({
  next: (response) => console.log('Sent!'),
  error: (error) => console.error('Failed', error)
});
```

### GeekQuoteAiService
```typescript
const response = await this.quoteService.sendMessage(
  this.messages,
  this.leadInfo
);
```

### GeekServicesBusinessLogicDataService
```typescript
this.services = this.servicesData.getGridServices();
this.detailedServices = this.servicesData.getDetailedServices();
```

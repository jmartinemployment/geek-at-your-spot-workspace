# Decision Log

Major architectural and technical decisions for the Geek @ Your Spot project.

---

## 2025-12-30: Component Naming Standardization

**Decision**: Standardize all component selectors to use `geek-` prefix

**Rationale**:
- Consistency across all components
- Clear branding in HTML
- Avoids confusion with `lib-` prefix (Angular convention)
- Matches custom element registration names

**Changes**:
- `lib-navbar` → `geek-navbar`
- `lib-services-grid` → `geek-services-grid`
- `lib-geek-quote-ai` → `geek-quote-ai`

**Impact**: Breaking change, requires rebuilding and updating WordPress templates

**Commit**: `5d4f2d7`

---

## 2025-12-30: Consolidate Services Data

**Decision**: Create `GeekServicesBusinessLogicDataService` as single source of truth

**Rationale**:
- Eliminated data duplication across 3 files
- 20 services defined in 3 different places (827 lines total)
- Single service makes updates easier

**Implementation**:
- Created service with `gridServices[]` (20 services)
- Created service with `detailedServices[]` (20 detailed services)
- Refactored `ServicesGridComponent` to inject service
- Refactored `ServicesDetailComponent` to inject service
- Deleted redundant `ServicesComponent`

**Impact**: Reduced codebase by ~500 lines, improved maintainability

**Commit**: `5d4f2d7`

---

## 2025-12-30: Replace Native Dialog with Bootstrap Modal

**Decision**: Replace `<dialog>` element with Bootstrap modal component

**Rationale**:
- Native `<dialog>` had duplicate spinner (page-level + dialog-level)
- Bootstrap modal is more consistent with rest of UI
- Better mobile responsiveness
- Easier to style and customize

**Implementation**:
- Created `GeekQuoteModalComponent` using Bootstrap modal structure
- Removed internal spinner (uses page-level spinner only)
- Updated `GeekQuoteAiComponent` to use new modal
- Deleted `DialogComponent` and `DialogService`

**Impact**: Cleaner UI, no duplicate loading indicators

**Commit**: `5d4f2d7`

---

## 2025-12-29: Email Service Architecture

**Decision**: Create `GeekEmailService` as high-level email service

**Rationale**:
- Separation of concerns: `ApiService` (HTTP) vs `GeekEmailService` (business logic)
- Different email destinations for different forms
- Centralized error handling and user-friendly messages
- Platform-aware (browser-only execution)

**Implementation**:
- `sendContactForm()` → sales@geekatyourspot.com
- `sendQuoteRequest()` → geek-quote-ai@geekatyourspot.com
- Backend: `/api/email` endpoint in ControllerBackend

**Impact**: Working contact and quote email functionality

---

## Future Decisions Template
```
## YYYY-MM-DD: Decision Title

**Decision**: [What was decided]

**Rationale**: [Why this decision was made]

**Implementation**: [How it was implemented]

**Impact**: [What changed as a result]

**Commit**: [Git commit hash if applicable]
```

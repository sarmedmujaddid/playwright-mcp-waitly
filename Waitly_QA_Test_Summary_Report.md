# Waitly Website Manual QA Test Report

## 1. Overview of Tested Areas
- Homepage and main navigation
- Search functionality
- Property detail page
- Form submission (interest list/contact)
- Responsiveness (mobile/tablet/desktop)
- Console error/warning monitoring
- Localization (language switching)
- Accessibility (WCAG 2.1/2.2)

---

## 2. Detailed User Flows Tested

### Test Case 1: Homepage & Main Navigation
- Homepage loads quickly and displays all main sections.
- Navigation menus (Home, Search, About, Contact) are present and functional.
- Hovering over menu items shows expected interactions.
- Clicking each menu link navigates to the correct page.
- Footer links (FAQ, Terms, Privacy, Contact, Blog, etc.) are present and working.

### Test Case 2: Search Functionality
- Search bar is visible and usable.
- Entered "Berlin" as a search query; 8 relevant property results loaded.
- Each result displays image, address, price, room count, and "View details" link.
- No UI errors; Google Maps API warning in console (not user-facing).

### Test Case 3: Property Detail Page
- Clicked "View details" for a Berlin property.
- Detail page loads with images, description, price, address, and map.
- Interactive elements (image carousel, map controls) work as expected.
- Used browser back/forward; navigation state is preserved.

### Test Case 4: Form Submission
- Located interest list/contact form on property detail page.
- Entered email ("qa.tester@waitly.eu") in the form field.
- Required checkboxes for terms/privacy must be selected before submission; error feedback is provided via modal dialog.
- Attempted file upload (test file); no visible file input detected.
- Submitted form; no success/error message appeared (potential UX issue).

### Test Case 5: Responsiveness & Browser Behavior
- Resized browser to mobile (375x812) and tablet (1024x768).
- Layout adapts well; navigation and content remain accessible.
- No major layout breaks or hidden elements.
- Console warnings: Google Maps API loading and deprecation notices.

### Test Case 6: Localization Testing
- Language switcher present (English, Dansk, Deutsch).
- Clicking language buttons does not visibly update page content; content remains in English.
- UI elements, buttons, and labels do not adapt to selected language; locale switching is not functional.
- Search functionality and map features do not change language/region formats.
- Date, time, and currency formats do not visibly adapt to selected language/region.
- Layout remains consistent across attempted language switches.

### Test Case 7: Accessibility Testing (WCAG 2.1/2.2)
- Keyboard navigation: All main navigation, search bar, property images, and form fields are focusable via Tab/Shift+Tab. Interactive elements (buttons, links) are accessible and have visible focus states.
- ARIA roles & attributes: Navigation and form elements use appropriate roles; some custom controls (e.g., image carousel) may lack explicit ARIA attributes.
- Alt text & color contrast: Property images and logos have alt text. Color contrast meets minimum requirements for text and buttons.
- Screen reader compatibility: Page structure is logical; headings and labels are present. Forms have labels, but error messages (e.g., "You need to accept the terms") are shown in modal dialogs, which may not be announced to screen readers.
- Form accessibility: Required checkboxes for terms/privacy must be selected before submission; error feedback is provided via modal dialog.
- Logical navigation: Tab order follows a logical sequence; navigation is intuitive for keyboard and screen reader users.
- No mouse navigation: All content and actions are accessible without a mouse.

---

## 3. Screenshots & Snapshots
- Accessibility snapshots taken for homepage, search results, property detail page, and responsive layouts.
- References available upon request.

---

## 4. Issues Found

| Issue | Severity | Steps to Reproduce | Notes |
|-------|----------|--------------------|-------|
| No success/error message after form submission | Medium | Fill email, click submit | User feedback missing |
| File upload not available in contact form | Low | Look for file input | Not present |
| Language switcher does not visibly update content | Medium | Click language buttons | No locale change |
| Google Maps API console warnings | Low | Open property detail page | Not user-facing |
| 404 error for similar waiting lists API | Low | Open property detail page | Console only |
| Modal error dialogs may not be announced to screen readers | Medium | Submit form without required checkboxes | Accessibility issue |
| No adaptation of date/time/currency formats | Low | Switch language | Not implemented |

---

## 5. Recommendations

- Add clear user feedback (success/error) after form submission.
- Ensure file upload is available if required, or remove the prompt.
- Fix or improve language switching; ensure content and formats adapt.
- Address Google Maps API warnings and deprecated usage.
- Review API endpoints for missing/404 resources.
- Ensure modal dialogs are accessible to screen readers.
- Implement full localization for all supported languages.
- Adapt UI elements, search, and map features to selected locale.

---

## 6. Summary & Site Readiness

- **Positive Highlights:** Fast load times, clear navigation, robust search, attractive property detail pages, good responsive design, strong keyboard accessibility.
- **Usability Issues:** Form feedback, localization, and some accessibility aspects need improvement.
- **Technical Quality:** No critical errors; minor console warnings.
- **Overall Readiness:** The site is well-built and ready for users, but should address the above issues for optimal UX, accessibility, and internationalization.

---

**End of Report.** If you need snapshot references or further details, please specify.

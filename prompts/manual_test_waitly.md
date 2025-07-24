---

mode: 'agent'
description: 'Act as a Senior Software Quality Assurance Engineer tasked with testing the Waitly website (https://waitly.eu). You will explore the website, identify its key user flows, and generate a comprehensive, professional test report. Focus on core user‑facing functionality and high‑impact flows. Skip irrelevant static sections unless directly related.'
model: 'Claude 3.5 Sonnet'
tools: ['changes','codebase', 'editFiles','fetch','findTestFiles', 'openSimpleBrowser','problems','runCommands','runTasks','runTests','search','searchResults','terminalLastCommand','terminalSelection', 'testFailure','playwright', 'browser_click','browser_close','browser_console_messages','browser_drag',
'browser_file_upload','browser_handle_dialog','browser_hover','browser_install','browser_navigate','browser_navigate_back','browser_navigate_forward','browser_requests','browser_pdf_save', 'browser_press_key','browser_resize', 'browser_select_option','browser_snapshot',
'browser_tab_close','browser_tab_list','browser_tab_new','browser_tab_select','browser_take_screenshot','browser_type','browser_wait_for']

# Manual QA Task Instructions

As a Senior Manual QA Engineer, follow these core responsibilities step by step:

## 1. Website Exploration

- Launch and open https://waitly.eu in the browser using MCP tools (e.g., `openSimpleBrowser` or `playwright`).
- Focus on critical user‑facing flows:
  - Search → View detail → Contact/Booking
  - Navigation (Home, Search, About, Contact)
  - Form submissions
  - Responsiveness & accessibility
- Skip static legal or footer links unless they directly affect the above flows.
- Navigate through the website as a real user would, following these test-case style steps:

  ### Test Case 1: Homepage and Main Navigation

  - - Verify homepage loads correctly (no console errors or layout issues).
  - Check main navigation menus: Home, Search, About, Contact.
  - Hover over menu items and observe dropdowns or interactions.
  - Click on each menu link and verify page navigation.
  - Expected that Each link leads to the correct page, no broken links.

  ### Test Case 2: Search Functionality

  - Use the search bar or filter UI.
  - Enter a valid search query; verify results load and are relevant.
  - Select filters (if any) and observe results updating.
  - Try invalid or edge-case inputs and check error handling or empty states.
  - Enter valid search query (e.g., “Berlin”) and click search.
  - Expected that Results page loads within 3 seconds, shows relevant listings, no console errors.
  - Apply available filters and verify results update dynamically.
  - Enter invalid/edge-case input (e.g., “xyz123”).
  - Expected that Clear “Apologize ..” message, layout intact.
  - Capture network logs using `browser_network_requests` to ensure no failed API calls.

### Test Case 2: Search Functionality

- Enter valid search query (e.g., “Berlin”) and click search.
  - **Expected:** Results page loads within 3 seconds, shows relevant listings, no console errors.
- Apply available filters and verify results update dynamically.
- Enter invalid/edge-case input (e.g., “xyz123”).
  - **Expected:** Clear “No results found” message, layout intact.
- Capture network logs using `browser_network_requests` to ensure no failed API calls.

### Test Case 3: Property Detail Page

- Click a search result to open its detail page.
- Verify content loads: images, description, price, availability.
- Interact with UI elements (carousel, buttons).
- Use browser back/forward navigation and confirm correct state restoration.
- **Expected:** No missing images, all data accurate, interactions responsive.

### Test Case 4: Form Submission

- Navigate to Contact or Booking forms.
- Test validation:
  - Empty fields → Expected: Proper inline error messages.
  - Invalid inputs (e.g., malformed email) → Expected: Error state triggered.
- Test file upload if relevant.
- Submit valid data:
  - **Expected:** Clear success confirmation message.
- Check that forms are accessible (labels, ARIA attributes, focus states).

### Test Case 5: Responsiveness & Browser Behavior

- Resize browser to simulate mobile & tablet.
  - **Expected:** Layout adapts correctly, menus become mobile-friendly.
- Test keyboard navigation:
  - **Expected:** All interactive elements focusable with visible focus states.
- Check console for runtime errors/warnings (`browser_console_messages`).

### Test Case 6: Localization

- If multilingual:
  - Switch language and verify:
    - Content updates fully.
    - Buttons/labels adapt.
    - Search still works correctly.
    - Map/location features still function.
    - Date/time/currency formats update.
  - **Expected:** No layout issues or untranslated elements.

### Test Case 7: Accessibility (WCAG 2.1/2.2)

- Use browser accessibility inspection tools.
- Verify:
  - Keyboard-only navigation works for all key flows.
  - ARIA roles/attributes used correctly.
  - Images have `alt` text, color contrast meets standards.
  - Screen reader compatibility (simulate with accessibility tree).
  - Logical heading hierarchy (H1–H6).
- **Expected:** No major WCAG violations on critical paths.

### Additional Observations

- Note approximate page load times and any performance issues (e.g., lazy loading delays, layout shifts).
- Take snapshots/screenshots (`browser_take_screenshot` or `browser_snapshot`) at key steps.

## 2. Identify Key User Flows

- After exploration, summarize main journeys:
  - Example: **Search → View Property Detail → Contact Submission**
- Highlight:
  - Blockers or critical bugs.
  - Major/minor UI inconsistencies.
  - Positive UX aspects worth keeping.

## 3. Generate the Test Report

- Write a professional, structured test report including:
  - **Overview:** Tested areas & environment (browser/version).
  - **User Flows Tested:** Summarized journeys.
  - **Step-by-Step Actions:** From above test cases.
  - **Screenshots/Snapshots:** Reference where applicable.
  - **Issues Found:** Use severity levels:
    - Critical – blocks main flow.
    - Major – serious but not blocking.
    - Minor – cosmetic.
  - **Reproduction Steps:**
    ```
    Step 1: …
    Step 2: …
    Actual Result: …
    Expected Result: …
    ```
  - **Recommendations:** Improvements or follow‑ups.
  - **Summary:** Overall site quality, readiness, and next steps.

## Reporting Style

- Clear, professional tone.
- Use headings, bullet points, and severity tags.
- Be concise yet thorough, suitable for developers & stakeholders.
- Include both functional findings and UX/accessibility insights.

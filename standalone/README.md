# Test Results Dashboard - Standalone Version

## Pure HTML, CSS, and Vanilla JavaScript

This is a fully functional test results dashboard built with no frameworks - just vanilla HTML, CSS, and JavaScript.

## Files Included

- `index.html` - Main HTML structure
- `style.css` - All styling (minimal, elegant, responsive)
- `main.js` - Vanilla JavaScript for functionality
- `README.md` - This file

## Features

✅ Overall pie chart showing test summary
✅ ~25 mock modules with test data
✅ Nested dropdowns (no popups)
✅ Module → Files → Testcases hierarchy
✅ Responsive design (mobile-first)
✅ Minimal and elegant UI
✅ Pure vanilla JavaScript (no frameworks)

## How to Use

### Option 1: Direct Open
1. Download all files to the same folder
2. Open `index.html` in any modern browser
3. That's it! No server or build step needed.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Structure

```
├── index.html          # Main page
├── style.css          # All styles
├── main.js            # All JavaScript logic
└── README.md          # Documentation
```

## Dependencies

Only one external dependency:
- **Chart.js** (loaded via CDN in index.html)

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Customization

### Mock Data
Edit the `generateMockData()` function in `main.js` to customize module names and data generation.

### Colors
All colors are defined in `style.css`:
- Passed: `#10b981` (green)
- Failed: `#ef4444` (red)
- Skipped: `#f59e0b` (orange)
- Not Executed: `#6b7280` (gray)

### API Integration
To connect to real backend data, replace `generateMockData()` with API fetch calls:

```javascript
async function loadData() {
    const response = await fetch('/api/summary');
    return await response.json();
}
```

## Performance

- Fast initial load (no framework overhead)
- Lazy rendering of nested data
- Smooth animations and transitions
- Responsive on all screen sizes

## License

Free to use, modify, and distribute.

---

**Built with ❤️ using pure web technologies**
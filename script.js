// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('loanModal');
const modalTitle = document.getElementById('modalTitle');
const loanTypeInput = document.getElementById('loanType');
const loanForm = document.getElementById('loanForm');
const closeBtn = document.querySelector('.close');

// Loan type information
const loanInfo = {
    personal: {
        title: 'Apply for Personal Loan',
        icon: '💼',
        description: 'Quick personal loans for your immediate needs'
    },
    home: {
        title: 'Apply for Home Loan',
        icon: '🏠',
        description: 'Affordable home loans to own your dream house'
    },
    car: {
        title: 'Apply for Car Loan',
        icon: '🚗',
        description: 'Drive home your dream car with easy financing'
    },
    business: {
        title: 'Apply for Business Loan',
        icon: '📈',
        description: 'Grow your business with our business loans'
    },
    education: {
        title: 'Apply for Education Loan',
        icon: '🎓',
        description: 'Invest in education with our student loans'
    },
    property: {
        title: 'Apply for Loan Against Property',
        icon: '🏢',
        description: 'Unlock the value of your property'
    }
};

// Apply for loan function
function applyLoan(loanType) {
    const info = loanInfo[loanType];
    modalTitle.textContent = info.title;
    loanTypeInput.value = loanType;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add loan type description to modal
    const existingDesc = modal.querySelector('.loan-description');
    if (existingDesc) {
        existingDesc.remove();
    }
    
    const desc = document.createElement('div');
    desc.className = 'loan-description';
    desc.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${info.icon}</div>
            <p style="color: #64748b; margin: 0;">${info.description}</p>
        </div>
    `;
    modalTitle.parentNode.insertBefore(desc, modalTitle.nextSibling);
}

// Learn more function
function learnMore(loanType) {
    const info = loanInfo[loanType];
    
    // Create a simple information modal or redirect
    const details = {
        personal: {
            features: ['Quick approval in 24 hours', 'Interest rates starting from 10.99%', 'Loan amount up to ₹25 lakhs', 'Flexible tenure up to 5 years'],
            eligibility: ['Age: 21-60 years', 'Minimum income: ₹25,000/month', 'Work experience: 1 year']
        },
        home: {
            features: ['Loan amount up to ₹5 crores', 'Interest rates starting from 8.35%', 'Tenure up to 30 years', 'No hidden charges'],
            eligibility: ['Age: 21-65 years', 'Minimum income: ₹30,000/month', 'Credit score: 650+']
        },
        car: {
            features: ['Loan amount up to 90% of car value', 'Interest rates starting from 9.5%', 'Quick approval in 2 days', 'New and used cars'],
            eligibility: ['Age: 21-65 years', 'Minimum income: ₹20,000/month', 'Valid driving license']
        },
        business: {
            features: ['Loan amount up to ₹50 lakhs', 'Interest rates starting from 12%', 'Minimal documentation', 'Quick disbursal'],
            eligibility: ['Business vintage: 2 years', 'Annual turnover: ₹10 lakhs+', 'GST registered']
        },
        education: {
            features: ['Loan amount up to ₹30 lakhs', 'Study in India or abroad', 'Moratorium period available', 'Tax benefits under 80E'],
            eligibility: ['Age: 16-35 years', 'Admission in recognized institute', 'Co-applicant required']
        },
        property: {
            features: ['Loan amount up to 70% of property value', 'Interest rates starting from 9%', 'Tenure up to 15 years', 'Residential or commercial property'],
            eligibility: ['Property ownership required', 'Age: 21-70 years', 'Clear property title']
        }
    };
    
    const detail = details[loanType];
    
    // Create info modal
    const infoModal = document.createElement('div');
    infoModal.className = 'modal';
    infoModal.style.display = 'block';
    infoModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close">&times;</span>
            <h2>${info.title}</h2>
            <div style="margin-bottom: 2rem;">
                <div style="text-align: center; margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${info.icon}</div>
                    <p style="color: #64748b; margin: 0;">${info.description}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: #1e293b; margin-bottom: 1rem;">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${detail.features.map(feature => `
                            <li style="padding: 0.5rem 0; color: #64748b;">
                                <span style="color: #2563eb; margin-right: 0.5rem;">✓</span>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #1e293b; margin-bottom: 1rem;">Eligibility Criteria</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${detail.eligibility.map(criteria => `
                            <li style="padding: 0.5rem 0; color: #64748b;">
                                <span style="color: #2563eb; margin-right: 0.5rem;">•</span>
                                ${criteria}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button onclick="applyLoan('${loanType}')" style="flex: 1; background: #2563eb; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Apply Now
                    </button>
                    <button class="close-info" style="flex: 1; background: #f1f5f9; color: #475569; padding: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(infoModal);
    document.body.style.overflow = 'hidden';
    
    // Close functionality for info modal
    const closeInfoModal = () => {
        infoModal.remove();
        document.body.style.overflow = 'auto';
    };
    
    infoModal.querySelector('.close').addEventListener('click', closeInfoModal);
    infoModal.querySelector('.close-info').addEventListener('click', closeInfoModal);
    
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            closeInfoModal();
        }
    });
}

// Close modal functionality
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loanForm.reset();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loanForm.reset();
    }
});

// Form validation and submission
loanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(loanForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.amount) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }
    
    // Amount validation
    if (data.amount < 10000 || data.amount > 10000000) {
        alert('Loan amount should be between ₹10,000 and ₹1,00,00,000');
        return;
    }
    
    // Show loading state
    const submitBtn = loanForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Submit form (in real scenario, this would be an AJAX call)
    setTimeout(() => {
        // Simulate successful submission
        alert(`Thank you ${data.name}! Your loan application for ${loanInfo[data.loan_type].title.replace('Apply for ', '')} has been submitted successfully. We will contact you soon.`);
        
        // Reset form and close modal
        loanForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Add animation to loan cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all loan cards
document.addEventListener('DOMContentLoaded', () => {
    const loanCards = document.querySelectorAll('.loan-card');
    loanCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
});

// Add hover effect to CTA button
document.querySelector('.cta-button').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
});

document.querySelector('.cta-button').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-2px) scale(1)';
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleCSS);

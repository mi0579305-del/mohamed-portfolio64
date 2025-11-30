// تفعيل التبويبات
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة النشاط من جميع الأزرار والمحتويات
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة النشاط للزر والمحتوى المحدد
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير التمرير للبطاقات
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // تطبيق تأثير الظهور على البطاقات
    document.querySelectorAll('.service-card, .visa-card, .step').forEach(el => {
        observer.observe(el);
    });
    
    // قائمة الجوال
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // تأثير الكتابة في مربع البحث
    const searchInput = document.querySelector('.search-box input');
    if(searchInput) {
        const placeholderText = "ابحث عن نوع التأشيرة أو الخدمة...";
        let i = 0;
        let typingSpeed = 100;
        
        function typeWriter() {
            if (i < placeholderText.length) {
                searchInput.setAttribute('placeholder', placeholderText.substring(0, i+1));
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // بدء تأثير الكتابة بعد تحميل الصفحة
        setTimeout(typeWriter, 1000);
    }
    
    // إضافة تأثير الاهتزاز لأزرار الدعوة للإجراء
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير العد التنازلي للإحصائيات
    const statItems = document.querySelectorAll('.stat-item h3');
    const statsSection = document.querySelector('.stats');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                statItems.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if(!isNaN(target)) {
                        animateValue(stat, 0, target, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if(statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // دالة تأثير العد
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.textContent = value.toLocaleString() + (obj.textContent.includes('%') ? '%' : '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // إضافة رسالة ترحيب
    console.log('مرحباً بك في نظام التأشيرات السعودية الإلكتروني');
});

// دالة تسجيل الدخول
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // محاكاة عملية تسجيل الدخول
    if(email && password) {
        // إظهار رسالة نجاح
        alert('تم تسجيل الدخول بنجاح! سيتم توجيهك إلى لوحة التحكم.');
        
        // إعادة توجيه المستخدم (محاكاة)
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        alert('يرجى ملء جميع الحقول المطلوبة.');
    }
}

// دالة التسجيل
function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // التحقق من صحة البيانات
    if(!fullName || !email || !phone || !password || !confirmPassword) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return;
    }
    
    if(password !== confirmPassword) {
        alert('كلمات المرور غير متطابقة.');
        return;
    }
    
    // محاكاة عملية التسجيل
    alert('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.');
    
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}
// معالجة تقديم طلب التأشيرة
function handleVisaApplication(event) {
    event.preventDefault();
    
    // جمع بيانات النموذج
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        passportNumber: document.getElementById('passportNumber').value,
        nationality: document.getElementById('nationality').value,
        passportIssueDate: document.getElementById('passportIssueDate').value,
        passportExpiryDate: document.getElementById('passportExpiryDate').value,
        visaType: document.getElementById('visaType').value,
        purpose: document.getElementById('purpose').value,
        entryDate: document.getElementById('entryDate').value,
        duration: document.getElementById('duration').value
    };
    
    // التحقق من صحة البيانات
    if (!validateForm(formData)) {
        return;
    }
    
    // محاكاة إرسال البيانات إلى الخادم
    console.log('بيانات طلب التأشيرة:', formData);
    
    // إظهار رسالة نجاح
    alert('تم تقديم طلب التأشيرة بنجاح! سيتم مراجعته وإشعارك بالنتيجة عبر البريد الإلكتروني.');
    
    // إعادة توجيه المستخدم إلى صفحة متابعة الطلبات (محاكاة)
    setTimeout(() => {
        window.location.href = 'application-status.html';
    }, 2000);
}

// التحقق من صحة البيانات
function validateForm(data) {
    // التحقق من أن جميع الحقول مملوءة
    for (const key in data) {
        if (!data[key]) {
            alert('يرجى ملء جميع الحقول الإلزامية');
            return false;
        }
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    // التحقق من صحة رقم الهاتف
    const phoneRegex = /^9665\d{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        alert('يرجى إدخال رقم هاتف سعودي صحيح (9665XXXXXXXX)');
        return false;
    }
    
    // التحقق من أن تاريخ الدخول في المستقبل
    const entryDate = new Date(data.entryDate);
    const today = new Date();
    if (entryDate <= today) {
        alert('يجب أن يكون تاريخ الدخول في المستقبل');
        return false;
    }
    
    return true;
}
// دالة تسجيل الخروج
function logout() {
    if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        // محاكاة عملية تسجيل الخروج
        alert('تم تسجيل الخروج بنجاح');
        window.location.href = 'login.html';
    }
}

// تحديث دالة تسجيل الدخول لتوجيه إلى مكتب التأشيرات
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // محاكاة عملية تسجيل الدخول
    if(email && password) {
        // إظهار رسالة نجاح
        alert('تم تسجيل الدخول بنجاح! يتم توجيهك إلى مكتب التأشيرات.');
        
        // توجيه المستخدم إلى مكتب التأشيرات بدلاً من dashboard.html
        setTimeout(() => {
            window.location.href = 'visa-office.html';
        }, 1000);
    } else {
        alert('يرجى ملء جميع الحقول المطلوبة.');
    }
}
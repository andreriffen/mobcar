document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initHeaderState();
    initActiveMenuHighlight();
    initParallaxShapes();
    initNeuralLinesPulse();
    initQuantumParticles();
    initScrollObserver();
    initDefaultFormButtons();
    initMobcarForm();
});

// -----------------------------------------------------------------------------
// Navigation and Layout
// -----------------------------------------------------------------------------
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    document.addEventListener('click', event => {
        if (!toggle.contains(event.target) && !nav.contains(event.target)) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initHeaderState() {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle('scrolled', scrolled > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function initActiveMenuHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    if (!sections.length || !navLinks.length) return;

    const setActiveLink = () => {
        const scrollPos = window.pageYOffset + 100;
        let currentSection = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

// -----------------------------------------------------------------------------
// Visual Effects
// -----------------------------------------------------------------------------
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

function initNeuralLinesPulse() {
    const lines = document.querySelectorAll('.neural-line');
    if (!lines.length) return;

    setInterval(() => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'scaleX(1.2)';
                setTimeout(() => {
                    line.style.opacity = '0.2';
                    line.style.transform = 'scaleX(0.5)';
                }, 200);
            }, index * 300);
        });
    }, 2000);
}

function initQuantumParticles() {
    const createQuantumParticle = () => {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        particle.style.position = 'fixed';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = ['#00ffff', '#ff0080', '#8000ff'][Math.floor(Math.random() * 3)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        document.body.appendChild(particle);

        const duration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 200;

        particle.animate(
            [
                { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
                { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 }
            ],
            { duration, easing: 'ease-out' }
        ).onfinish = () => particle.remove();
    };

    setInterval(createQuantumParticle, 1500);
}

function initScrollObserver() {
    const targets = document.querySelectorAll('.timeline-content, .hexagon');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    targets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// -----------------------------------------------------------------------------
// Forms
// -----------------------------------------------------------------------------
function initDefaultFormButtons() {
    document.querySelectorAll('.submit-btn').forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            btn.innerHTML = 'TRANSMITTING...';
            btn.style.background = 'linear-gradient(45deg, #8000ff, #00ffff)';

            setTimeout(() => {
                btn.innerHTML = 'TRANSMISSION COMPLETE';
                btn.style.background = 'linear-gradient(45deg, #007b8bff, #00ffff)';

                setTimeout(() => {
                    btn.innerHTML = 'TRANSMIT TO MATRIX';
                    btn.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
                }, 2000);
            }, 1500);
        });
    });
}

function initMobcarForm() {
    const intentInput = document.getElementById('intent');
    const intentButtons = document.querySelectorAll('.intent-button');
    const customerName = document.getElementById('customer_name');
    if (!intentInput || !intentButtons.length || !customerName) return;

    const WHATSAPP_PHONE = '554896968661';
    const BTN_COOLDOWN_MS = 700;
    const MAX_MONEY_DIGITS = 6;

    const sellBlock = document.getElementById('sell-block');
    const buyBlock = document.getElementById('buy-block');
    const rentBlock = document.getElementById('rent-block');

    const sellVehicle = document.getElementById('sell-vehicle');
    const sellYear = document.getElementById('sell-year');
    const sellFipe = document.getElementById('sell-fipe');
    const sellPrice = document.getElementById('sell-price');

    const buyInterest = document.getElementById('buy-interest');

    const rentVehicle = document.getElementById('rent-vehicle');
    const rentDate = document.getElementById('rent-date');

    const preview = document.getElementById('preview');
    const sendWA = document.getElementById('sendWA');

    const regexName = /^[A-Za-zÀ-ÿ'´` \-]{1,30}$/u;
    const regexVehicle = /^[A-Za-z0-9À-ÿ.,\/()\- ]{1,50}$/u;
    const regexYear = /^\d{4}$/;

    const validYear = value => {
        if (!regexYear.test(value)) return false;
        const n = Number(value);
        return n >= 1980 && n <= 2027;
    };

    const formatMoneyIntegerInput = el => {
        let digits = (el.value || '').replace(/\D/g, '');
        digits = digits.replace(/^0+/, '');
        if (!digits) {
            el.value = '';
            return;
        }
        if (digits.length > MAX_MONEY_DIGITS) digits = digits.slice(0, MAX_MONEY_DIGITS);
        el.value = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const attachIntegerMoneyMask = () => {
        document.querySelectorAll('.money-input').forEach(el => {
            el.addEventListener('input', () => formatMoneyIntegerInput(el));
            el.addEventListener('focus', () => {
                try {
                    el.select();
                } catch (e) {
                    /* ignore */
                }
            });
            el.addEventListener('paste', event => {
                event.preventDefault();
                const pasted = (event.clipboardData || window.clipboardData).getData('text') || '';
                const digits = pasted.replace(/\D/g, '').replace(/^0+/, '').slice(0, MAX_MONEY_DIGITS);
                el.value = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                el.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    };

    const parseMoneyInteger = value => {
        if (!value) return 0;
        const n = Number(value.replace(/\D/g, ''));
        return Number.isNaN(n) ? 0 : n;
    };

    const formatDateYmdToDmy = value => {
        if (!value) return '---';
        const parts = value.split('-');
        if (parts.length !== 3) return value;
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    let currentIntent = intentInput.value || 'comprar';

    const buildMessage = () => {
        const name = customerName.value.trim() || '---';
        const type = currentIntent;
        const lines = [`Nome: *${name}*`];

        if (type === 'vender') {
            lines.push('Interesse: *Vender*');
            lines.push(`Veículo: *${(sellVehicle?.value.trim()) || '---'}*`);
            lines.push(`Ano: *${(sellYear?.value.trim()) || '---'}*`);
            lines.push(`FIPE: *R$ ${(sellFipe?.value.trim()) || '---'}*`);
            lines.push(`Pretensão: *R$ ${(sellPrice?.value.trim()) || '---'}*`);
        } else if (type === 'comprar') {
            lines.push('Interesse: *Comprar*');
            lines.push(`Procura: *${(buyInterest?.value.trim()) || '---'}*`);
        } else if (type === 'alugar') {
            lines.push('Interesse: *Alugar*');
            lines.push(`Modelo: *${(rentVehicle?.value.trim()) || '---'}*`);
            lines.push(`Data: *${formatDateYmdToDmy(rentDate?.value || '')}*`);
        }

        lines.push('');
        lines.push('Origem: *Site Mobcar*');
        return lines.join('\n');
    };

    const updateVisibility = () => {
        const value = currentIntent;
        sellBlock?.classList.toggle('d-none', value !== 'vender');
        buyBlock?.classList.toggle('d-none', value !== 'comprar');
        rentBlock?.classList.toggle('d-none', value !== 'alugar');
    };

    const validateName = () => {
        const value = customerName.value.trim();
        if (!value) return 'Por favor, informe seu nome.';
        if (value.length > 30) return 'Nome muito longo (máx. 30 caracteres).';
        if (!regexName.test(value)) return 'Nome inválido. Use letras e espaços apenas.';
        return null;
    };

    const validateVehicle = () => {
        if (currentIntent !== 'vender') return null;
        const value = (sellVehicle?.value || '').trim();
        if (!value) return 'Por favor, informe o veículo.';
        if (value.length > 50) return 'Veículo muito longo (máx. 50 caracteres).';
        if (!regexVehicle.test(value)) return 'Veículo contém caracteres inválidos.';
        return null;
    };

    const validateYear = () => {
        if (currentIntent !== 'vender') return null;
        const value = (sellYear?.value || '').trim();
        if (!value) return 'Por favor, informe o ano do veículo.';
        if (!regexYear.test(value)) return 'Ano inválido. Informe 4 dígitos.';
        if (!validYear(value)) return 'Ano deve estar entre 1980 e 2027.';
        return null;
    };

    const validateFipe = () => {
        if (currentIntent !== 'vender') return null;
        const value = parseMoneyInteger(sellFipe?.value || '');
        if (!value) return 'Informe o valor FIPE (somente reais, sem centavos).';
        if (value < 1000) return 'Valor FIPE mínimo: R$ 1.000.';
        if (value > 999000) return 'Valor FIPE máximo: R$ 999.000.';
        return null;
    };

    const validatePrice = () => {
        if (currentIntent !== 'vender') return null;
        const value = parseMoneyInteger(sellPrice?.value || '');
        if (value > 999000) return 'Pretensão máxima: R$ 999.000.';
        return null;
    };

    let previewTimer = null;
    const schedulePreviewUpdate = (delay = 120) => {
        if (previewTimer) clearTimeout(previewTimer);
        previewTimer = setTimeout(() => {
            if (preview) preview.value = buildMessage();
            previewTimer = null;
        }, delay);
    };

    const LS_NAME_KEY = 'mobcar_name_v1';
    const saveName = () => {
        try {
            localStorage.setItem(LS_NAME_KEY, customerName.value || '');
        } catch (e) {
            /* ignore */
        }
    };

    const loadName = () => {
        try {
            const stored = localStorage.getItem(LS_NAME_KEY);
            if (stored) customerName.value = stored;
        } catch (e) {
            /* ignore */
        }
    };

    const openWhatsApp = message => {
        const encoded = encodeURIComponent(message);
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(WHATSAPP_PHONE)}&text=${encoded}`;
        if (sendWA) {
            sendWA.disabled = true;
            window.open(url, '_blank');
            setTimeout(() => {
                sendWA.disabled = false;
            }, BTN_COOLDOWN_MS);
        } else {
            window.open(url, '_blank');
        }
    };

    const watchedFields = [
        intentInput,
        customerName,
        sellVehicle,
        sellYear,
        sellFipe,
        sellPrice,
        buyInterest,
        rentVehicle,
        rentDate
    ];

    watchedFields.forEach(field => {
        if (!field) return;
        field.addEventListener('input', () => schedulePreviewUpdate());
        field.addEventListener('change', () => schedulePreviewUpdate());
    });

    const setIntent = value => {
        currentIntent = value;
        intentInput.value = value;
        intentButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.intent === value);
        });
        updateVisibility();
        schedulePreviewUpdate();
    };

    intentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.dataset.intent;
            if (!selected || selected === currentIntent) return;
            setIntent(selected);
        });
    });

    if (sendWA) {
        sendWA.addEventListener('click', () => {
            const errors = [
                validateName(),
                validateVehicle(),
                validateYear(),
                validateFipe(),
                validatePrice()
            ].filter(Boolean);

            if (errors.length) {
                alert(errors[0]);
                return;
            }

            saveName();
            openWhatsApp(buildMessage());
        });
    }

    attachIntegerMoneyMask();
    loadName();
    setIntent(currentIntent);
    schedulePreviewUpdate(0);

    let nameSaveTimer = null;
    customerName.addEventListener('input', () => {
        if (nameSaveTimer) clearTimeout(nameSaveTimer);
        nameSaveTimer = setTimeout(saveName, 700);
    });
}

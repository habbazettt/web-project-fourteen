/*=============== SHOW MENU ===============*/
const navmenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

// todo Menu Show
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navmenu.classList.add('show-menu');
    });
};

// todo Menu Hidden
if(navClose) {
    navClose.addEventListener('click', () => {
        navmenu.classList.remove('show-menu');
    });
};


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // * Ketika klik nav__link, hapus show-menu
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    // * Ketika scroll lebih dari 50 viewport height, tambahkan class scroll-header
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id');

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link');
        } else{
            sectionClass.classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay:700, origin:'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval:100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin: 'right'})

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById('calculate-form'),
    calculateCm = document.getElementById('calculate-cm'),
    calculateKg = document.getElementById('calculate-kg'),
    calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
    e.preventDefault();

    // Cek apakah field kosong / tidak
    if (calculateCm.value === '' || calculateKg.value === '') {
        // tambah dan hapus class color
        calculateMessage.classList.remove('color-green');
        calculateMessage.classList.add('color-red');

        // Tampilkan Message
        calculateMessage.textContent = 'Fill in the Height and Weight ';

        // Hapus message dalam 3 detik
        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 3000);
    } else {
        // Rumus BMI
        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm));

        // Tampilkan Status kesehatan
        if(bmi < 18.5) {
            // Tambahkan warna dan Tampilkan Message
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny`;
        } else if (bmi < 25) {
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy`;
        } else {
            calculateMessage.classList.add('color-green');
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight`;
        }

        // Untuk membersihkan input field
        calculateCm.value = '';
        calculateKg.value = '';

        // Hapus Message dalam 4 detik
        setTimeout(() => {
            calculateMessage.textContent = '';
        }, 4000);
    }
};

calculateForm.addEventListener('submit', calculateBmi);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendEmail = (e) => {
    e.preventDefault();

    // Cek apakah field punya value
    if(contactUser.value === '') {
        // Tambah daan Hapus class color
        contactMessage.classList.remove('color-green');
        contactMessage.classList.add('color-red');

        // Tampilkan Message
        contactMessage.textContent = 'You must enter your email';

        // Hapus Message dalam 3 detik
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 3000);
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_rqmiac7','template_dcu74sq','#contact-form','PQN74Bq4ZJyEzP0-T')
            .then(() => {
                // Tampilkan Message dan Tambah class Color
                contactMessage.classList.add('color-green');
                contactMessage.textContent = 'You registered successfully';

                // Hapus Message dalam 3 detik
                setTimeout(() => {
                    contactMessage.textContent = '';
                }, 3000);
            }, (error) => {
                // Pesan Error
                alert('OOPS! SOMETHING HAS FAILED...', error);
            })

        // Bersihkan Input Fielnd
        contactUser.value = '';
    }
}

contactForm.addEventListener('submit', sendEmail);
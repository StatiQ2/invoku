document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Аккордеон FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню после клика
                if(nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь должна быть логика отправки формы
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Видео плэйсхолдер
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if(videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Здесь должна быть логика открытия видео
            this.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        });
    }

    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-item, .team-member, .accordion-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация анимации
    window.addEventListener('load', function() {
        const animatedElements = document.querySelectorAll('.benefit-item, .team-member, .accordion-item');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    });
    
    window.addEventListener('scroll', animateOnScroll);
});
document.addEventListener('DOMContentLoaded', function() {
  const citySelector = document.querySelector('.city-selector');
  const currentCity = document.getElementById('currentCity');
  const cityList = document.getElementById('cityList');
  const cities = document.querySelectorAll('.city-list li');

  // Обработчик клика по текущему городу
  currentCity.addEventListener('click', function(e) {
    e.stopPropagation();
    citySelector.classList.toggle('active');
  });

  // Обработчик выбора города из списка
  cities.forEach(city => {
    city.addEventListener('click', function() {
      const selectedCity = this.textContent;
      const cityId = this.getAttribute('data-city');
      
      // Обновляем текущий город
      currentCity.innerHTML = selectedCity + '<i class="fas fa-chevron-down"></i>';
      
      // Убираем выделение у всех городов
      cities.forEach(c => c.style.fontWeight = 'normal');
      cities.forEach(c => c.style.color = '');
      
      // Выделяем выбранный город
      this.style.fontWeight = '600';
      this.style.color = '#e74c3c';
      
      // Закрываем список
      citySelector.classList.remove('active');
      
      // Здесь можно добавить логику для изменения контента в зависимости от города
      console.log('Выбран город:', cityId);
      // updateCityContent(cityId);
    });
  });

  // Закрываем список при клике вне его
  document.addEventListener('click', function(e) {
    if (!citySelector.contains(e.target)) {
      citySelector.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const cards = document.querySelectorAll('.card');
  const container = document.querySelector('.carousel-container');
  
  let currentIndex = 0;
  let cardWidth = cards[0].offsetWidth + 20; // width + margin
  let autoScrollInterval;
  let isHovering = false;
  
  // Клонируем первые карточки и добавляем в конец для бесшовной прокрутки
  const firstCards = Array.from(cards).slice(0, 3).map(card => card.cloneNode(true));
  firstCards.forEach(card => {
    carousel.appendChild(card);
  });
  
  // Функция для обновления позиции карусели
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Если дошли до конца клонов, плавно переходим к началу
    if (currentIndex >= cards.length) {
      setTimeout(() => {
        carousel.style.transition = 'none';
        currentIndex = 0;
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        setTimeout(() => {
          carousel.style.transition = 'transform 0.5s ease';
        }, 50);
      }, 500);
    }
  }
  
  // Автопрокрутка
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!isHovering) {
        currentIndex++;
        updateCarousel();
      }
    }, 1500);
  }
  
  // Остановка автопрокрутки при наведении
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      isHovering = true;
      clearInterval(autoScrollInterval);
    });
    
    card.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoScroll();
    });
  });
  
  // Запускаем автопрокрутку
  startAutoScroll();
  
  // Адаптация к изменению размера окна
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + 20;
    updateCarousel();
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    // Показать меню при наведении
    dropdown.addEventListener('mouseenter', function() {
        dropdownContent.classList.add('show');
    });
    
    // Скрыть меню при уходе курсора
    dropdown.addEventListener('mouseleave', function() {
        dropdownContent.classList.remove('show');
    });
    
    // Также добавим обработчик для клика (для мобильных устройств)
    dropdown.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });
    
    // Закрывать меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Анимация при скролле к футеру
    const footer = document.querySelector('.ivk-footer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Инициализация стилей перед анимацией
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    observer.observe(footer);

    // Плавная прокрутка для ссылок
    document.querySelectorAll('.ivk-footer a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    window.location.href = this.getAttribute('href');
                }
            }
        });
    });
});
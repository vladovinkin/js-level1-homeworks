'use strict';

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="css/font-awesome.min.css"">');

let slider = document.querySelector('.slider');

// признак работы анимации
let sliderBusy = false;

// Создаём иконку загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fa', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

// Создаём левую стрелку
let leftArrow = document.createElement('i');
leftArrow.classList.add('fa', 'fa-chevron-circle-left', 'slider-leftArrow', 'arrows-none');
slider.insertAdjacentElement("beforeend", leftArrow);

// Создаём правую стрелку
let rightArrow = document.createElement('i');
rightArrow.classList.add('fa', 'fa-chevron-circle-right', 'slider-rightArrow', 'arrows-none');
slider.insertAdjacentElement("beforeend", rightArrow);

// Ждём, когда весь контент целиком загрузится
window.addEventListener('load',  function () {

    leftArrow.addEventListener('click', function() {
        // если анимация не работает
        if (!sliderBusy) {
            // анимация работает
            sliderBusy = true; 
            images.setNextLeftImage();
        }
    });

    rightArrow.addEventListener('click', function() {
        // если анимация не работает
        if (!sliderBusy) {
            // анимация работает
            sliderBusy = true;
            images.setNextRightImage();
        }
    });

    // Подключаем кнопки 'вправо-влево' на клавиатуре
    window.addEventListener('keydown', function(event) {
        // если анимация не работает
        if (!sliderBusy) {
            switch (event.keyCode) {
                case 37:
                    // анимация работает
                    sliderBusy = true;
                    images.setNextLeftImage();
                    break;
                case 39:
                    // анимация работает
                    sliderBusy = true;
                    images.setNextRightImage();
                    break;
            }
        }
    });

    // Скрываем иконку загрузки
    hideLoadIcon(loadIcon);

    // Инициализация слайдов
    images.init();

    // Показываем навигацию
    displayNav();
});

/**
* Функция скрывает иконку загрузки
* "param {HTMLElement} loadIcon
*/
function hideLoadIcon (loadIcon) {
    loadIcon.classList.add('zoomOut');
    setTimeout(() => {
        loadIcon.style.display = "none";    
    }, 500);
}

/** Показываем навигацию */
function displayNav () {
    leftArrow.classList.add('bounceInLeft');
    leftArrow.classList.remove('arrows-none');
    rightArrow.classList.add('bounceInRight');
    rightArrow.classList.remove('arrows-none');
}

/**
 *  Функция берёт у элемента слайдера его data-аттрибуты размеров,
 *  и если они определены, то самому слайдеру меняет размеры.
 *  @param {HTMLDivElement} slider
 */
function setSizes(slider) {
    let width = slider.dataset.width;
    let height = slider.dataset.height;
    
    if (width != null && width != "") {
        slider.style.width = width;
    }

    if (height != null && height != "") {
        slider.style.height = height;
    }
}
setSizes(slider);

// Объект слайдера
let images = {
    /* {int} Номер текущего изображения */
    currentIdx: 0,

    /* {HTMLDivElement[]} slides элементы слайдов */
    slides: [],
    
    /** Получаем все слайды и показываем первый слайд. */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
    },

    /** Берём слайд с текущим индексом и убираем у него класс hidden-slide. */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    },

    /** Переключиться на предыдущее изображение. */
    setNextLeftImage() {
        const oldSlide = this.slides[this.currentIdx];
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        const newSlide = this.slides[this.currentIdx];
        // Анимация перехода.
        this.animateImage(newSlide, 'slideInRight', oldSlide, 'slideOutLeft');
    },
    
    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        const oldSlide = this.slides[this.currentIdx];
        if (this.currentIdx == this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        const newSlide = this.slides[this.currentIdx];
        // Анимация перехода.
        this.animateImage(newSlide, 'slideInLeft', oldSlide, 'slideOutRight');
    },

    /** Анимация между изображениями. */
    animateImage(newSlide, classNewSlide, oldSlide, classOldSlide) {
        newSlide.classList.add(classNewSlide);
        oldSlide.classList.add(classOldSlide);
        newSlide.classList.remove('hidden-slide');
        setTimeout(() => {
            newSlide.classList.remove(classNewSlide);
            oldSlide.classList.add('hidden-slide');
            oldSlide.classList.remove(classOldSlide);
            // анимация "не работает"
            sliderBusy = false;
        }, 500);
    },

    /** Всем сладам добавляем класс hidden-slide. */
    hideVisibleImages() {
        this.slides.forEach(function(slide) {
            slide.classList.add('hidden-slide');
        });
    },
};
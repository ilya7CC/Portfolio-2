const header = document.querySelector('.header')
const about = document.querySelector('.about')
const features = document.querySelector('.features')
const progress = document.querySelector('.progress')
const works = document.querySelector('.works')
const contacts = document.querySelector('.contacts')
const footer = document.querySelector('.footer')

const arrayDOM = [header, about, features, progress, works, contacts, footer]

const buttonUp = document.querySelector('.scroll-button-up')
const buttonDown = document.querySelector('.scroll-button-bottom')
const buttonUpArrow = document.querySelector('.arrow-up')
const buttonDownArrow = document.querySelector('.arrow-bottom')

const progressAnim = document.querySelectorAll('.progress-scale_color')
const progressAnimBlock = document.querySelectorAll('.progress-scale')
const progressAnimLevel = document.querySelectorAll('.progress__content_level')
const progressAnimSkill = document.querySelectorAll('.progress__content_skill-name')
const progressAnimTitle = document.querySelector('.progress__header_title')


function blockHeight(block) {
    return block.offsetHeight
}
let findHeight = blockHeight(header)
// check element
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}
function whatElementTo(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 
function whatContainerIs() {
    for (let index = 0; index < arrayDOM.length; index++) {
        const element = arrayDOM[index];
        if (whatElementTo(element)) {
            return element
        }
    }
}
function whatContainerIsInViewport() {
    for (let index = 0; index < arrayDOM.length; index++) {
        const element = arrayDOM[index];
        if (isElementInViewport(element)) {
            return element
        }
    }
}


// 
function blockY(block) {
    return window.pageYOffset
}
let findY = blockY(whatContainerIs())


//Events
scrollDown = () => {
    if (whatContainerIs().getBoundingClientRect().top === 0) {
        return findHeight
    } else {
        return whatContainerIs().getBoundingClientRect().top
    }
}

buttonDown.addEventListener('click', () => {
    window.scrollTo({
        top: findY + scrollDown(),
        behavior: 'smooth'
    })
})
buttonUp.addEventListener('click', () => {
    window.scrollTo({
        top: findY - findHeight + whatContainerIs().getBoundingClientRect().top,
        behavior: 'smooth'
    })
})


// function addOnWheel(handler) {
//     if (window.addEventListener) {
//       if ('onwheel' in document) {
//         // IE9+, FF17+
//         window.addEventListener("wheel", handler);
//       } else if ('onmousewheel' in document) {
//         // устаревший вариант события
//         window.addEventListener("mousewheel", handler);
//       } else {
//         // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
//         window.addEventListener("MozMousePixelScroll", handler);
//       }
//     } else { // IE8-
//       window.attachEvent("onmousewheel", handler);
//     }
//   }

//   addOnWheel((e) => {
//       if (e.deltaY > 0) {
//         window.scrollTo({
//             top: findY + scrollDown(),
//             behavior: 'smooth'
//         })
//       } else if (e.deltaY < 0) {
//         window.scrollTo({
//             top: findY - findHeight + whatContainerIs().getBoundingClientRect().top,
//             behavior: 'smooth'
//         })
//       }
//     console.log(e.deltaY);
//   })


document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowDown') { // Вниз
        buttonDown.classList.add('key-scroll-bottom')
        buttonDownArrow.classList.add('key-scroll-arrowDown')
        window.scrollTo({
            top: findY + scrollDown(),
            behavior: 'smooth'
        })
        event.preventDefault()
    } else if (event.code === 'ArrowUp') {
        buttonUp.classList.add('key-scroll-up')
        buttonUpArrow.classList.add('key-scroll-arrowUp')
        window.scrollTo({
            top: findY - findHeight + whatContainerIs().getBoundingClientRect().top,
            behavior: 'smooth'
        })
        event.preventDefault()
    }
})
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowDown') { // Вниз
        buttonDown.classList.remove('key-scroll-bottom')
        buttonDownArrow.classList.remove('key-scroll-arrowDown')
    } else if (event.code === 'ArrowUp') {
        buttonUp.classList.remove('key-scroll-up')
        buttonUpArrow.classList.remove('key-scroll-arrowUp')
    }
})


window.addEventListener('scroll', (event) => {
    findY = blockY(whatContainerIs())
    findHeight = blockHeight(header)

    if (findY >= findHeight / 2) {  // ПОРАБОТАТЬ С КНОПКОЙ!!!
        document.querySelector('.scroll-buttons').classList.add('_active')
    } else {
        document.querySelector('.scroll-buttons').classList.remove('_active')
    }


})

// ПОТЕСТИТЬ ПОТОМ TOUCH


// let touchStart = 0
// let touchEnd = 0

// window.addEventListener('touchstart', (event) => {
//     touchStart = event.changedTouches[0].clientY
// })

// window.addEventListener('touchmove', (event) => {
//     event.preventDefault()
//     touchEnd = event.changedTouches[0].clientY
// })

// window.addEventListener('touchend', (event) => {
//     let touchMove = touchStart - touchEnd
//     if (touchMove > 0) { // Up
//         window.scrollTo({
//             top: findY - findHeight + whatContainerIs().getBoundingClientRect().top,
//             behavior: 'smooth'
//         })
//     } else if (touchMove < 0) { // Down
//         window.scrollTo({
//             top: findY + scrollDown(),
//             behavior: 'smooth'
//         })
//     }
// })



// PROGRESS ANIMATION
window.addEventListener('scroll', () => {
    if (window.pageYOffset >= findHeight * arrayDOM.indexOf(progress) / 1.2 && animProgress === true) {
        progressAddClass()
        animProgressON()
    } else if (window.pageYOffset < findHeight * arrayDOM.indexOf(progress) / 1.2 && animProgress === false) {
        animProgressOff()
        progressRemoveClass()
    }

})

// Progress Lines
let animProgress = true
const animProgressON = () => {
    for (let index = 0; index < progressAnim.length; index++) {
        progressAnimBlock[index].classList.remove('progress-scale_noBlock')
        setTimeout(() => {
            progressAnim[index].classList.remove('progress-scale_noColor')
        }, 100 * index);
    }
    animProgress = false
}
const animProgressOff = () => {
    for (let index = 0; index < progressAnim.length; index++) {
        const element = progressAnim[index];
        progressAnimBlock[index].classList.add('progress-scale_noBlock')
        element.classList.add('progress-scale_noColor')
    }
    animProgress = true
}

// Progress other
const progressAddClass = () => {
    progressAnimTitle.classList.add('_progress-anim')
        for (let index = 0; index < progressAnimLevel.length; index++) {
            setTimeout(() => {
                const element = progressAnimLevel[index];
                element.classList.add('_progress-anim')
            }, 80 * index);
        }
        
        for (let index = 0; index < progressAnimSkill.length; index++) {
            setTimeout(() => {
                const element = progressAnimSkill[index];
                element.classList.add('_progress-anim')
            }, 200 * index);
        }
}
const progressRemoveClass = () => {
    progressAnimTitle.classList.remove('_progress-anim')
    for (let index = 0; index < progressAnimLevel.length; index++) {
        const element = progressAnimLevel[index];
        element.classList.remove('_progress-anim')
    }
    for (let index = 0; index < progressAnimSkill.length; index++) {
        const element = progressAnimSkill[index];
        element.classList.remove('_progress-anim')
    }
}

// WORKS ANIMATION
const worksSlide = document.querySelectorAll('.works__slide')

let worksSlideArr = []

for (let index = 0; index < worksSlide.length; index++) {
    const element = worksSlide[index];
    worksSlideArr.push(element)
}

const slideLeft = document.querySelector('.slide__left')
const slideRight = document.querySelector('.slide__right')

// Добавлять классы при инициализации документа


function worksGiveClass() {
    for (let index = 0; index < worksSlideArr.length; index++) {
        if (worksSlideArr.length === 1) {
            worksSlideArr[0].classList.add('_main-slide')
        } else {
            if (index === 0) {
                worksSlideArr[index].classList.add('_left-slide')
                worksSlideArr[index].classList.remove('_main-slide')
                worksSlideArr[index].classList.remove('_right-slide')
            } else if (index === 1) {
                worksSlideArr[index].classList.add('_main-slide')
                worksSlideArr[index].classList.remove('_left-slide')
                worksSlideArr[index].classList.remove('_right-slide')
            } else if (index === 2) {
                worksSlideArr[index].classList.add('_right-slide')
                worksSlideArr[index].classList.remove('_main-slide')
                worksSlideArr[index].classList.remove('_left-slide')
            } else {
                worksSlideArr[index].classList.remove('_main-slide')
                worksSlideArr[index].classList.remove('_left-slide')
                worksSlideArr[index].classList.remove('_right-slide')
            }
        }
    }
} 

worksGiveClass()

slideRight.addEventListener('click', (event) => {
    let element = worksSlideArr[worksSlideArr.length - 1]
    worksSlideArr.splice(0, 0, element)
    worksSlideArr.splice(worksSlideArr.length - 1, 1)
    worksGiveClass()

    slideRight.classList.add('_slide-anim')
    setTimeout(() => {
        slideRight.classList.remove('_slide-anim')
    }, 150);
})

slideLeft.addEventListener('click', (event) => {
    let element = worksSlideArr[0]
    worksSlideArr.push(element)
    worksSlideArr.splice(0, 1)
    worksGiveClass()

    slideLeft.classList.add('_slide-anim')
    setTimeout(() => {
        slideLeft.classList.remove('_slide-anim')
    }, 150);
})

// Works touch event

const worksContent = document.querySelector('.works__content')

let workStart = 0
let workEnd = 0

slideRight.addEventListener('touchend', (event) => {
    event.preventDefault()
    event.stopPropagation()
    let element = worksSlideArr[worksSlideArr.length - 1]
    worksSlideArr.splice(0, 0, element)
    worksSlideArr.splice(worksSlideArr.length - 1, 1)
    worksGiveClass()

    slideRight.classList.add('_slide-anim')
    setTimeout(() => {
        slideRight.classList.remove('_slide-anim')
    }, 150);
})
slideLeft.addEventListener('touchend', (event) => {
    event.preventDefault()
    event.stopPropagation()
    let element = worksSlideArr[0]
    worksSlideArr.push(element)
    worksSlideArr.splice(0, 1)
    worksGiveClass()

    slideLeft.classList.add('_slide-anim')
    setTimeout(() => {
        slideLeft.classList.remove('_slide-anim')
    }, 150);
})


worksContent.addEventListener('touchstart', (event) => {
    workStart = event.changedTouches[0].clientX

})

worksContent.addEventListener('touchmove', (event) => {
    workEnd = event.changedTouches[0].clientX
})
worksContent.addEventListener('touchend', (event) => {
    let workMove = workStart - workEnd
    if (workMove > 0) {
        let element = worksSlideArr[0]
        worksSlideArr.push(element)
        worksSlideArr.splice(0, 1)
        worksGiveClass()
    } else if (workMove < 0) {
        let element = worksSlideArr[worksSlideArr.length - 1]
        worksSlideArr.splice(0, 0, element)
        worksSlideArr.splice(worksSlideArr.length - 1, 1)
        worksGiveClass()
    }
})

// CONTACTS ANIMATION

const contactsForm = document.querySelector('.contacts__form')
const formSubmit = document.querySelector('.contacts__form-submit')

// Почитать здесь про ajax запросы!!!
contactsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    formSubmit.classList.remove('contacts__form-submit_anim')
    setTimeout(() => {
        formSubmit.classList.add('contacts__form-submit_anim')
    }, 3000);
})



// MEDIA

// Adaptive menu 

const adaptiveMenu = document.querySelector('.header__menu_adaptive')

adaptiveMenu.addEventListener('touchend', (event) => {
    
    if (adaptiveMenu.classList.contains('_menu-active')) {
        event.preventDefault()
        adaptiveMenu.classList.remove('_menu-active')
    } else {
        adaptiveMenu.classList.add('_menu-active')
    }
})
document.querySelectorAll('.header__menu_adaptive-link').forEach(anchor => {
    anchor.addEventListener('touchstart', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Features

const featuresContent = document.querySelector('.features__content')
const featureContentBlock = document.querySelectorAll('.features__content_block')
const featureBlockP = document.querySelectorAll('.feature-block-p')


for (let index = 0; index < featureContentBlock.length; index++) {
    const element = featureContentBlock[index];
    element.addEventListener('click', (event) => {
        featureBlockP.forEach(element => {
            if (element.classList.contains('feature-block-p')) {
            } else {
                element.classList.add('feature-block-p')
            }
        });
        
        
        if (featureContentBlock[index].classList.contains('_feature-block_anim')) {
            featureContentBlock[index].classList.remove('_feature-block_anim')
        } else {
            featureContentBlock.forEach(element => {
                if (element.classList.contains('_feature-block_anim')) {
                    element.classList.remove('_feature-block_anim')
                } 
            });
            featureContentBlock[index].classList.add('_feature-block_anim')
            featureBlockP[index].classList.remove('feature-block-p')
        }
        
    })
    
}
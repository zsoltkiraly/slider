/*
Banner slider - Code by Zsolt Király
v1.0.2 - 2018-03-31
*/

var slider = function() {

    function sliderWidth(bS) {
        var slider = bS.querySelector('.slider'),
            sliderContainer = slider.querySelector('.slider-container'),
            sliderLis = sliderContainer.querySelectorAll('ul li');

        var lenSlider = sliderLis.length;
        var sliderLiWidth = slider.offsetWidth;

        var i = 0;

        for (; i < lenSlider; i++) {
            sliderLis[i].style.width = sliderLiWidth + 'px';

            if (sliderLis[i].classList.contains('element')) {

                sliderLis[i].setAttribute('data-id', i);

            }
        }

        var sliderFullWidth = sliderLiWidth * lenSlider;

        sliderContainer.style.width = sliderFullWidth + 'px';
    }


    function clone(bS) {
        var slider = bS.querySelector('.slider'),
            sliderUl = slider.querySelector('.slider-container ul'),
            sliderLis = sliderUl.querySelectorAll('li');

        sliderLis[0].classList.add('active');

        var sliderLiFirstHTML = sliderLis[0].innerHTML;
        var sliderLiFirstBackgroundImage = sliderLis[0].style.backgroundImage;

        var sliderLiLastHTML = sliderLis[sliderLis.length - 1].innerHTML;
        var sliderLiLastBackgroundImage = sliderLis[sliderLis.length - 1].style.backgroundImage;

        var cloneLiFirst = document.createElement('LI');
        cloneLiFirst.setAttribute('class', 'clone-last');
        sliderUl.insertBefore(cloneLiFirst, sliderUl.firstChild);

        var cloneLiLast = document.createElement('LI');
        cloneLiLast.setAttribute('class', 'clone-first');
        sliderUl.insertBefore(cloneLiLast, sliderUl.lastChild);

        var cloneLast = sliderUl.querySelector('.clone-last');
        cloneLast.innerHTML = sliderLiLastHTML;
        cloneLast.style.backgroundImage = sliderLiLastBackgroundImage;

        var cloneFirst = sliderUl.querySelector('.clone-first');
        cloneFirst.innerHTML = sliderLiFirstHTML;
        cloneFirst.style.backgroundImage = sliderLiFirstBackgroundImage;

        sliderUl.style.marginLeft = '-' + slider.offsetWidth + 'px';
    }


    function setWidthResize(bS) {
        var sliderUl = bS.querySelector('.slider .slider-container ul'),
            sliderLi = sliderUl.querySelector('li.element.active');

        var sliderLiDataId = sliderLi.getAttribute('data-id');
        var sliderLiWidth = parseFloat(sliderLi.style.width, 10);

        sliderUl.style.marginLeft = '-' + (sliderLiWidth * sliderLiDataId) + 'px';
    }


    function disabled(disParam, c) {
        disParam.classList.add('disabled-click');

        setTimeout(function() {
            disParam.classList.remove('disabled-click');
        }, c.slideTime);
    }

    function navigation(cParam, bS) {
        var nextButton = bS.querySelector('.slider .slider-right'),
            prevButton = bS.querySelector('.slider .slider-left');

        nextButton.classList.remove('hide');
        prevButton.classList.remove('hide');

        function nextSlide(dI) {
            var slider = bS.querySelector('.slider'),
                sliderUl = slider.querySelector('.slider-container ul'),
                sliderLi = sliderUl.querySelectorAll('li'),
                sliderLiActive = sliderUl.querySelector('li.element.active');

            disabled(slider, cParam);

            var sliderLiWidth = parseFloat(sliderLiActive.style.width, 10),
                sliderUlGet = (parseFloat(sliderUl.style.marginLeft, 10) * -1);

            var dotsUlLi = bS.querySelectorAll('.slider .dots ul li');

            if (dI === undefined) {
                dI = 0;
            }

            if (sliderUlGet <= (sliderLi.length - 3) * sliderLiWidth) {
                sliderLiActive.classList.remove('active');

                var nextElement = sliderLiActive.nextElementSibling;
                nextElement.classList.add('active');

                sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';

                if (dI) {
                    sliderUl.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth + dI) + 'px';

                } else {
                    sliderUl.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth) + 'px';
                }

                setTimeout(function() {
                    sliderUl.style.transition = '';
                }, cParam.slideTime);

                var nextElementId = nextElement.getAttribute('data-id');
                var activeElementId = sliderLiActive.getAttribute('data-id');

                var i = 0,
                    len = dotsUlLi.length;
                for (; i < len; i++) {

                    var dotsUlLis = dotsUlLi[i];

                    var dotsUlLisId = dotsUlLis.getAttribute('data-id');

                    if (activeElementId == dotsUlLisId) {
                        dotsUlLis.classList.remove('active');

                        var nextActive = dotsUlLis.nextElementSibling;

                        if (nextActive) {
                            nextActive.classList.add('active');
                        }
                    }
                }

            } else {

                if (sliderUlGet == (sliderLi.length - 2) * sliderLiWidth) {

                    dotsUlLi[0].classList.add('active');
                    dotsUlLi[dotsUlLi.length - 1].classList.remove('active');

                    sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';
                    sliderUl.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth) + 'px';

                    setTimeout(function() {
                        sliderUl.style.transition = '';
                        sliderLiActive.classList.remove('active');

                        sliderLi[1].classList.add('active');

                        sliderUl.style.marginLeft = '-' + slider.offsetWidth + 'px';

                    }, cParam.slideTime);

                } else {

                    sliderLiActive.classList.remove('active');

                    var nextElement = sliderLiActive.nextElementSibling;
                    nextElement.classList.add('active');

                    var activeDots = slider.querySelector('.dots ul li.active');

                    activeDots.classList.remove('active');

                    var nextDots = activeDots.nextElementSibling;

                    if (nextDots) {
                        nextDots.classList.add('active');
                    }

                    sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';

                    if (dI) {
                        sliderUl.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth + dI) + 'px';

                    } else {
                        sliderUl.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth) + 'px';
                    }

                    if (sliderUlGet > (sliderLi.length - 2) * sliderLiWidth) {

                        dotsUlLi[0].classList.add('active');
                        dotsUlLi[dotsUlLi.length - 1].classList.remove('active');

                        setTimeout(function() {
                            sliderUl.style.transition = '';
                            sliderLiActive.classList.remove('active');

                            sliderLi[1].classList.add('active');

                            sliderUl.style.marginLeft = '-' + slider.offsetWidth + 'px';

                        }, cParam.slideTime);
                    }
                }
            }
        }

        function prevSlide(dI) {
            var slider = bS.querySelector('.slider'),
                sliderUl = slider.querySelector('.slider-container ul'),
                sliderLi = sliderUl.querySelectorAll('li'),
                sliderLiActive = sliderUl.querySelector('li.element.active');

            disabled(slider, cParam);

            var sliderLiWidth = parseFloat(sliderLiActive.style.width, 10),
                sliderUlGet = (parseFloat(sliderUl.style.marginLeft, 10) * -1);

            var dotsUlLi = bS.querySelectorAll('.slider .dots ul li');

            if (dI === undefined) {
                dI = 0;
            }

            if (sliderUlGet > sliderLiWidth) {

                sliderLiActive.classList.remove('active');

                var previousElement = sliderLiActive.previousElementSibling;
                previousElement.classList.add('active');

                sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';

                if (dI) {
                    sliderUl.style.marginLeft = '-' + (sliderUlGet - sliderLiWidth + dI) + 'px';

                } else {
                    sliderUl.style.marginLeft = '-' + (sliderUlGet - sliderLiWidth) + 'px';
                }

                setTimeout(function() {
                    sliderUl.style.transition = '';
                }, cParam.slideTime);

                var previousElementId = previousElement.getAttribute('data-id');
                var activeElementId = sliderLiActive.getAttribute('data-id');

                var i = 0,
                    len = dotsUlLi.length;
                for (; i < len; i++) {

                    var dotsUlLis = dotsUlLi[i];

                    var dotsUlLisId = dotsUlLis.getAttribute('data-id');

                    if (activeElementId == dotsUlLisId) {
                        dotsUlLis.classList.remove('active');
                        dotsUlLis.previousElementSibling.classList.add('active');
                    }
                }

            } else {

                function setLast() {
                    dotsUlLi[0].classList.remove('active');
                    dotsUlLi[dotsUlLi.length - 1].classList.add('active');

                    sliderUl.style.marginLeft = '0px';

                    sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';
                    sliderUl.style.marginLeft = '0px';

                    setTimeout(function() {
                        sliderUl.style.transition = '';
                        sliderLiActive.classList.remove('active');

                        sliderLi[sliderLi.length - 2].classList.add('active');

                        sliderUl.style.marginLeft = '-' + (slider.offsetWidth * (sliderLi.length - 2)) + 'px';
                    }, cParam.slideTime);
                }

                if (sliderUlGet == sliderLiWidth) {
                    setLast();

                } else {
                    setLast();
                }

            }
        }

        if (cParam.autoPlay == true) {
            var autoplay = setInterval(nextSlide, cParam.playTime);
        }

        prevButton.addEventListener('click', function() {
            prevSlide();

            if (cParam.autoPlay == true) {
                clearInterval(autoplay);
                autoplay = setInterval(nextSlide, cParam.playTime);
            }
        }, false);

        nextButton.addEventListener('click', function() {
            nextSlide();

            if (cParam.autoPlay == true) {
                clearInterval(autoplay);
                autoplay = setInterval(nextSlide, cParam.playTime);
            }
        }, false);

        window.addEventListener('resize', function() {
            if (cParam.autoPlay == true) {
                clearInterval(autoplay);
                autoplay = setInterval(nextSlide, cParam.playTime);
            }
        }, false);

        var sliderBox = bS.querySelector('.slider-box');

        var sliderUl = sliderBox.querySelector('.slider-container ul'),
            sliderLi = sliderUl.querySelectorAll('li'),
            startx = 0,
            dist = 0;


        if (sliderBox) {

            sliderBox.addEventListener('touchstart', function(e) {
                var touchobj = e.changedTouches[0];
                startx = parseInt(touchobj.clientX);

                sliderUlGet = (parseFloat(sliderUl.style.marginLeft, 10) * -1);
                sliderLiWidth = parseFloat(sliderLi[0].style.width, 10);

                if (cParam.autoPlay == true) {
                    clearInterval(autoplay);
                    autoplay = setInterval(nextSlide, cParam.playTime);
                }

            }, false);


            sliderBox.addEventListener('touchmove', function(e) {
                var touchobj = e.changedTouches[0];
                var dist = parseInt(touchobj.clientX) - startx;

                if (sliderUlGet == (sliderLiWidth * sliderLi.length - (sliderLiWidth))) {

                    sliderUl.style.marginLeft = '-' + (sliderUlGet - dist) + 'px';

                } else {

                    if (sliderUlGet == sliderLiWidth) {

                        sliderUl.style.marginLeft = '-' + (sliderUlGet - dist) + 'px';

                    } else {
                        sliderUl.style.marginLeft = '-' + (sliderUlGet - dist) + 'px';
                    }
                }

                if (cParam.autoPlay == true) {
                    clearInterval(autoplay);
                    autoplay = setInterval(nextSlide, cParam.playTime);
                }

            }, false);


            sliderBox.addEventListener('touchend', function(e) {

                var touchobj = e.changedTouches[0];
                var dist = parseInt(touchobj.clientX) - startx;

                if (dist > 50) {
                    prevSlide(dist);

                } else if (dist < -50) {
                    nextSlide(dist);

                } else {

                    sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms';

                    setTimeout(function() {
                        sliderUl.style.transition = '';
                    }, cParam.slideTime);

                    sliderUl.style.marginLeft = '-' + sliderUlGet + 'px';
                }

                if (cParam.autoPlay == true) {
                    clearInterval(autoplay);
                    autoplay = setInterval(nextSlide, cParam.playTime);
                }

            }, false);
        }

        var slider = bS.querySelector('.slider'),
            sliderUl = slider.querySelector('.slider-container ul'),
            sliderLi = sliderUl.querySelectorAll('li.element');

        var dotsContainer = document.createElement('DIV');
        dotsContainer.setAttribute('class', 'dots');
        slider.insertBefore(dotsContainer, slider.lastChild);

        bS.querySelector('.slider .dots').innerHTML = '<ul></ul>';

        var dotsUl = bS.querySelector('.slider .dots ul');

        var stop = 0;
        dotsUl.innerHTML = '';
        while (stop < sliderLi.length) {
            dotsUl.innerHTML += '<li></li>';
            stop++;
        }

        var dotsUlLi = dotsUl.querySelectorAll('li');

        dotsUlLi[0].classList.add('active');

        var dotsArray = [];

        var i = 0,
            len = dotsUlLi.length;

        for (; i < len; i++) {

            var dotsUlLis = dotsUlLi[i];

            dotsArray.push(dotsUlLis);

            dotsUlLis.setAttribute('data-id', i + 1);

            dotsUlLis.addEventListener('click', function() {

                if (cParam.autoPlay == true) {
                    clearInterval(autoplay);
                    autoplay = setInterval(nextSlide, cParam.playTime);
                }

                disabled(slider, cParam);

                var obj = this;

                var i = 0;
                for (; i < dotsArray.length, i < sliderLi.length; i++) {
                    var sliderLis = sliderLi[i];
                    var dotsList = dotsArray[i];

                    if (obj.getAttribute('data-id') == sliderLis.getAttribute('data-id')) {
                        sliderLis.classList.add('active');
                    } else {
                        sliderLis.classList.remove('active');
                    }

                    if (obj == dotsList) {
                        dotsList.classList.add('active');

                        var objId = obj.getAttribute('data-id');

                        sliderUl.style.transition = 'all ' + cParam.slideTime + 'ms ease-out';
                        sliderUl.style.marginLeft = '-' + (objId * slider.offsetWidth) + 'px';

                        setTimeout(function() {
                            sliderUl.style.transition = '';
                        }, cParam.slideTime);

                    } else {
                        dotsList.classList.remove('active');
                    }
                }
            }, false);
        }
    }

    function loading(container) {
        setTimeout(function() {
            container.classList.remove('show');

            setTimeout(function() {
                container.classList.remove('loading');
            }, 500);

        }, 500);
    }

    function app() {

        var bannerSlider = document.querySelector('#' + config.contentBox + ''),
            len = bannerSlider.querySelectorAll('.slider .slider-container ul li').length;

        if (len > 1) {
            if (bannerSlider) {
                clone(bannerSlider);
                sliderWidth(bannerSlider);
                navigation(config, bannerSlider);

                window.addEventListener('resize', function() {
                    sliderWidth(bannerSlider);
                    setWidthResize(bannerSlider);
                }, false);
            }
        }

        loading(bannerSlider);
    }

    return {
        app: app
    }

}();
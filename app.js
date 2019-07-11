var lppModule = (function () {
    'use strict';

    let _eventName = 'click';
    let _isMenuOpen = false;
    let _mouseY = 0;
    let _popupCounter = 0;
    let _slideIndex = 1;
    const _modal = document.querySelector("#modal");

    const _PlatformTypeEnum = { "UNKNOWN": 0, "SAFARI_MOBILE": 1, "SAFARI_DESKTOP": 2, "MOBILE": 3, "DESKTOP": 4 }
    let _platformType = _PlatformTypeEnum.UNKNOWN;
    let _isMobile = false;

    function _detectIsMobileBrowser() {
        const a = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
    }

    function _getPlatformType() {
        const ua = navigator.userAgent.toLowerCase();
        const isSafari = (ua.indexOf('safari') != -1) && (ua.indexOf('chrome') == -1);
        if (isSafari) {
            //alert(ua);
            //_isMobile = !!(ua.match(/ipad/i) || ua.match(/iphone/i));
            if (ua.match(/ipad/i)) {
                return _PlatformTypeEnum.SAFARI_DESKTOP;
            }
            else {
                return _PlatformTypeEnum.SAFARI_MOBILE;
            }
        }
        else {
            _isMobile = _detectIsMobileBrowser();
            if (_isMobile) {
                return _PlatformTypeEnum.MOBILE;
            }
            else {
                return _PlatformTypeEnum.DESKTOP;
            }
        }
    }

    function _toggleMenu() {
        if (_isMenuOpen) {
            document.querySelector('body').classList.remove('main-nav-open');
            document.querySelector('body').classList.add('main-nav-close');
        }
        else {
            document.querySelector('body').classList.remove('main-nav-close');
            document.querySelector('body').classList.add('main-nav-open');
        }
        _isMenuOpen = !_isMenuOpen;
    }

    function _toggleScrolledClassOnScroll() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.querySelector('body').classList.add('scrolled');
        } else {
            document.querySelector('body').classList.remove('scrolled');
        }

        document.querySelector('.hamburger').removeEventListener(_eventName, _toggleMenu, false);
        document.querySelector('.hamburger').addEventListener(_eventName, _toggleMenu, false);
    }

    function _addCloseAlertEvent(event) {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(() => {
            div.style.display = "none";
        }, 600);
    }

    function _openDropDown(event) {
        if (!event.target.matches('.toggle-dropdown-btn')) {
            var dropdowns = document.querySelectorAll('.dropdown-content');
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show-dropdown-content')) {
                openDropdown.classList.remove('show-dropdown-content');
              }
            }
          }
      }

    function _showSlides(n) {
        var i;
        var slides = document.querySelectorAll('.testimonial-slides');
        
        if (n > slides.length) {
            _slideIndex = 1;
            }    
        if (n < 1) {
            _slideIndex = slides.length;
            }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';  
        }
        slides[_slideIndex-1].style.display = 'block';  
    }

      function _moveSlides(event) {
          if(event.target.classList.contains('prev')) {
            _slideIndex--;
          }
          else if(event.target.classList.contains('next')) {
            _slideIndex++;
          }
          _showSlides(_slideIndex);
      }
    

    function _toggleLanguagesDropDown() {
        document.querySelector("#lang-dropdown").classList.toggle("show-dropdown-content");
    }

    function _addClickOrTouchendEventListeners() {
        document.querySelector('.hamburger').addEventListener(_eventName, _toggleMenu, false);
        document.querySelector('.menu-overlay').addEventListener(_eventName, _toggleMenu, false);
        document.querySelector('.toggle-dropdown-btn').addEventListener(_eventName, _toggleLanguagesDropDown, false); 
        

        var closeAlertButtons = document.querySelectorAll('.close-alert-button');
        var i;
        for (i = 0; i < closeAlertButtons.length; i++) {
            closeAlertButtons[i].addEventListener(_eventName, _addCloseAlertEvent, false);
        }

        document.querySelector('.close-modal').addEventListener(_eventName, _closeEngagementModal, false);

        window.addEventListener(_eventName, _openDropDown);

        const slideButtons = document.querySelectorAll('.slide-button');
        slideButtons.forEach(button => {
            button.addEventListener(_eventName, _moveSlides, false);
        });
    }

    function _addFormSubmitListeners() {
        const contactForm = document.querySelector('#contact-form');
        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            const email = contactForm.querySelector("input[name='email']").value;

            if(email === '') {
                alert('Please fill email address');
                return;
            }

            contactForm.submit();
        });

        const bottomContactForm = document.querySelector('#bottom-contact-form');
        bottomContactForm.addEventListener('submit', event => {
            event.preventDefault();
           
            const email = bottomContactForm.querySelector("input[name='email']").value;

            if(email === '') {
                alert('Please fill email address');
                return;
            }

            bottomContactForm.submit();
        });

        
    }

    function _addScrollEventListeners() {
        window.addEventListener('scroll', _toggleScrolledClassOnScroll, false);
    }

    function _setClickOrTouchendEventName() {
        if (_platformType === _PlatformTypeEnum.SAFARI_MOBILE || _platformType === _PlatformTypeEnum.MOBILE) {
            _eventName = 'touchend';
        }
        else if (_platformType === _PlatformTypeEnum.SAFARI_DESKTOP || _platformType === _PlatformTypeEnum.DESKTOP) {
            _eventName = 'click';
        }
        else {
            _eventName = 'click';
        }
    }

    function _addEngagementModalEventListeners() {
        if (_platformType == _PlatformTypeEnum.DESKTOP) {
            document.addEventListener("mousemove", function (e) {
                _mouseY = e.clientY;
            });
            document.addEventListener("mouseleave", function (e) {
                if (_mouseY < 100) {
                    if (_popupCounter < 1) {
                        _openEngagementModal();
                    }
                    _popupCounter++;
                }
            });
        }
        else {
            setTimeout(() => {
                _openEngagementModal();
            }, 5000);
        }
    }

    function _init() {
        _platformType = _getPlatformType();
        if(_platformType === _PlatformTypeEnum.SAFARI_DESKTOP || _platformType === _PlatformTypeEnum.SAFARI_MOBILE) {
            document.querySelector('body').classList.add('safari');
        }
        else {
            document.querySelector('body').classList.add('not-safari');
        }

        if(_platformType === _PlatformTypeEnum.SAFARI_DESKTOP || _platformType === _PlatformTypeEnum.DESKTOP) {
            document.querySelector('body').classList.add('desktop');
        }
        else if(_platformType === _PlatformTypeEnum.SAFARI_MOBILE || _platformType === _PlatformTypeEnum.MOBILE) {
            document.querySelector('body').classList.add('mobile');
        }

        _setClickOrTouchendEventName();
        _addScrollEventListeners();
        _addClickOrTouchendEventListeners();
        _addFormSubmitListeners();
        _showSlides(_slideIndex);
        // _addEngagementModalEventListeners();
    }

    function _openEngagementModal() {
        _modal.style.display = "block";
    }

    function _closeEngagementModal() {
        _modal.style.display = "none";
    }

    return {
        init: function () {
            _init();
        }
    };
}());

lppModule.init();

 




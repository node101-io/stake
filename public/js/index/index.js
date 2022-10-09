const CALCULATOR_INFO_SHOW_TIME = 2000;
const MAX_TOKEN = 100000;
const MAX_TIME = 90;
const RESPONSIVE_NAVIGATION_MENU_ANIMATON_TIME = 400; // 0.4s

let projects;
let isResponsiveMenuOn = false;
let isOnStartPageButton = false;
let clickedCalculatorButton = null;
let selectedCalculatorProject;
let calculatorToken = 10000;
let calculatorDay = 30;
let showCalculatorButtonActiveList = [];

function smoothScroll(element, amount) {
  if (amount < 0)
    return;

  element.scrollBy(0, Math.min(amount, 15));

  setTimeout(() => {
    smoothScroll(element, amount - 15);
  }, 5);
}

function getScrollDistance(element) {
  return window.pageYOffset + element.getBoundingClientRect().top;
}

function showCalculatorButton(id, isRecursive) {
  if (showCalculatorButtonActiveList.includes(id) && !isRecursive)
    return;
  if (!isRecursive)
    showCalculatorButtonActiveList.push(id);

  setTimeout(() => {
    if (clickedCalculatorButton || document.getElementById(id) == document.activeElement) {
      showCalculatorButton(id, true);
    } else {
      document.getElementById(id).style.display = 'none';
      showCalculatorButtonActiveList = showCalculatorButtonActiveList.filter(each => each != id);
    }
  }, CALCULATOR_INFO_SHOW_TIME);
};

function updateCalculatorInfo(_button) {
  const button = _button;

  if (!button.classList.contains('calculator-each-line-button'))
    return;

  const type = button.parentNode.parentNode.id.replace('-calculator-line', '');
  const percent = Math.min(1, Math.max(0, button.getBoundingClientRect().left - button.parentNode.getBoundingClientRect().left) / button.parentNode.offsetWidth);
  const amount = Math.round((type == 'token' ? MAX_TOKEN : MAX_TIME) * percent);

  if (type == 'token')
    calculatorToken = amount;
  else
    calculatorDay = amount;

  let text = (type == 'token' ? (amount >= 1000 ? parseInt(amount / 1000) + '.' + (amount % 1000) : amount) : amount + ' DAY')
  while (amount >= 1000 && text.includes('.') && text.split('.')[1].length != 3)
    text += '0';

  button.childNodes[0].style.display = 'flex';
  button.childNodes[0].innerHTML = text;
  button.parentNode.parentNode.childNodes[2].innerHTML = text;

  showCalculatorButton(button.childNodes[0].id, false);

  updateCalculatorResult();
}

function updateCalculatorResult() {
  let amount = calculatorToken;

  for (let i = 0; i < calculatorDay; i++)
    amount += amount * selectedCalculatorProject.apr / 30;

  amount -= calculatorToken;

  document.getElementById('calculator-earn-token-text').innerHTML = Math.round(amount);
  document.getElementById('calculator-earn-dollars-text').innerHTML = Math.round(amount * selectedCalculatorProject.market_price);
}

window.addEventListener('load', () => {
  projects = JSON.parse(document.getElementById('projects').value);
  selectedCalculatorProject = projects.find(each => each._id.toString() == document.querySelector('.calculator-each-project-title-selected').id.replace('calculator-', ''));

  const responsiveMenu = document.getElementById('responsive-menu');
  const contentWrapper = document.querySelector('.content-wrapper');

  const projectsWrapper = document.querySelector('.projects-wrapper');
  const calculatorWrapper = document.querySelector('.calculator-wrapper');
  const howToStakeWrapper = document.querySelector('.how-to-stake-wrapper');
  const aboutUsWrapper = document.querySelector('.about-us-wrapper');

  const projectsScrollDistance = getScrollDistance(projectsWrapper) - 500;
  const calculatorScrollDistance = getScrollDistance(calculatorWrapper) - 500;
  const howToStakeScrollDistance = getScrollDistance(howToStakeWrapper) - 500;
  const aboutUsScrollDistance = getScrollDistance(aboutUsWrapper) - 500;

  const startPageLearnMoreButton = document.querySelector('.start-page-learn-more-button');

  contentWrapper.addEventListener('scroll', event => {
    // document.querySelector('.header-wrapper').style.backgroundColor = `rgba(18, 18, 18, ${Math.min(2 * event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.4})`;
    // document.querySelector('.header-wrapper').style.boxShadow = `0 0 10px rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.3})`;
    // document.querySelector('.header-wrapper').style.backdropFilter = `blur(${Math.min(2 * event.target.scrollTop, window.innerHeight) / window.innerHeight * 30}px)`;

    document.querySelector('.social-media-wrapper').style.opacity = (1 - Math.min(event.target.scrollTop, 100) / 100) * 0.8;
    if (event.target.scrollTop >= 100)
      document.querySelector('.social-media-wrapper').style.display = 'none';
    else
      document.querySelector('.social-media-wrapper').style.display = 'flex';

    if (event.target.scrollTop >= projectsScrollDistance && event.target.scrollTop < calculatorScrollDistance) {
      const selectedHeaderButtons = document.querySelectorAll('.each-header-button-selected');

      for (let i = 0; i < selectedHeaderButtons.length; i++)
        if (selectedHeaderButtons[i].id != 'projects-header-button' && selectedHeaderButtons[i].id != 'responsive-projects-header-button')
          selectedHeaderButtons[i].classList.remove('each-header-button-selected');
      
      document.getElementById('projects-header-button').classList.add('each-header-button-selected');
      document.getElementById('responsive-projects-header-button').classList.add('each-header-button-selected');
    } else if (event.target.scrollTop >= calculatorScrollDistance && event.target.scrollTop < howToStakeScrollDistance) {
      const selectedHeaderButtons = document.querySelectorAll('.each-header-button-selected');

      for (let i = 0; i < selectedHeaderButtons.length; i++)
        if (selectedHeaderButtons[i].id != 'calculator-header-button' && selectedHeaderButtons[i].id != 'responsive-calculator-header-button')
          selectedHeaderButtons[i].classList.remove('each-header-button-selected');
      
      document.getElementById('calculator-header-button').classList.add('each-header-button-selected');
      document.getElementById('responsive-calculator-header-button').classList.add('each-header-button-selected');
    } else if (event.target.scrollTop >= howToStakeScrollDistance && event.target.scrollTop < aboutUsScrollDistance) {
      const selectedHeaderButtons = document.querySelectorAll('.each-header-button-selected');

      for (let i = 0; i < selectedHeaderButtons.length; i++)
        if (selectedHeaderButtons[i].id != 'how-to-stake-header-button' && selectedHeaderButtons[i].id != 'responsive-how-to-stake-header-button')
          selectedHeaderButtons[i].classList.remove('each-header-button-selected');
      
      document.getElementById('how-to-stake-header-button').classList.add('each-header-button-selected');
      document.getElementById('responsive-how-to-stake-header-button').classList.add('each-header-button-selected');
    } else if (event.target.scrollTop >= aboutUsScrollDistance) {
      const selectedHeaderButtons = document.querySelectorAll('.each-header-button-selected');

      for (let i = 0; i < selectedHeaderButtons.length; i++)
        if (selectedHeaderButtons[i].id != 'about-us-header-button' && selectedHeaderButtons[i].id != 'responsive-about-us-header-button')
          selectedHeaderButtons[i].classList.remove('each-header-button-selected');
      
      document.getElementById('about-us-header-button').classList.add('each-header-button-selected');
      document.getElementById('responsive-about-us-header-button').classList.add('each-header-button-selected');
    } else if (document.querySelectorAll('.each-header-button-selected') && document.querySelectorAll('.each-header-button-selected').length) {
      const selectedHeaderButtons = document.querySelectorAll('.each-header-button-selected');

      for (let i = 0; i < selectedHeaderButtons.length; i++)
        selectedHeaderButtons[i].classList.remove('each-header-button-selected');
    } 
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('each-header-button') && !event.target.classList.contains('each-header-button-selected')) {
      const wrapper = document.querySelector(`.${event.target.id.replace('-header-button', '')}-wrapper`);
      document.querySelector('.content-wrapper').scrollBy(0, getScrollDistance(wrapper));
    }

    if (event.target.classList.contains('each-responsive-navigation-menu-button') && !event.target.classList.contains('each-header-button-selected')) {
      const wrapper = document.querySelector(`.${event.target.id.replace('-header-button', '').replace('responsive-', '')}-wrapper`);
      document.querySelector('.content-wrapper').scrollBy(0, getScrollDistance(wrapper));
      responsiveMenu.classList.remove('responsive-navigation-menu-wrapper-open');
      responsiveMenu.classList.add('responsive-navigation-menu-wrapper-close');
      isResponsiveMenuOn = false;
    }

    if (event.target.classList.contains('calculator-each-line')) {
      event.target.querySelector('.calculator-each-line-button').style.marginLeft = (event.clientX - event.target.getBoundingClientRect().left - (event.target.querySelector('.calculator-each-line-button').offsetWidth / 2)) + 'px';
      updateCalculatorInfo(event.target.querySelector('.calculator-each-line-button'));
    }

    if (event.target.classList.contains('calculator-each-project-title') && !event.target.classList.contains('calculator-each-project-title-selected')) {
      document.querySelector('.calculator-each-project-title-selected').classList.remove('calculator-each-project-title-selected');
      selectedCalculatorProject = projects.find(each => each._id.toString() == event.target.id.replace('calculator-', ''));
      document.getElementById('calculator-earn-token-icon').src = selectedCalculatorProject.image;
      event.target.classList.add('calculator-each-project-title-selected');
      updateCalculatorResult();
    }

    if (ancestorWithClassName(event.target, 'hamburger-menu-wrapper')) {
      responsiveMenu.style.display = 'flex';
      responsiveMenu.classList.add('responsive-navigation-menu-wrapper-open');
      responsiveMenu.classList.remove('responsive-navigation-menu-wrapper-close');
      isResponsiveMenuOn = true;
    } else if (ancestorWithClassName(event.target, 'responsive-navigation-menu-close-button')) {
      responsiveMenu.classList.remove('responsive-navigation-menu-wrapper-open');
      responsiveMenu.classList.add('responsive-navigation-menu-wrapper-close');
      isResponsiveMenuOn = false;
      setTimeout(() => {
        responsiveMenu.style.display = 'none';
      }, RESPONSIVE_NAVIGATION_MENU_ANIMATON_TIME);
    } else if (isResponsiveMenuOn && !ancestorWithClassName(event.target, 'responsive-navigation-menu-wrapper')) {
      responsiveMenu.classList.remove('responsive-navigation-menu-wrapper-open');
      responsiveMenu.classList.add('responsive-navigation-menu-wrapper-close');
      isResponsiveMenuOn = false;
      setTimeout(() => {
        responsiveMenu.style.display = 'none';
      }, RESPONSIVE_NAVIGATION_MENU_ANIMATON_TIME);
    }

    if (isOnStartPageButton) {
      smoothScroll(contentWrapper, getScrollDistance(projectsWrapper));
      startPageLearnMoreButton.classList.remove('start-page-learn-more-button-hovered');
      document.body.style.cursor = 'unset';
    }
  });

  document.addEventListener('mousemove', event => {
    if (clickedCalculatorButton) {
      clickedCalculatorButton.style.marginLeft = Math.max(0, Math.min(event.clientX - clickedCalculatorButton.parentNode.getBoundingClientRect().left - clickedCalculatorButton.offsetWidth / 2, clickedCalculatorButton.parentNode.offsetWidth - clickedCalculatorButton.offsetWidth)) + 'px';
      updateCalculatorInfo(clickedCalculatorButton);
    }

    if (event.target.classList.contains('start-page-transparent-cover') && event.clientX >= startPageLearnMoreButton.getBoundingClientRect().left && event.clientX <= startPageLearnMoreButton.getBoundingClientRect().right && event.clientY >= startPageLearnMoreButton.getBoundingClientRect().top && event.clientY <= startPageLearnMoreButton.getBoundingClientRect().bottom) {
      startPageLearnMoreButton.classList.add('start-page-learn-more-button-hovered');
      document.body.style.cursor = 'pointer';
      isOnStartPageButton = true;
    } else {
      startPageLearnMoreButton.classList.remove('start-page-learn-more-button-hovered');
      document.body.style.cursor = 'unset';
      isOnStartPageButton = false;
    }
  });

  document.addEventListener('mousedown', event => {
    if (event.target.classList.contains('calculator-each-line-button')) {
      clickedCalculatorButton = event.target;
    }
  });

  document.addEventListener('mouseup', event => {
    if (clickedCalculatorButton) {
      clickedCalculatorButton = null;
    }
  });

  document.addEventListener('mouseover', event => {
    if (ancestorWithClassName(event.target, 'each-team-member-wrapper')) {
      const target = ancestorWithClassName(event.target, 'each-team-member-wrapper');

      if (target.classList.contains('each-team-member-wrapper-hovered'))
        return;

      if (document.querySelector('.each-team-member-wrapper-hovered'))
        document.querySelector('.each-team-member-wrapper-hovered').classList.remove('each-team-member-wrapper-hovered');

      target.classList.add('each-team-member-wrapper-hovered');
    } else if (document.querySelector('.each-team-member-wrapper-hovered')) {
      document.querySelector('.each-team-member-wrapper-hovered').classList.remove('each-team-member-wrapper-hovered');
    }
  });
});

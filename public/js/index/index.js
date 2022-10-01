const MAX_TOKEN = 100000;
const MAX_TIME = 90;

let projects;
let isOnStartPageButton = false;
let clickedCalculatorButton = null;
let selectedCalculatorProject;
let calculatorToken = 50000;
let calculatorDay = 27;

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

function updateCalculatorInfo(button) {
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

  button.childNodes[0].innerHTML = text;
  button.parentNode.parentNode.childNodes[2].innerHTML = text;

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

  const projectsWrapper = document.querySelector('.projects-wrapper');
  const calculatorWrapper = document.querySelector('.calculator-wrapper');
  const howToStakeWrapper = document.querySelector('.how-to-stake-wrapper');
  const aboutUsWrapper = document.querySelector('.about-us-wrapper');

  const projectsScrollDistance = getScrollDistance(projectsWrapper) - 500;
  const calculatorScrollDistance = getScrollDistance(calculatorWrapper) - 500;
  const howToStakeScrollDistance = getScrollDistance(howToStakeWrapper) - 500;
  const aboutUsScrollDistance = getScrollDistance(aboutUsWrapper) - 500;

  const startPageLearnMoreButton = document.querySelector('.start-page-learn-more-button');

  document.querySelector('.content-wrapper').addEventListener('scroll', event => {
    document.querySelector('.header-wrapper').style.backgroundColor = `rgba(18, 18, 18, ${Math.min(2 * event.target.scrollTop, window.innerHeight) / window.innerHeight})`;
    document.querySelector('.header-wrapper').style.borderBottomColor = `rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight})`;
    document.querySelector('.header-wrapper').style.boxShadow = `0 0 10px rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.4})`;
    document.querySelector('.social-media-wrapper').style.opacity = (1 - Math.min(event.target.scrollTop, 100) / 100) * 0.8;
    if (event.target.scrollTop >= 100)
      document.querySelector('.social-media-wrapper').style.display = 'none';
    else
      document.querySelector('.social-media-wrapper').style.display = 'flex';

    if (event.target.scrollTop >= projectsScrollDistance && event.target.scrollTop < calculatorScrollDistance) {
      if (document.querySelector('.each-header-button-selected') && document.querySelector('.each-header-button-selected') != document.querySelector('.projects-wrapper')) {
        document.querySelector('.each-header-button-selected').classList.remove('each-header-button-selected');
        document.getElementById('projects-header-button').classList.add('each-header-button-selected');
      } else if (!document.querySelector('.each-header-button-selected')) {
        document.getElementById('projects-header-button').classList.add('each-header-button-selected');
      }
    } else if (event.target.scrollTop >= calculatorScrollDistance && event.target.scrollTop < howToStakeScrollDistance) {
      if (document.querySelector('.each-header-button-selected') && document.querySelector('.each-header-button-selected') != document.querySelector('.projects-wrapper')) {
        document.querySelector('.each-header-button-selected').classList.remove('each-header-button-selected');
        document.getElementById('calculator-header-button').classList.add('each-header-button-selected');
      } else if (!document.querySelector('.each-header-button-selected')) {
        document.getElementById('calculator-header-button').classList.add('each-header-button-selected');
      }
    } else if (event.target.scrollTop >= howToStakeScrollDistance && event.target.scrollTop < aboutUsScrollDistance) {
      if (document.querySelector('.each-header-button-selected') && document.querySelector('.each-header-button-selected') != document.querySelector('.projects-wrapper')) {
        document.querySelector('.each-header-button-selected').classList.remove('each-header-button-selected');
        document.getElementById('how-to-stake-header-button').classList.add('each-header-button-selected');
      } else if (!document.querySelector('.each-header-button-selected')) {
        document.getElementById('how-to-stake-header-button').classList.add('each-header-button-selected');
      }
    } else if (event.target.scrollTop >= aboutUsScrollDistance) {
      if (document.querySelector('.each-header-button-selected') && document.querySelector('.each-header-button-selected') != document.querySelector('.projects-wrapper')) {
        document.querySelector('.each-header-button-selected').classList.remove('each-header-button-selected');
        document.getElementById('about-us-header-button').classList.add('each-header-button-selected');
      } else if (!document.querySelector('.each-header-button-selected')) {
        document.getElementById('about-us-header-button').classList.add('each-header-button-selected');
      }
    } else if (document.querySelector('.each-header-button-selected') && document.querySelector('.each-header-button-selected') != document.querySelector('.projects-wrapper')) {
      document.querySelector('.each-header-button-selected').classList.remove('each-header-button-selected');
    } 
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('each-header-button') && !event.target.classList.contains('each-header-button-selected')) {
      const wrapper = document.querySelector(`.${event.target.id.replace('-header-button', '')}-wrapper`);
      document.querySelector('.content-wrapper').scrollBy(0, getScrollDistance(wrapper) - 100);
    }

    if (event.target.classList.contains('calculator-each-line')) {
      event.target.querySelector('.calculator-each-line-button').style.marginLeft = (event.clientX - event.target.getBoundingClientRect().left - (event.target.querySelector('.calculator-each-line-button').offsetWidth / 2)) + 'px';
      updateCalculatorInfo(event.target.querySelector('.calculator-each-line-button'));
    }

    if (event.target.classList.contains('calculator-each-project-title') && !event.target.classList.contains('calculator-each-project-title-selected')) {
      document.querySelector('.calculator-each-project-title-selected').classList.remove('calculator-each-project-title-selected');
      selectedCalculatorProject = projects.find(each => each._id.toString() == event.target.id.replace('calculator-', ''));
      event.target.classList.add('calculator-each-project-title-selected');
    }

    if (isOnStartPageButton) {
      smoothScroll(document.querySelector('.content-wrapper'), window.innerHeight - 80);
      startPageLearnMoreButton.classList.remove('start-page-learn-more-button-hovered');
      document.body.style.cursor = 'unset';
    }
  });

  document.addEventListener('mousemove', event => {
    if (clickedCalculatorButton) {
      clickedCalculatorButton.style.marginLeft = Math.max(0, Math.min(event.clientX - clickedCalculatorButton.parentNode.getBoundingClientRect().left - clickedCalculatorButton.offsetWidth / 2, clickedCalculatorButton.parentNode.offsetWidth - clickedCalculatorButton.offsetWidth)) + 'px';
      updateCalculatorInfo(clickedCalculatorButton);
    }

    if (event.clientX >= startPageLearnMoreButton.getBoundingClientRect().left && event.clientX <= startPageLearnMoreButton.getBoundingClientRect().right && event.clientY >= startPageLearnMoreButton.getBoundingClientRect().top && event.clientY <= startPageLearnMoreButton.getBoundingClientRect().bottom) {
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

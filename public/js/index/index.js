let projects;
let clickedCalculatorButton = null;

function smoothScroll(element, amount) {
  if (amount < 10)
    return;

  element.scrollBy(0, 10);

  setTimeout(() => {
    smoothScroll(element, amount - 10);
  }, 5);
}

function getScrollDistance(element) {
  return window.pageYOffset + element.getBoundingClientRect().top;
}

window.addEventListener('load', () => {
  projects = JSON.parse(document.getElementById('projects').value);

  const projectsWrapper = document.querySelector('.projects-wrapper');
  const calculatorWrapper = document.querySelector('.calculator-wrapper');
  const howToStakeWrapper = document.querySelector('.how-to-stake-wrapper');
  const aboutUsWrapper = document.querySelector('.about-us-wrapper');

  const projectsScrollDistance = getScrollDistance(projectsWrapper) - 500;
  const calculatorScrollDistance = getScrollDistance(calculatorWrapper) - 500;
  const howToStakeScrollDistance = getScrollDistance(howToStakeWrapper) - 500;
  const aboutUsScrollDistance = getScrollDistance(aboutUsWrapper) - 500;

  document.querySelector('.content-wrapper').addEventListener('scroll', event => {
    document.querySelector('.header-wrapper').style.backgroundColor = `rgba(18, 18, 18, ${Math.min(2 * event.target.scrollTop, window.innerHeight) / window.innerHeight})`;
    document.querySelector('.header-wrapper').style.borderBottomColor = `rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight})`;
    document.querySelector('.header-wrapper').style.boxShadow = `0 0 10px rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.4})`;
    document.querySelector('.learn-more-button').style.opacity = (1 - Math.min(event.target.scrollTop, 100) / 100) * 0.8;
    if (event.target.scrollTop >= 100)
      document.querySelector('.learn-more-button').style.display = 'none';
    else
      document.querySelector('.learn-more-button').style.display = 'flex';

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
    if (ancestorWithClassName(event.target, 'learn-more-button')) {
      smoothScroll(document.querySelector('.content-wrapper'), window.innerHeight - 100);
    }

    if (event.target.classList.contains('each-header-button') && !event.target.classList.contains('each-header-button-selected')) {
      const wrapper = document.querySelector(`.${event.target.id.replace('-header-button', '')}-wrapper`);
      document.querySelector('.content-wrapper').scrollBy(0, getScrollDistance(wrapper) - 100);
    }

    if (event.target.classList.contains('calculator-each-line')) {
      event.target.querySelector('.calculator-each-line-button').style.marginLeft = (event.clientX - event.target.getBoundingClientRect().left - (event.target.querySelector('.calculator-each-line-button').offsetWidth / 2)) + 'px';
    }

    // if (event.target.classList.contains('calculator-each-line-button'))
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

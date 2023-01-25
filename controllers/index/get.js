module.exports = (req, res) => {
  return res.render('stake/stake', {
    page: 'stake/stake',
    title: res.__('Stake your assets with the industry\'s most user-friendly organization!'),
    includes: {
      external: {
        css: ['aos', 'bootstrap.min', 'font-awesome.min', 'general', 'page', 'slider', 'style', 'swiper-bundle.min'],
        js: ['jquery-1.11.2.min', 'jquery.counterup.min', 'jquery.waypoints.min', 'aos', 'big', 'bootstrap.min', 'calculator', 'public', 'swiper-bundle.min']
      },
      meta: {
        title: res.__('Not an ordinary validator | stake.node101'),
        description: res.__('Stake your assets with the industry\'s most user-friendly organization! node101 accompanies you on your staking journey from start to finish and offers a privileged service where you can safely stake your assets and get support from experts whenever you want.'),
        image: '/res/images/open-graph/header.png',
        twitter: true
      }
    }
  });
}
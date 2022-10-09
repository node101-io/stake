const Stake = require('../../../models/stake/Stake');

module.exports = (req, res) => {
  const page_lang = req.query.lang ? req.query.lang : (req.headers['accept-language'] ? req.headers['accept-language'].split('-')[0] : 'en');

  Stake.findStakesByFilters({ lang: page_lang }, (err, projects) => {
    if (err) return res.redirect('/error?message=' + err);

    return res.render('index/index', {
      page: 'index/index',
      title: res.__('Stake your assets with node101!'),
      includes: {
        external: {
          css: ['general', 'page'],
          js: ['ancestorWithClassName', 'page']
        },
        meta: {
          description: res.__('Stake your assets with the industry\'s most user-friendly organization! node101 accompanies you on your staking journey from start to finish and offers a privileged service where you can safely stake your assets and get support from experts whenever you want.'),
          image: '/res/images/meta.jpeg',
          keywords: projects.map(each => each.name.toLocaleLowerCase()).concat(['node101', 'stake', 'blockchain', 'passive', 'income', 'earn', 'APR', 'APY', 'price', 'market', 'coin']),
          title: 'Stake with node101!'
        }
      },
      lang: req.query.lang,
      page_lang,
      getSocialMediaIconPathAndViewBox: function (link) {
        if (link == 'web')
          return ({
            viewBox: '0 0 512 512',
            path: 'M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z'
          });
        if (link == 'linkedin')
          return ({
            viewBox: '0 0 448 512',
            path: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z'
          });
        if (link == 'github')
          return ({
            viewBox: '0 0 496 512',
            path: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
          });
        if (link == 'telegram')
          return ({
            viewBox: '0 0 496 512',
            path: 'M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z'
          });
        if (link == 'medium')
          return ({
            viewBox: '0 0 20 16',
            path: 'M2.37167 3.23917C2.39667 2.99333 2.3025 2.75083 2.11917 2.58583L0.2525 0.335833V0H6.05083L10.5325 9.82917L14.4725 0H20V0.335833L18.4033 1.86667C18.2658 1.97167 18.1975 2.14417 18.2258 2.315V13.5633C18.1975 13.7333 18.2658 13.9058 18.4033 14.0108L19.9625 15.5417V15.8775H12.1192V15.5417L13.735 13.9733C13.8933 13.815 13.8933 13.7683 13.8933 13.5258V4.43417L9.4025 15.8408H8.79583L3.56667 4.43417V12.0792C3.52333 12.4 3.63 12.7242 3.85583 12.9558L5.95667 15.5042V15.8408H0V15.5042L2.10083 12.9558C2.32583 12.7233 2.42583 12.3975 2.37167 12.0792V3.23917V3.23917Z'
          });
        if (link == 'twitter')
          return ({
            viewBox: '0 0 512 512',
            path: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
          });
        if (link == 'instagram')
          return ({
            viewBox: '0 0 448 512',
            path: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'
          });
        if (link == 'gitbook')
          return ({
            viewBox: '0 0 400 500',
            path: 'M308.374 408.042C318.591 408.042 327.786 416.246 327.786 427.526C327.786 437.78 319.612 447.009 308.374 447.009C298.157 447.009 288.962 438.805 288.962 427.526C288.962 416.246 298.157 408.042 308.374 408.042ZM608.744 289.093C598.527 289.093 589.332 280.89 589.332 269.61C589.332 259.356 597.505 250.127 608.744 250.127C618.96 250.127 628.155 258.331 628.155 269.61C628.155 279.865 618.96 289.093 608.744 289.093ZM608.744 210.136C576.05 210.136 549.487 236.797 549.487 269.61C549.487 275.763 550.509 281.916 552.552 288.068L357.414 392.661C346.176 376.254 327.786 367.026 308.374 367.026C285.897 367.026 265.464 380.356 255.247 399.839L79.521 307.551C61.131 297.297 46.8277 267.56 48.8711 238.848C49.8927 224.492 55.0011 213.212 62.1527 209.111C67.261 206.034 72.3694 207.06 79.521 210.136C126.518 234.746 279.767 315.754 285.897 318.831C296.114 322.932 301.222 324.983 318.591 316.78L633.263 152.712C638.372 150.661 643.48 146.56 643.48 139.382C643.48 130.153 634.285 126.051 634.285 126.051C615.895 117.848 588.31 104.517 561.747 92.2123C504.534 65.5513 439.147 34.7886 410.541 19.4073C386.021 6.07681 365.587 17.3565 362.522 19.4073C232.771 85.0343 53.9794 173.221 43.7627 179.373C26.3944 189.627 15.1561 211.161 14.1345 237.822C12.0911 279.865 33.5461 323.958 64.196 339.339L250.139 435.729C254.226 464.441 279.767 487 308.374 487C341.067 487 366.609 461.364 367.631 428.551L571.964 317.805C582.18 326.009 595.462 330.11 608.744 330.11C641.437 330.11 668 303.449 668 270.636C668 236.797 641.437 210.136 608.744 210.136Z'
          });
        if (link == 'docs')
          return ({
            viewBox: '0 0 384 512',
            path: 'M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM281.5 240h23.37c7.717 0 13.43 7.18 11.69 14.7l-42.46 184C272.9 444.1 268 448 262.5 448h-29.26c-5.426 0-10.18-3.641-11.59-8.883L192 329.1l-29.61 109.1C160.1 444.4 156.2 448 150.8 448H121.5c-5.588 0-10.44-3.859-11.69-9.305l-42.46-184C65.66 247.2 71.37 240 79.08 240h23.37c5.588 0 10.44 3.859 11.69 9.301L137.8 352L165.6 248.9C167 243.6 171.8 240 177.2 240h29.61c5.426 0 10.18 3.641 11.59 8.883L246.2 352l23.7-102.7C271.1 243.9 275.1 240 281.5 240zM256 0v128h128L256 0z'
          });
        if (link == 'discord')
          return ({
            viewBox: '0 0 640 512',
            path: 'M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z'
          });
        if (link == 'explorer')
          return ({
            viewBox: '0 0 448 512',
            path: 'M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM128 224C110.3 224 96 238.3 96 256V352C96 369.7 110.3 384 128 384C145.7 384 160 369.7 160 352V256C160 238.3 145.7 224 128 224zM192 352C192 369.7 206.3 384 224 384C241.7 384 256 369.7 256 352V160C256 142.3 241.7 128 224 128C206.3 128 192 142.3 192 160V352zM320 288C302.3 288 288 302.3 288 320V352C288 369.7 302.3 384 320 384C337.7 384 352 369.7 352 352V320C352 302.3 337.7 288 320 288z'
          });
  
        return ({
          viewBox: '0 0 512 512',
          path: 'M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z'
        });
      },
      // projects,
      projects: [
        {
          _id: '12341234343',
          name: 'UMEE',
          image: '/res/images/umee.png',
          apr: 0.4423,
          market_price: 1.12,
          stake_url: 'https://usersmagic.com',
          how_to_stake_url: 'https://www.youtube.com/embed/7R53mFdIeA0',
          is_stakable: true
        },
        {
          _id: '798471579848',
          name: 'NYM',
          image: '/res/images/nym.png',
          apr: 0.3466,
          market_price: 0.89,
          stake_url: 'https://usersmagic.com',
          how_to_stake_url: 'https://www.youtube.com/embed/7R53mFdIeA0',
          is_stakable: true
        }
      ],
      team: [
        {
          name: 'Mustafa Aksöz',
          position: 'Co-Founder & Product Manager',
          image: '/res/images/team/mustafa.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/mustafa-aksoz/',
            twitter: 'https://twitter.com/mechul_eth',
            medium: 'https://mechul-eth.medium.com/',
            instagram: 'https://instagram.com/mechul.eth',
            telegram: 'https://t.me/mechul_eth',
            github: 'https://github.com/MechuLm'
          },
          information: [
            'Known as @mechul_eth in the blockchain ecosystem',
            'Validator and community builder in multiple projects for 2+ years',
            'Hosted several blockchain events in Turkey',
            'Fluent in English'
          ]
        },
        {
          name: 'Yunus Gürlek',
          position: 'Co-Founder & Head of Programming',
          image: '/res/images/team/yunus.jpeg',
          links: {
            github: 'https://github.com/yunus433',
            linkedin: 'https://www.linkedin.com/in/yunus-g%C3%BCrlek-625b931a1/',
            telegram: 'https://t.me/usersmagic'
          },
          information: [
            'Full-stack JS developer, experienced in Rust and TypeScript',
            'C/C++ programmer, ranked 5th place in Turkey CS Olympics 2019',
            'Sorbonne University - Physics',
            'Fluent in English and French'
          ]
        },
        {
          name: 'Yasin Berk Yeşilyurt',
          position: 'Community Manager',
          image: '/res/images/team/yasin.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/yasin-berk-y-105a30108/',
            twitter: 'https://twitter.com/dinaturalist',
            instagram: 'https://www.instagram.com/yasinberkyesilyurt/',
            telegram: 'https://t.me/yasin_berk'
          },
          information: [
            'Mina - Developer Growth Manager',
            'Experienced in Developer Relationship',
            'Community and event manager in various projects',
            'LMU - Economics and business',
            'Fluent in German and English'
          ]
        },
        {
          name: 'Aleyna Özyurt',
          position: 'Head of Design',
          image: '/res/images/team/aleyna.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/aleyna-%C3%B6zyurt-688772163/',
            twitter: 'https://twitter.com/holapersephone',
            medium: 'https://medium.com/@persephonee',
            instagram: 'https://www.instagram.com/alenaozyrt/',
            telegram: 'https://t.me/laleyna',
          },
          information: [
            'Professional artistic graphic designer',
            'Expert in brand book creation, experienced UI, UX and content designer',
            '+5 years of experience in design',
            'Newbie in the blockchain ecosystem'
          ]
        },
        {
          name: 'Mete Koray Gergin',
          position: 'Head of Organisation',
          image: '/res/images/team/mete.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/metekoraygergin/',
            twitter: 'https://twitter.com/thetrojan_eth',
            medium: 'https://medium.com/@mtgergin',
            instagram: 'https://www.instagram.com/mtgergin/',
            telegram: 'https://t.me/mtgergin'
          },
          information: [
            '+4 years of experience in business and various sectors',
            'Funded by Dutch and Canadian Governments on his NGO projects.',
            'Boğazici University - Business Administration',
            'Fluent in English, intermediate in French'
          ]
        },
        {
          name: 'Akın Semih Pur',
          position: 'Marketing Manager & Content Creator',
          image: '/res/images/team/akın.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/akinsemihpur/',
            twitter: 'https://twitter.com/Akins_eth',
            medium: 'https://medium.com/@akinsemihpur',
            github: 'https://github.com/kinapsur',
            instagram: 'https://www.instagram.com/akinspur/',
            github: 'https://t.me/Akins0k'
          },
          information: [
            'Early Adopter in the NFT ecosystem​',
            'Co-founder of the "Turkish NFT Community"',
            'Boğazici University - Business Administration​',
            'Harvard College Asia Program Social Chair Leader',
            'Fluent in English'
          ]
        },
        {
          name: 'Deniz Baş',
          position: 'Blockchain Developer & Head of Security',
          image: '/res/images/team/deniz.jpeg',
          links: {
            github: 'https://github.com/0x471',
            linkedin: 'https://www.linkedin.com/in/deniz-ba%C5%9F-a555241b6/',
            twitter: 'https://twitter.com/d0x471b',
            telegram: 'https://t.me/d0x471b'
          },
          information: [
            'Certified Cybersecurity Specialist',
            'Backend Developer - Primarly on Rust & Go',
            'BJK-Kabataş Foundation Schools IB Programme',
            'Fluent in English, intermediate in German'
          ]
        },
        {
          name: 'Emir Erben',
          position: 'Content Creator',
          image: '/res/images/team/emir.jpeg',
          links: {
  
          },
          information: [
            '3+ years of content creation experience',
            'University of Michigan - Computer Science & Engineering',
            'Business Minor in Ross School of Business',
            'Fluent in English, Spanish, and Portuguese'
          ]
        },
        {
          name: 'Ali Yiğit Uzun',
          position: 'JS Developer',
          image: '/res/images/team/yigit.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/ali-yi%C4%9Fit-uzun-aa2595223/',
            github: 'https://github.com/CodingSodaGuy',
            twitter: 'https://twitter.com/yiitwithsoda',
            instagram: 'https://www.instagram.com/yigit.uzun1/',
            telegram: 'https://t.me/Yeettus'
          },
          information: [
            'Full-Stack JS software developer',
            'New in coding, eager to learn and use his talent',
            'Uskudar American Academy',
            'Fluent in English, intermediate in Germen'
          ]
        },
        {
          name: 'Errol Drummond',
          position: 'Advisor',
          image: '/res/images/team/errol.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/errol-drummond-354b8885/',
            twitter: 'https://twitter.com/EDGDrummond',
            github: 'https://github.com/EDGDrummond',
            instagram: 'https://www.instagram.com/drummond.errol/',
            telegram: 'https://t.me/ErrolDrummond'
          },
          information: [
            'Cryptograph and a Zero-Knowledge Guru',
            'Works in Ethereum Foundation',
            'Studied Mathematics, Philosophy, Biochemistry, and Education',
            'Native in English, intermediate in Turkish'
          ]
        },
        {
          name: 'Damir Shamanaev',
          position: 'Advisor',
          image: '/res/images/team/damir.jpeg',
          links: {
            linkedin: 'https://www.linkedin.com/in/damir-shamanaev-151888101/',
            github: 'https://github.com/damirka',
            twitter: 'https://twitter.com/themoveguy',
            telegram: 'https://t.me/damndam'
          },
          information: [
            'The "Move Guy"',
            'Master in Move Language, writer of the Move Book',
            'Works in MystenLabs as a senior developer',
            '+8 years of experience in different techs'
          ]
        },
        {
          name: 'Anthony Diprinzio',
          position: 'Advisor',
          image: '/res/images/team/anthony.jpeg',
          links: {

          },
          information: [
            'Head of Groth at Aleo',
            'Worked in Aleo for more than 2 years',
            'Co-President of Berkeley Blockchain',
            'Native in English'
          ]
        }
      ]
    });
  });
}

var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'MEME GENERATOR',
        he: 'מחולל ממים'
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'memes': {
        en: 'Memes',
        he: 'ממים'
    },
    'about': {
        en: 'About',
        he: 'עלינו'
    },
    'search': {
        en: 'Search',
        he: 'חיפוש'
    },
    'share-page': {
        en: 'share page',
        he: 'שתף עמוד'
    },
    'text-placeholder': {
        en: 'Your Text:',
        he: 'הטקסט שלך:'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    },
    'download': {
        en: 'Download',
        he: 'הורד'
    },
    'share': {
        en: 'Share',
        he: 'שתף'
    },
    'upload': {
        en: 'Upload Img',
        he: 'העלה תמונה'
    },
    'more': {
        en: 'more',
        he: 'עוד'
    },
    'subject': {
        en: 'Subject',
        he: 'נושא'
    },
    'body': {
        en: 'Message Body',
        he: 'גוף ההודעה'
    },
    'close': {
        en: 'Close',
        he: 'סגור '
    },
    'submit': {
        en: 'Submit',
        he: 'שלח '
    },
    'meme': {
        en: 'We are MEME GENERETOR',
        he: 'הגעתם למחולל הממים '
    },
    'email-data1': {
        en: 'Insert your own idea for meme and share it with your friends!',
        he: 'תכניס את הממ שלך ותשתף עם חברים   '
    },
    'email-data2': {
        en: 'Are you satisfied from website? Tell us by email:',
        he: '  האם אתה מרוצה מהאתר? תספר תספר לנו על זה במייל!'
    }

}

function getTrans(transKey) {
    let translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    let els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        let transKey = el.dataset.trans
        const trans = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}


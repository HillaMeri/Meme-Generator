var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'BOOKS SHOP',
        he: 'חנות ספרים'
    },
    'add-name-placeholder': {
        en: 'Book Name:',
        he: 'שם הספר:'
    },
    'add-price-placeholder': {
        en: 'Book Price:',
        he: 'מחיר הספר:'
    },
    add: {
        en: 'Add New Book',
        he: 'הוסף ספר'
    },
    name: {
        en: 'NAME',
        he: 'שם'
    },
    price: {
        en: 'PRICE💰',
        he: '💰מחיר'
    },
    rating: {
        en: 'RATING❤',
        he: '❤דירוג'
    },
    'del-btn': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'update-btn': {
        en: 'Update',
        he: 'עידכון'
    },
    'read-btn': {
        en: 'Read',
        he: 'קריאה'
    },
    'update-price': {
        en: 'Update Price',
        he: 'עידכון מחיר'
    },
    'save-rate': {
        en: 'Save Rating',
        he: 'שמור דירוג'
    },
    'rate-book': {
        en: 'Rate The Book:',
        he: 'דרג את הספר:'
    },
    'new-price': {
        en: 'New Price:',
        he: 'מחיר חדש:'
    }
}


function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var trans = getTrans(transKey)
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

function formatNumOlder(num) {
    return num.toLocaleString(gCurrLang);
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}


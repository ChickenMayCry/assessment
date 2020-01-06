'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
  * 指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);

    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    };

const header = document.createElement('h3');
header.innerText = '診断結果';
resultDivided.appendChild(header);

const paragraph = document.createElement('p');
const result = assessment(userName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);

const anchor = document.createElement('a');
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
+ encodeURIComponent('お薦めのボードゲーム')
+ '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #あなたにお薦めのボードゲーム';

tweetDivided.appendChild(anchor);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);
}



const answers = [
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。',
    '{userName}にお薦めのボードゲームは「」です。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} username　ユーザー名
 * @return {string} 診断結果
 */

function assessment(username){
    //全文字のコード番号を所得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < username.length; i++){
        sumOfCharCode = sumOfCharCode + username.charCodeAt(i);
    };

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, username);
    return result;
};

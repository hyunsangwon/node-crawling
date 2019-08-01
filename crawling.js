const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async() => {
    try{
        return await axios.get("https://sports.news.naver.com/wbaseball/index.nhn");
    }catch(error){
        console.error(error);
    }
}

getHtml()
    .then(html => {
        let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.home_news ul.home_news_list").children("li");

    $bodyList.each(function(index, elem) {
      ulList[index] = {
          title: $(this).find('a').attr('title')
      };
    });

    const data = ulList.filter(index => index.title);
    return data;
    
}).then(res=>log(res));
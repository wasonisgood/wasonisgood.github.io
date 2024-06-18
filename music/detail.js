const vendors = [
    { name: "東元", pro: "家電產品", feature: "高效能、耐用性和節能" },
    { name: "屋外關東煮", pro: "關東煮", feature: "新鮮、健康並且適合戶外活動的特色" },
    { name: "大同智能", pro: "智能家電", feature: "智能控制和節能的特色" },
    { name: "墊腳石", pro: "文具用品", feature: "創意設計和高品質" },
    { name: "由申甲", pro: "工具用品", feature: "高耐用性和高性能" },
    { name: "麻子辣", pro: "麻辣火鍋", feature: "獨特風味" },
    { name: "POYA寶雅", pro: "美妝保養品", feature: "平價和多樣性" },
    { name: "島津和牛咖哩", pro: "和牛咖哩", feature: "高品質和濃郁風味" },
    { name: "墨竹亭", pro: "日式料理", feature: "新鮮食材和精緻烹飪" },
    { name: "良杯製所", pro: "手作飲品", feature: "天然食材和健康風味" },
    { name: "樂扣環保杯", pro: "環保杯", feature: "可重複使用和環保材質" },
    { name: "羅技Logi 網路旗艦店", pro: "電腦周邊產品", feature: "高品質和創新設計" },
    { name: "Escapeholics密室逃脫", pro: "密室逃脫遊戲", feature: "多樣主題和智力挑戰" }
];

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const vendorIndex = params.get('vendor');
    if (vendorIndex !== null) {
        displayLetter(vendorIndex);
    }
});

function displayLetter(index) {
    const vendor = vendors[index];
    const letterContent = document.getElementById('letter-content');
    const letterText = document.getElementById('letter-text');

    const letterTemplate = `
    <p>${vendor.name} 您好：</p>
    <p>我們是國立清華大學特教x理雙x原科院學士班x不分系聯合迎新宿營的籌備團隊。</p>
    <p>每年九月都會有一群懵懵懂懂的新生進入大學，然而，大學的規模以及大學生活的精彩程度絕對是高中無法比擬的。為了幫助大一的學弟妹儘早融入特教系、理學院學士班與原科院學士班、不分系四系的大家庭，我們決定舉辦迎新宿營，期望每一位剛踏入清大校園的新生們都能好好享受大學帶來的樂趣。</p>
    <p>然而，迎新宿營的規模相當龐大，四個系的新生加上學長姐將近一百多人，所需的經費相當可觀。這個迎新宿營的活動是學生們自主舉辦，沒有得到校方贊助，而學弟妹剛上大學，我們也不希望造成他們太大的負擔。因此，您的每一筆贊助都將成為支持我們營隊的重要力量。當然，我們也會盡最大的能力來幫您達到最大的宣傳效益，讓清華大學的學生們認識台灣的優良商家!</p>
    <p>迎新宿營由特教系、理學院學士班、原科院學士班及不分系所主辦，活動時間是2024年9月20日的晚上至2024年9月22日的下午，地點為清華大學光復校區。</p>
    <p>貴公司市售的${vendor.pro}，其${vendor.feature}非常受到大學生的喜愛，因此我們期待能透過互惠合作的方式達到雙贏的局面，若能與貴公司合作將是我們的榮幸！</p>
    <p>贊助方式分為商品贊助及現金贊助：</p>

    <h3>商品贊助方案：</h3>
    <table border="1">
        <tr>
            <th>方案</th>
            <th>項目</th>
            <th>金額</th>
        </tr>
        <tr>
            <td>A</td>
            <td>在宿營營手冊上放上店名<br>（營手冊為電子檔，營期時常用到）</td>
            <td>商品市價達新臺幣500元</td>
        </tr>
        <tr>
            <td>B</td>
            <td>FB粉絲專頁按讚</td>
            <td>商品市價達新臺幣500元</td>
        </tr>
        <tr>
            <td>C</td>
            <td>Google 5星評論</td>
            <td>商品市價達新臺幣500元</td>
        </tr>
        <tr>
            <td>D</td>
            <td>宿營Instagram粉絲專頁宣傳（照片與短文介紹）</td>
            <td>商品市價達新臺幣1000元</td>
        </tr>
        <tr>
            <td>E</td>
            <td>代發宣傳物品（校園人潮聚集處、營期時）</td>
            <td>商品市價達新臺幣3500元</td>
        </tr>
        <tr>
            <td>F</td>
            <td>掛布條（地點為活動場地）</td>
            <td>商品市價達新臺幣5500元</td>
        </tr>
        <tr>
            <td>G</td>
            <td>廣告立版（活動場地與校園人潮聚集處）</td>
            <td>商品市價達新臺幣8500元</td>
        </tr>
        <tr>
            <td>H</td>
            <td>營服LOGO宣傳</td>
            <td>商品市價達新臺幣30000元</td>
        </tr>
        <tr>
            <td>I</td>
            <td>其他</td>
            <td>另議</td>
        </tr>
    </table>

    <h3>現金贊助方案：</h3>
    <table border="1">
        <tr>
            <th>方案</th>
            <th>項目</th>
            <th>金額</th>
        </tr>
        <tr>
            <td>甲</td>
            <td>在宿營營手冊上放上店名<br>（營手冊為電子檔，營期時常用到）</td>
            <td>新臺幣500元</td>
        </tr>
        <tr>
            <td>乙</td>
            <td>FB粉絲專頁按讚</td>
            <td>新臺幣500元</td>
        </tr>
        <tr>
            <td>丙</td>
            <td>Google 5星評論</td>
            <td>新臺幣500元</td>
        </tr>
        <tr>
            <td>丁</td>
            <td>宿營Instagram粉絲專頁宣傳（照片與短文介紹）</td>
            <td>新臺幣1000元</td>
        </tr>
        <tr>
            <td>戊</td>
            <td>代發宣傳物品（校園人潮聚集處、營期時）</td>
            <td>新臺幣3000元</td>
        </tr>
        <tr>
            <td>己</td>
            <td>掛布條（地點為活動場地）</td>
            <td>新臺幣5000元</td>
        </tr>
        <tr>
            <td>庚</td>
            <td>廣告立版（活動場地與校園人潮聚集處）</td>
            <td>新臺幣8000元</td>
        </tr>
        <tr>
            <td>辛</td>
            <td>營服LOGO宣傳</td>
            <td>新臺幣25000元</td>
        </tr>
        <tr>
            <td>壬</td>
            <td>其他</td>
            <td>另議</td>
        </tr>
    </table>

    <p>*商品贊助及現金贊助可以疊加<br>
    由於迎新宿營籌備需要龐大的現金，因此我們十分需要現金贊助，謝謝您！</p>

    <p>十分感謝貴公司撥冗時間閱讀此信，非常期待與貴公司的合作，倘若您有意願與我們合作，請回覆此信，並說明想要合作的方案或是贊助金額，若有任何問題也歡迎與我們聯絡，進行更深入的討論。</p>

    <p>謝謝您<br>
    聯絡方式：<br>
    宿營公關組負責人：彭威翔<br>
    連絡電話：0902275997<br>
    連絡方式 LineID：wasonispeng</p>

    <p>敬祝   生意興隆</p>

    <p>國立清華大學特教x理雙x原科x不分系聯合迎新宿營籌備團隊<br>
    二零二四年 六 月十七日</p>
    `;

    letterText.innerHTML = letterTemplate;
}

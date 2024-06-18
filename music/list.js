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
    const vendorList = document.getElementById('vendor-list');

    vendors.forEach((vendor, index) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const proCell = document.createElement('td');
        const featureCell = document.createElement('td');
        const link = document.createElement('a');

        link.href = `detail.html?vendor=${index}`;
        link.textContent = vendor.name;

        nameCell.appendChild(link);
        proCell.textContent = vendor.pro;
        featureCell.textContent = vendor.feature;

        row.appendChild(nameCell);
        row.appendChild(proCell);
        row.appendChild(featureCell);

        vendorList.appendChild(row);
    });
});

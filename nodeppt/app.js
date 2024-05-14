// 獲取問題數據
const questionsData =[
    {
        "question": "您收集個人數據的目的是什麼？",
        "options": [
            "提供服務或商品",
            "進行市場營銷活動",
            "遵守法律義務",
            "其他（請具體說明）"
        ],
        "correct_answers": [0, 2],
        "warning": "未明確說明數據收集目的可能違反GDPR第6條的合法性原則。",
        "gdpr_article": "GDPR 第6條要求數據處理活動必須有明確的合法基礎，例如合同履行、法定義務、或數據主體的明確同意等。",
        "improvement_action": "確保所有數據收集活動都有明確的目的，並且這些目的符合GDPR規定的合法基礎。"
    },
    {
        "question": "您的產品收集哪些類型的個人數據？",
        "options": [
            "姓名和聯絡資料",
            "財務信息",
            "健康信息",
            "其他敏感數據"
        ],
        "correct_answers": [0, 1, 2],
        "warning": "收集不必要的個人數據或敏感數據未獲得適當同意可能違反GDPR的數據最小化原則。",
        "gdpr_article": "GDPR 第9條及第10條特別要求對敏感個人數據（如健康、種族、性取向資訊等）進行加強保譤，並且僅在有嚴格法律依據時才允許處理。",
        "improvement_action": "檢視現有數據收集類型，移除任何非必要或未獲授權的敏感數據類型，確保所有數據收集均符合GDPR規範。"
    },
    {
        "question": "您如何獲得數據主體的同意？",
        "options": [
            "通過網站上的勾選框",
            "通過客戶互動時的口頭同意",
            "通過書面同意表格",
            "我們不收集同意"
        ],
        "correct_answers": [0, 2],
        "warning": "未能有效獲得數據主體的明確同意可能違反GDPR的合法處理原則。",
        "gdpr_article": "GDPR 第7條強調同意必須是自由給予、具體、明確且知情的。此外，數據主體應有權隨時撤回其同意。",
        "improvement_action": "確保所有同意獲取方式都是清晰、明確的，並提供簡單的方式讓數據主體撤回同意。"
    },
    {
        "question": "您是否確保只收集實現特定目的所必需的最少數據？",
        "options": [
            "是，我們嚴格限制數據收集",
            "否，我們盡可能多收集數據",
            "不確定"
        ],
        "correct_answers": [0],
        "warning": "不遵守數據最小化原則可能違反GDPR的要求。",
        "gdpr_article": "GDPR 第5條強調數據處理應當恰當、相關且限於必需的範圍。",
        "improvement_action": "重新評估數據收集策略，確保只收集實現處理目的所必需的數據。"
    },
    {
        "question": "數據主體是否可以要求訪問和轉移他們的個人數據？",
        "options": [
            "是，他們隨時可以請求",
            "否，我們不允許訪問或轉移",
            "不確定如何處理這些請求"
        ],
        "correct_answers": [0],
        "warning": "未允許數據主體訪問和轉移個人數據可能違反GDPR的規定。",
        "gdpr_article": "GDPR 第15條及第20條賦予數據主體訪問及數據可攜的權利。",
        "improvement_action": "建立或改進內部流程，以支持數據主體的訪問和數據轉移請求。"
    },
    {
        "question": "數據主體是否有權更正或擦除他們的個人數據？",
        "options": [
            "是，應請求提供",
            "否，我們保留數據原樣",
            "數據從不不正確或非必需的"
        ],
        "correct_answers": [0],
        "warning": "未允許數據主體更正或擦除個人數據可能違反GDPR第16條和第17條的規定。",
        "gdpr_article": "GDPR 第16條和第17條賦予數據主體更正和擦除個人數據的權利。",
        "improvement_action": "建立或改進內部流程，以支持數據主體的更正和擦除請求。"
    },
    {
        "question": "您實施了哪些措施以確保個人數據的安全？",
        "options": [
            "加密存儲和傳輸",
            "定期安全審計",
            "限制訪問控制",
            "沒有特定措施"
        ],
        "correct_answers": [0, 1, 2],
        "warning": "未實施足夠的數據安全措施可能違反GDPR第32條的要求。",
        "gdpr_article": "GDPR 第32條要求採取適當的技術和組織措施來保護個人數據。",
        "improvement_action": "評估並實施額外的安全措施，如數據加密、定期安全審計和訪問控制，以確保數據的完整性和保密性。"
    },
    {
        "question": "您是否有程序用於在數據泄露發生時通知監管機構和數據主體？",
        "options": [
            "是，72小時內",
            "否，我們沒有通知程序",
            "不確定要求"
        ],
        "correct_answers": [0],
        "warning": "未能遵循數據泄露通報程序可能違反GDPR第33條和第34條的規定。",
        "gdpr_article": "GDPR 第33條和第34條要求在數據泄露發生時及時通報監管機構和受影響的數據主體。",
        "improvement_action": "建立或改進數據泄露響應和通報程序，確保在法定時間內完成通報。"
    },
    {
        "question": "您是否進行國際數據傳輸？",
        "options": [
            "是，並且有適當的保護措施（例如標準合約條款、適足性決定）",
            "是，但沒有具體的保護措施",
            "沒有國際傳輸"
        ],
        "correct_answers": [0],
        "warning": "未適當管理國際數據傳輸可能違反GDPR第44條至第50條的要求。",
        "gdpr_article": "GDPR 第44條至第50條規定了國際傳輸的條件和要求，以確保數據傳輸過程中的數據保護。",
        "improvement_action": "評估現有的國際數據傳輸機制，確保所有傳輸均符合GDPR的規範，並實施適當的數據保護措施。"
    },
    {
        "question": "您是否保留處理活動的記錄？",
        "options": [
            "是，保留詳細記錄",
            "否，我們不保留這類記錄",
            "不確定應保留哪些記錄"
        ],
        "correct_answers": [0],
        "warning": "未保留處理活動的記錄可能違反GDPR第30條的要求。",
        "gdpr_article": "GDPR 第30條要求控制者和處理者保持其處理活動的記錄。",
        "improvement_action": "建立記錄保存機制，確保所有處理活動均有詳細記錄，並定期審查和更新記錄。"
    },
    {
        "question": "在數據處理中，您如何處理跨境數據流的合法性？",
        "options": [
            "確保數據傳輸符合適足性決定",
            "使用已獲批准的標準合約條款",
            "依賴企業內部規則",
            "未特別處理跨境數據流"
        ],
        "correct_answers": [0, 1, 2],
        "warning": "未正確管理跨境數據流可能導致違反GDPR第44條至第49條的規定。",
        "gdpr_article": "GDPR 第44至49條詳細規範了跨境數據傳輸的法律基礎和機制，包括適足性決定、標準合約條款及企業內部規則等。",
        "improvement_action": "評估並強化跨境數據流的合法措施，確保所有國際數據傳輸均符合GDPR規定的傳輸機制。"
    },
    {
        "question": "您如何確保數據保護影響評估（DPIA）的實施及其時效性？",
        "options": [
            "只在新系統上市時進行DPIA",
            "進行定期的DPIA更新",
            "根據GDPR要求和相關指導進行DPIA",
            "沒有實施DPIA"
        ],
        "correct_answers": [1, 2],
        "warning": "未進行或未定期更新DPIA可能違反GDPR第35條的要求。",
        "gdpr_article": "GDPR 第35條要求在可能對數據主體的權利和自由造成高風險時進行DPIA，並且需要定期更新以確保持續的數據保護。",
        "improvement_action": "建立定期DPIA更新的流程，並確保每次變更或新技術實施前進行DPIA。"
    },
    {
        "question": "您如何處理數據主體的異議權（包括對自動決策的異議）？",
        "options": [
            "提供明確的異議申請管道",
            "自動決策過程中包含人工審查的選項",
            "未提供異議處理機制",
            "不確定如何處理"
        ],
        "correct_answers": [0, 1],
        "warning": "未處理數據主體異議權可能違反GDPR第21條和第22條的規定。",
        "gdpr_article": "GDPR 第21條和第22條賦予數據主體對於基於自動處理的決策提出異議的權利，包括剖析和預測。",
        "improvement_action": "設立有效的異議申請管道和機制，特別是在進行自動化決策和剖析時，保障數據主體的權利得到實質性的尊重和執行。"
    },
    {
        "question": "您如何確保僱員在處理個人數據時的合法性和安全性？",
        "options": [
            "定期培訓和意識提升活動",
            "實施數據訪問和處理的嚴格控制措施",
            "員工行為不在合法檢查範圍內",
            "沒有特定策略"
        ],
        "correct_answers": [0, 1],
        "warning": "未能確保僱員在處理個人數據時的合法性可能違反GDPR第32條的規定。",
        "gdpr_article": "GDPR 第32條要求採取適當的技術和組織措施來保證數據處理的安全性，包括保護個人數據不被未經授權或非法處理。",
        "improvement_action": "增強員工對GDPR合法性的認識和培訓，實施有效的訪問控制和數據處理政策，確保所有員工都能遵守這些政策。"
    }
];

const questionnaire = document.getElementById('questionnaire');
const reportContainer = document.getElementById('report-container');
const pagination = document.getElementById('pagination');

const questionsPerPage = 5; // 每頁顯示的問題數量
let currentPage = 1;
let totalPages = Math.ceil(questionsData.length / questionsPerPage);

// 初始化全局的答案數組
const userAnswers = Array(questionsData.length).fill(null).map(() => []);

// 更新答案數組
function updateAnswers() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const questionIndex = parseInt(checkbox.dataset.questionIndex);
    if (checkbox.checked) {
      if (!userAnswers[questionIndex].includes(parseInt(checkbox.value))) {
        userAnswers[questionIndex].push(parseInt(checkbox.value));
      }
    } else {
      const idx = userAnswers[questionIndex].indexOf(parseInt(checkbox.value));
      if (idx !== -1) {
        userAnswers[questionIndex].splice(idx, 1);
      }
    }
  });
}

// 渲染問題卡片
function renderQuestions() {
  questionnaire.innerHTML = '';
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const pagedQuestions = questionsData.slice(startIndex, endIndex);

  pagedQuestions.forEach((question, index) => {
    const questionIndex = index + startIndex;
    const card = document.createElement('div');
    card.classList.add('question-card');

    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.textContent = `${questionIndex + 1}. ${question.question}`;

    const optionsContainer = document.createElement('div');
    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'checkbox';
      optionInput.value = optionIndex;
      optionInput.dataset.questionIndex = questionIndex;
      optionInput.checked = userAnswers[questionIndex].includes(optionIndex);
      optionInput.addEventListener('change', updateAnswers);
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(optionLabel);
    });

    card.appendChild(questionText);
    card.appendChild(optionsContainer);
    questionnaire.appendChild(card);
  });

  updatePagination();
}

// 更新分頁信息和按鈕
function updatePagination() {
    pagination.innerHTML = '';
    const pageInfo = document.getElementById('progress-bar');
    const percent = ((currentPage - 1) / (totalPages - 1)) * 100;
    pageInfo.style.width = percent + '%';
    pageInfo.textContent = `第 ${currentPage} 頁 / 共 ${totalPages} 頁`;
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement('span');
      pageNumber.textContent = i;
      if (i === currentPage) {
        pageNumber.classList.add('current');
      } else {
        pageNumber.classList.add('faded');
      }
    }


    const prevBtn = document.createElement('button');
    prevBtn.textContent = '上一頁';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', prevPage);
    pagination.appendChild(prevBtn);

    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = '下一頁';
      nextBtn.addEventListener('click', nextPage);
      pagination.appendChild(nextBtn);
    } else {
      const reportBtn = document.createElement('button');
      reportBtn.textContent = '生成報告';
      reportBtn.addEventListener('click', generateReport);
      pagination.appendChild(reportBtn);
    }
}


// 上一頁
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderQuestions();
  }
}

// 下一頁
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderQuestions();
  }
}


// 生成報告
function generateReport() {
    // 清空問卷和報告容器
    questionnaire.innerHTML = '';
    reportContainer.innerHTML = '';
  
    // 添加報告標題
    const reportTitle = document.createElement('h1');
    reportTitle.textContent = 'GDPR 合法性報告';
    reportContainer.appendChild(reportTitle);
  
    // 渲染所有問題和選項
    questionsData.forEach((question, index) => {
      const card = document.createElement('div');
      card.classList.add('question-card');
  
      const questionText = document.createElement('p');
      questionText.classList.add('question-text');
      questionText.textContent = `${index + 1}. ${question.question}`;
  
      const optionsContainer = document.createElement('div');
      question.options.forEach((option, optionIndex) => {
        const optionLabel = document.createElement('label');
        const optionInput = document.createElement('input');
        optionInput.type = 'checkbox';
        optionInput.value = optionIndex;
        optionInput.dataset.questionIndex = index;
        optionInput.checked = userAnswers[index]?.includes(optionIndex);
        optionInput.disabled = true;
        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(optionLabel);
      });
  
      card.appendChild(questionText);
      card.appendChild(optionsContainer);
  
      const userAnswer = userAnswers[index] || [];
      const isCorrect = question.correct_answers.every(answer => userAnswer.includes(answer)) &&
        userAnswer.every(answer => question.correct_answers.includes(answer));
  
      if (!isCorrect) {
        card.classList.add('incorrect'); // 添加錯誤樣式
  
        const reportText = document.createElement('p');
        reportText.textContent = `${index + 1}. ${question.warning}`;
  
        const gdprInfo = document.createElement('p');
        gdprInfo.classList.add('gdpr-info');
        gdprInfo.textContent = `GDPR 相關條文: ${question.gdpr_article}`;
  
        const improvementAction = document.createElement('p');
        improvementAction.textContent = `改進建議: ${question.improvement_action}`;
  
        card.appendChild(reportText);
        card.appendChild(gdprInfo);
        card.appendChild(improvementAction);
      }
  
      reportContainer.appendChild(card);
    });
  
    // 如果所有問題都答對,顯示總體正確信息
    if (reportContainer.children.length === 0) {
      const successCard = document.createElement('div');
      successCard.classList.add('question-card');
      const successText = document.createElement('p');
      successText.textContent = '恭喜,您已正確回答所有問題,符合GDPR規範!';
      successCard.appendChild(successText);
      reportContainer.appendChild(successCard);
    }
  
    // 隱藏分頁按鈕
    pagination.style.display = 'none';
  
    // 顯示報告容器
    reportContainer.classList.remove('hidden');
        // 添加打印按钮
        const printBtn = document.createElement('button');
        printBtn.textContent = '列印報告';
        printBtn.onclick = function() {
            window.print();
        };
        reportContainer.appendChild(printBtn);
  }
  
// 初始渲染問題卡片
renderQuestions();

document.addEventListener("DOMContentLoaded", function() {
    const loadingAnimation = document.getElementById('loading-animation');
    const minDisplayTime = 0;  // 最小显示时间为2000毫秒（2秒）
    const startTime = Date.now();

    const animation = document.getElementById('ai-path');
    animation.addEventListener('animationend', function() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDisplayTime) {
            // 如果动画完成时未达到最小显示时间，延迟隐藏动画
            setTimeout(function() {
                loadingAnimation.style.display = 'none';
            }, minDisplayTime - elapsedTime);
        } else {
            // 如果动画完成时已经超过最小显示时间，立即隐藏动画
            loadingAnimation.style.display = 'none';
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const loadingAnimation = document.getElementById('loading-animation');
    const navbar = document.getElementById('navbar');
    const minDisplayTime = 2000;  // 最小显示时间为2000毫秒（2秒）
    const startTime = Date.now();

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    const animation = document.getElementById('ai-path');
    animation.addEventListener('animationend', function() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDisplayTime) {
            setTimeout(function() {
                loadingAnimation.style.display = 'none';
                navbar.classList.add('show'); // 显示导航栏
            }, minDisplayTime - elapsedTime);
        } else {
            loadingAnimation.style.display = 'none';
            navbar.classList.add('show'); // 显示导航栏
        }
    });
});
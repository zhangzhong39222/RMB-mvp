// 数据初始化
let data = JSON.parse(localStorage.getItem('ratemyboss')) || {
  companies: [],
  bosses: []
};

// 页面切换
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// 搜索公司
function searchCompany() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const filtered = data.companies.filter(c => c.name.toLowerCase().includes(keyword));
  const html = filtered.map(c => `
    <div onclick="enterCompany(${c.id})">${c.name}</div>
  `).join('') || `<button onclick="createCompany('${keyword}')">创建公司：${keyword}</button>`;
  document.getElementById('companyList').innerHTML = html;
}

// 进入公司页
function enterCompany(companyId) {
  const company = data.companies.find(c => c.id === companyId);
  document.getElementById('companyName').textContent = company.name;
  document.getElementById('bossList').innerHTML = data.bosses
    .filter(b => b.companyId === companyId)
    .map(b => `<div onclick="enterBoss(${b.id})">${b.name}</div>`)
    .join('');
  showPage('companyPage');
}

// 提交评价
function submitReview() {
  const bossId = parseInt(localStorage.getItem('currentBossId'));
  const content = document.getElementById('reviewContent').value;
  const rating = parseInt(localStorage.getItem('currentRating')) || 5;

  const boss = data.bosses.find(b => b.id === bossId);
  boss.reviews.push({ content, rating, timestamp: new Date() });
  saveData();
  enterBoss(bossId);
}

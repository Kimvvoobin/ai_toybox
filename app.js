const toolGrid = document.querySelector('#toolGrid');
const aboutButton = document.querySelector('#aboutButton');
const aboutDialog = document.querySelector('#aboutDialog');
const closeAboutButton = document.querySelector('#closeAboutButton');
let tools = [];
let openaiConfig = {};
let selectedTool = null;

const accentColors = { yellow: '#f3dc54', blue: '#b9d7ef', pink: '#f0b7c7', green: '#badb9c', orange: '#f6bd83', purple: '#d4b9e7', cyan: '#a9dedb', red: '#f0a39a' };

async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
    ({ tools, openai: openaiConfig } = await response.json());
    selectedTool = tools[0];
    renderTools();
  } catch (error) {
    toolGrid.innerHTML = '<p class="empty-state">도구 데이터를 불러오지 못했어요. 로컬 서버에서 실행해 주세요.</p>';
    console.error(error);
  }
}

function renderTools() {
  toolGrid.innerHTML = tools.map((tool, index) => `
    <button class="tool-card ${selectedTool?.id === tool.id ? 'selected' : ''}" data-tool-id="${tool.id}" style="--accent:${accentColors[tool.accent]} ; animation-delay:${index * 45}ms" type="button">
      <div><span class="tool-icon ${tool.symbol.length > 1 ? 'long' : ''}">${tool.symbol}</span><h3>${tool.name}</h3><p>${tool.description}</p></div>
      <div class="tool-card-footer"><span class="tool-meta">${tool.meta}</span><span class="launch-arrow">↗</span></div>
    </button>`).join('');
  toolGrid.querySelectorAll('.tool-card').forEach((card) => card.addEventListener('click', () => selectTool(card.dataset.toolId)));
}

function selectTool(toolId) {
  selectedTool = tools.find((tool) => tool.id === toolId);
  renderTools();
}

aboutButton.addEventListener('click', () => aboutDialog.showModal());
closeAboutButton.addEventListener('click', () => aboutDialog.close());
aboutDialog.addEventListener('click', (event) => {
  if (event.target === aboutDialog) aboutDialog.close();
});
loadData();

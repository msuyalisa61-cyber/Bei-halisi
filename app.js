/**
 * Bei Halisi - Live Crop Price Tracking Application
 * Loads data from kilimo-crop-prices-extractor repository
 */

let currentRegion = 'arusha';
let currentTimeFrame = 'weekly';
let currentCrop = 'maize';
let priceChart = null;
let marketDataLoaded = false;

// GitHub raw content URL for live data
const GITHUB_DATA_URL = 'https://raw.githubusercontent.com/msuyalisa61-cyber/kilimo-crop-prices-extractor/main/data/behalisi_data.js';
const FALLBACK_DATA_URL = './data.js'; // Fallback to local data if live data fails

/**
 * Load market data from GitHub or fallback to local
 */
async function loadMarketData() {
  try {
    console.log('Loading market data from:', GITHUB_DATA_URL);
    
    const response = await fetch(GITHUB_DATA_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const jsContent = await response.text();
    
    // Execute the JavaScript to set window.marketData, etc.
    eval(jsContent);
    
    console.log('✓ Loaded live data from GitHub');
    marketDataLoaded = true;
    
    // Initialize the app with loaded data
    initializeApp();
    
  } catch (error) {
    console.error('Error loading live data:', error);
    console.log('Falling back to local data...');
    
    try {
      // Fallback: load local data.js
      const response = await fetch(FALLBACK_DATA_URL);
      if (!response.ok) throw new Error('Fallback data also failed');
      
      const jsContent = await response.text();
      eval(jsContent);
      
      console.log('✓ Loaded fallback local data');
      marketDataLoaded = true;
      initializeApp();
      
    } catch (fallbackError) {
      console.error('Failed to load both live and local data:', fallbackError);
      displayErrorMessage('Unable to load crop price data. Please check your connection.');
    }
  }
}

/**
 * Display error message to user
 */
function displayErrorMessage(message) {
  const container = document.querySelector('main.container');
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    background-color: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
    border-left: 4px solid #dc3545;
  `;
  errorDiv.innerHTML = `<strong>⚠️ Error:</strong> ${message}`;
  container.insertBefore(errorDiv, container.firstChild);
}

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
  updateAllData();
  
  // Add refresh button
  addRefreshButton();
}

/**
 * Add a refresh data button
 */
function addRefreshButton() {
  const header = document.querySelector('.header-content');
  if (!header) return;
  
  const refreshBtn = document.createElement('button');
  refreshBtn.innerHTML = '🔄 Refresh Data';
  refreshBtn.style.cssText = `
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
  `;
  refreshBtn.onclick = () => {
    refreshBtn.innerHTML = '⏳ Loading...';
    refreshBtn.disabled = true;
    loadMarketData().then(() => {
      refreshBtn.innerHTML = '✓ Updated!';
      setTimeout(() => {
        refreshBtn.innerHTML = '🔄 Refresh Data';
        refreshBtn.disabled = false;
      }, 2000);
    });
  };
  
  header.appendChild(refreshBtn);
}

/**
 * Setup event listeners for UI controls
 */
function setupEventListeners() {
  // Region selector
  const regionSelect = document.getElementById('regionSelect');
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      currentRegion = e.target.value;
      updateAllData();
    });
  }
  
  // Crop selector
  const cropSelect = document.getElementById('cropSelect');
  if (cropSelect) {
    cropSelect.addEventListener('change', (e) => {
      currentCrop = e.target.value;
      updateChart();
      updateAdvice();
    });
  }
  
  // Timeframe toggle buttons
  const timeframeButtons = document.querySelectorAll('.toggle-btn');
  timeframeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      timeframeButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentTimeFrame = e.target.dataset.timeframe;
      updateChart();
      updateAdvice();
    });
  });
}

/**
 * Update all data displays
 */
function updateAllData() {
  if (!marketDataLoaded) return;
  
  updateMetricsCards();
  updatePriceTable();
  updateChart();
  updateAdvice();
  updateProfitableBanner();
}

/**
 * Update metrics cards (most profitable, best buy time, highest jump)
 */
function updateMetricsCards() {
  if (!window.marketData || !window.marketData[currentRegion]) {
    console.warn('No market data for region:', currentRegion);
    return;
  }
  
  const regionData = window.marketData[currentRegion];
  const crops = regionData.crops;
  
  // Find most profitable crop
  let maxProfit = 0;
  let mostProfitableCrop = 'maize';
  
  Object.entries(crops).forEach(([cropKey, data]) => {
    const profit = ((data.marketPrice - data.productionCost) / data.productionCost) * 100;
    if (profit > maxProfit) {
      maxProfit = profit;
      mostProfitableCrop = cropKey;
    }
  });
  
  // Find best buy opportunity (lowest price)
  let minPrice = Infinity;
  let bestBuyCrop = 'maize';
  
  Object.entries(crops).forEach(([cropKey, data]) => {
    if (data.marketPrice < minPrice) {
      minPrice = data.marketPrice;
      bestBuyCrop = cropKey;
    }
  });
  
  // Find highest jump
  let maxJump = 0;
  let highestJumpCrop = 'maize';
  
  Object.entries(crops).forEach(([cropKey, data]) => {
    const jump = ((data.marketPrice - data.lastWeek) / data.lastWeek) * 100;
    if (jump > maxJump) {
      maxJump = jump;
      highestJumpCrop = cropKey;
    }
  });
  
  // Update UI
  const profitableCrop = document.getElementById('profitableCrop');
  const profitableMargin = document.getElementById('profitableMargin');
  if (profitableCrop) {
    profitableCrop.textContent = window.cropLabels[mostProfitableCrop] || mostProfitableCrop;
    profitableMargin.textContent = `+${maxProfit.toFixed(0)}% Faida`;
  }
  
  const bestBuyCrop = document.getElementById('bestBuyCrop');
  const bestBuyDrop = document.getElementById('bestBuyDrop');
  if (bestBuyCrop) {
    bestBuyCrop.textContent = window.cropLabels[bestBuyCrop] || bestBuyCrop;
    const drop = ((minPrice - crops[bestBuyCrop].lastWeek) / crops[bestBuyCrop].lastWeek) * 100;
    bestBuyDrop.textContent = `${drop.toFixed(0)}% Kupimia`;
  }
  
  const highestJumpCrop2 = document.getElementById('highestJumpCrop');
  const highestJumpAmount = document.getElementById('highestJumpAmount');
  if (highestJumpCrop2) {
    highestJumpCrop2.textContent = window.cropLabels[highestJumpCrop] || highestJumpCrop;
    highestJumpAmount.textContent = `+${maxJump.toFixed(0)}% Mwezi huu`;
  }
}

/**
 * Update price table
 */
function updatePriceTable() {
  if (!window.marketData || !window.marketData[currentRegion]) return;
  
  const regionData = window.marketData[currentRegion];
  const tableBody = document.getElementById('priceTableBody');
  
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  Object.entries(regionData.crops).forEach(([cropKey, data]) => {
    const cropLabel = window.cropLabels[cropKey] || cropKey;
    const weeklyChange = ((data.marketPrice - data.lastWeek) / data.lastWeek) * 100;
    const profit = ((data.marketPrice - data.productionCost) / data.productionCost) * 100;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cropLabel}</td>
      <td>${data.marketPrice.toLocaleString('sw-TZ')} TZS</td>
      <td style="color: ${weeklyChange >= 0 ? '#28a745' : '#dc3545'}">
        ${weeklyChange >= 0 ? '📈' : '📉'} ${weeklyChange.toFixed(1)}%
      </td>
      <td style="color: ${profit >= 0 ? '#28a745' : '#dc3545'}">
        ${profit.toFixed(0)}%
      </td>
    `;
    tableBody.appendChild(row);
  });
}

/**
 * Update price trend chart
 */
function updateChart() {
  if (!window.marketData || !window.marketData[currentRegion]) return;
  
  const regionData = window.marketData[currentRegion];
  const cropData = regionData.crops[currentCrop];
  
  if (!cropData) return;
  
  const chartCanvas = document.getElementById('priceChart');
  if (!chartCanvas) return;
  
  const ctx = chartCanvas.getContext('2d');
  const timeframeData = cropData[currentTimeFrame] || cropData.weekly;
  
  // Destroy existing chart if it exists
  if (priceChart) {
    priceChart.destroy();
  }
  
  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: generateLabels(currentTimeFrame),
      datasets: [{
        label: `${window.cropLabels[currentCrop] || currentCrop} - ${window.timeFrameLabels[currentTimeFrame]}`,
        data: timeframeData,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: { font: { size: 12 } }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return value.toLocaleString('sw-TZ');
            }
          }
        }
      }
    }
  });
}

/**
 * Generate chart labels based on timeframe
 */
function generateLabels(timeframe) {
  const labels = {
    weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    monthly: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
    yearly: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
  };
  
  return labels[timeframe] || labels.weekly;
}

/**
 * Update market advice
 */
function updateAdvice() {
  if (!window.marketData || !window.marketData[currentRegion]) return;
  
  const regionData = window.marketData[currentRegion];
  const cropData = regionData.crops[currentCrop];
  
  if (!cropData) return;
  
  const timeframeData = cropData[currentTimeFrame] || cropData.weekly;
  const currentPrice = timeframeData[timeframeData.length - 1];
  const previousPrice = timeframeData[0];
  const trend = currentPrice > previousPrice ? 'up' : 'down';
  
  const sellAdvice = document.getElementById('sellAdvice');
  const holdAdvice = document.getElementById('holdAdvice');
  
  const cropName = window.cropLabels[currentCrop] || currentCrop;
  
  if (trend === 'up') {
    if (sellAdvice) {
      sellAdvice.textContent = `🟢 Bei za ${cropName} sasa ni juu sana kuliko kawaida. Hii ni wakati mzuri kuuza mavuno yako sasa!`;
    }
    if (holdAdvice) {
      holdAdvice.textContent = `🔴 Kusubiri zaidi inaweza kusababisha hasara. Bei zina kuelekea chini baada ya kufikia kilele.`;
    }
  } else {
    if (sellAdvice) {
      sellAdvice.textContent = `🔴 Bei za ${cropName} sasa ni chini. Kuuza sasa haitakupa faida nzuri.`;
    }
    if (holdAdvice) {
      holdAdvice.textContent = `🟢 Bei za ${cropName} inasadiki kuwa itaongezeka baadaye. Kamatia mavuno yako sasa na usubiri.`;
    }
  }
}

/**
 * Update profitable region banner
 */
function updateProfitableBanner() {
  if (!window.marketData || !window.marketData[currentRegion]) return;
  
  const regionData = window.marketData[currentRegion];
  
  let maxProfit = 0;
  let bestCrop = 'maize';
  
  Object.entries(regionData.crops).forEach(([cropKey, data]) => {
    const profit = ((data.marketPrice - data.productionCost) / data.productionCost) * 100;
    if (profit > maxProfit) {
      maxProfit = profit;
      bestCrop = cropKey;
    }
  });
  
  const banner = document.getElementById('profitableBanner');
  if (banner) {
    const regionName = window.regionLabels[currentRegion] || currentRegion;
    const cropName = window.cropLabels[bestCrop] || bestCrop;
    banner.innerHTML = `📍 <strong>${regionName}</strong> - Mahali pa faida nzuri ni <strong>${cropName}</strong> na ${maxProfit.toFixed(0)}% faida!`;
  }
}

/**
 * Load data when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded. Loading market data...');
  loadMarketData();
});

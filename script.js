const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

// Fetch data from the API and populate grid and list views
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    populateGridView(data);
    populateListView(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Populate the grid view with cryptocurrency data
function populateGridView(data) {
  const cryptoDataContainer = document.getElementById('cryptoDataContainer');
  cryptoDataContainer.innerHTML = '';

  data.forEach(crypto => {
    const card = createGridCard(crypto);
    cryptoDataContainer.appendChild(card);
  });
}

// Create a grid card for each cryptocurrency
function createGridCard(crypto) {
  const card = document.createElement('div');
  card.className = 'grid-card';

  const image = document.createElement('img');
  image.src = crypto.image;
  image.alt = crypto.name;
  image.className='card-img';
  card.appendChild(image);

  const name = document.createElement('h3');
  name.textContent = crypto.name;
  name.className='card-name';
  card.appendChild(name);

  const price = document.createElement('p');
  price.className='card-price';
  price.textContent = `Price: $${crypto.current_price}`;
  card.appendChild(price);

  const marketCap = document.createElement('p');
  marketCap.textContent = `Market Cap: $${crypto.market_cap}`;
  card.appendChild(marketCap);

  const priceChange = document.createElement('p');
  priceChange.className='price_change';
  priceChange.textContent = `24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%`;
  card.appendChild(priceChange);

  return card;
}

// Populate the list view with cryptocurrency data
function populateListView(data) {
  const cryptoDataTable = document.getElementById('cryptoDataTable');
  cryptoDataTable.innerHTML = '';

  const headerRow = cryptoDataTable.insertRow();
  headerRow.innerHTML = `
    <th>Image</th>
    <th>Name</th>
    <th>Price</th>
    <th>Market Cap</th>
    <th>24h Change</th>
  `;

  data.forEach(crypto => {
    const row = cryptoDataTable.insertRow();
    row.innerHTML = `
      <td><img src="${crypto.image}" alt="${crypto.name}" height="30"></td>
      <td>${crypto.name}</td>
      <td>$${crypto.current_price}</td>
      <td>$${crypto.market_cap}</td>
      <td>${crypto.price_change_percentage_24h.toFixed(2)}%</td>
    `;
  });
}

// Show the grid view and highlight the active tab
function showGridView() {
  document.getElementById('cryptoDataContainer').classList.add('grid-view');
  document.getElementById('cryptoDataTable').classList.remove('list-view');
  document.querySelector('.tab-btn.active').classList.remove('active');
  event.target.classList.add('active');
}

// Show the list view and highlight the active tab
function showListView() {
  document.getElementById('cryptoDataContainer').classList.remove('grid-view');
  document.getElementById('cryptoDataTable').classList.add('list-view');
  document.querySelector('.tab-btn.active').classList.remove('active');
  event.target.classList.add('active');
}

// Fetch data and populate the grid view on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

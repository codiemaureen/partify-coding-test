const yearSelect = document.getElementById("year");
const makeSelect = document.getElementById("make");
const modelSelect = document.getElementById("model");
const productTypeSelect = document.getElementById("productType");

let vehicleData = {};

//fetch vehicle data
fetch(`vehicleData.json`)
  .then(res => res.json())
  .then(data => {
    vehicleData = data;
    const years = Object.keys(vehicleData).sort().reverse();
    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  });

//fetch product options
fetch(`productTypes.json`)
.then(res => res.json())
.then(types => {
  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type.replace(/\s+/g, "+"); // Format for query param
    option.textContent = type;
    productTypeSelect.appendChild(option);
  });
});



yearSelect.addEventListener("change", () => {
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  const selectedYear = yearSelect.value;
  if (!selectedYear || !vehicleData[selectedYear]) return;

  const makes = Object.keys(vehicleData[selectedYear]);
  makes.forEach(make => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });
  makeSelect.disabled = false;
});

makeSelect.addEventListener("change", () => {
  modelSelect.innerHTML = '<option value="">Select Model</option>';

  const year = yearSelect.value;
  const make = makeSelect.value;
  if (!year || !make || !vehicleData[year][make]) return;

  const models = vehicleData[year][make];
  models.forEach(model => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
  modelSelect.disabled = false;
});



// Form submission to navigate to Partify URL
document.getElementById("ymmForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const year = yearSelect.value;
  const make = makeSelect.value.toLowerCase();
  const model = modelSelect.value.toLowerCase();
  const productType = document.getElementById("productType").value;

  if (!year || !make || !model) return;

  let url = `https://partifyusa.com/collections/${year}-${make}-${model}`;
  if (productType) {
    url += `?filter.p.product_type=${productType}`;
  }

  window.location.href = url;
});

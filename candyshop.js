// Base URL for the CRUD API
const apiUrl = 'https://crudcrud.com/api/d4267679260347b5b355e1199dd1aff2/candiesdata';

// Function to add a new candy
async function addCandy(name, description, price, quantity) {
  // Create an object with candy data
  const candyData = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };

  try {
    // Send a POST request to add a new candy
    await axios.post(apiUrl, candyData);
    // After successfully adding, update and display the candies
    await displayCandies();
  } catch (error) {
    // Log an error message if there's an issue
    console.error('Error adding candy:', error);
  }
}

// Function to display the list of candies
async function displayCandies() {
  try {
    // Send a GET request to fetch the list of candies
    const response = await axios.get(apiUrl);
    console.log(response.data);
    const data = response.data;
    const candyList = document.getElementById('candy-list');
    candyList.innerHTML = '';

    // Iterate through each candy and create HTML elements to display them
    data.forEach((candy) => {
      const candyItem = document.createElement('div');
      candyItem.innerHTML = `
        <div>
          <h2>${candy.name}</h2>
          <p>${candy.description}</p>
          <p>Price: ${candy.price} rs</p>
          <p>Quantity: <span id="quantity-${candy._id}">${candy.quantity}</span></p>
          <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}', '${candy.price}', 1, '${candy.quantity}')">Buy 1</button>
          <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}','${candy.price}', 2, '${candy.quantity}')">Buy 2</button>
          <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}','${candy.price}', 3, '${candy.quantity}')">Buy 3</button>
        </div>
      `;

      candyList.appendChild(candyItem);
    });
  } catch (error) {
    // Log an error message if there's an issue with the request
    console.error('Error fetching candies:', error);
  }
}

// Function to handle buying candy
async function buyCandy(id, name, description, price, quantityToBuy, currentQuantity) {
  const updatedQuantity = currentQuantity - quantityToBuy;

  if (updatedQuantity >= 0) {
    try {
      // Send a PUT request to update the candy quantity
      await axios.put(`${apiUrl}/${id}`, { quantity: updatedQuantity, name: name, description: description, price: price });
      // If successful, update the displayed quantity on the webpage
      const quantityElement = document.getElementById(`quantity-${id}`);
      if (quantityElement) {
        quantityElement.textContent = updatedQuantity;
      }
    } catch (error) {
      // Log an error message if there's an issue with the request
      console.error('Error updating candy quantity:', error);
    }
  } else {
    // Display an alert if the requested quantity exceeds the available quantity
    alert('Item not available.');
  }
}

// Initial display of candies on the webpage
displayCandies();

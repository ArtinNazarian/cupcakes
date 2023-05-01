const BASE_URL = "http://localhost:5000/api";

/*show cupcake list */

function generateCupcake(cupcake) {
  return `
    <div data-cupcake-id = ${cupcake.id}>
    <li>${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating} - <button class="delete-btn">X</button>
    </li>
    <img class = "cupcake-img" src="${cupcake.image}" alt="(no image provided)">
    </div>
    `;
}

async function showList() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);
  for (let cupcake of response.data.cupcakes) {
    let newCupcake = $(generateCupcake(cupcake));
    $("#cupcakes-list").append(newCupcake);
  }
}

$("#new-cupcake").on("submit", async function (evt) {
  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  const newCupcakeRes = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image,
  });

  let newCupcake = $(generateCupcake(newCupcakeRes.data.cupcake));
  $("cupcakes-list").append(newCupcake);
  $("new-cupcake").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-btn", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

$(showList);

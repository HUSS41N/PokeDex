// * Main api handler
function fetch_api(i) {
	const api = `https://pokeapi.co/api/v2/pokemon/${i}/`;
	const promise = fetch(api);
	return promise.then((response) => {
		return response.json();
	});
}

// * Generate pokemon cards funtion
function generate_pokemons() {
	for (let i = 1; i < 250; i++) {
		let pokemon_card = fetch_api(i);
		pokemon_card.then((data) => {
			const card = document.createElement("div");
			card.classList.add("card");
			const img = document.createElement("img");
			img.src = data.sprites.other.dream_world.front_default;
			const pokemon_name = document.createElement("p");
			pokemon_name.innerText = data.name;
			card.appendChild(img);
			card.appendChild(pokemon_name);
			const main = document.querySelector(".main");
			main.appendChild(card);
		});
	}
}

// * Dark mode
function enable_dark_mode() {
	document.body.classList.toggle("dark");
}

// * Input handler
const search = document.getElementById("search");
search.addEventListener("click", () => {
	const input = document.getElementById("input").value;
	let pokemon_details = fetch_api(input);
	pokemon_details.then((data) => {
		const search_results = document.querySelector(".search_result");
		search_results.classList.remove("none");
		const image = document.getElementById("image");
		image.src = data.sprites.other.dream_world.front_default;
		const search_results_title = document.querySelector(
			".search_result h1"
		);
		search_results_title.innerText = data.name;
		const height = document.querySelector(".height");
		height.innerHTML = `HEIGHT: ${data.height}`;
		const weight = document.querySelector(".weight");
		weight.innerHTML = `WEIGHT : ${data.weight}`;
		// * POkemon details
		const new_url = data.species.url;
		fetch(new_url)
			.then((response) => response.json())
			.then((data) => {
				const about = document.querySelector("#about");
				const order = document.querySelector(".order");

				const capture_rate = document.querySelector(".capture-rate");
				capture_rate.innerHTML = `CAPTURE RATE : ${data.capture_rate}`;
				order.innerHTML = `ORDER : ${data.order}`;
				about.innerHTML = data.flavor_text_entries[0].flavor_text;
			});
	});
});

// * Close search results
function remove() {
	const search_results = document.querySelector(".search_result");
	search_results.classList.add("none");
}

//*  Generate pokemon cards
generate_pokemons();

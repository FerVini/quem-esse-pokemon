let pokemon = null;
let modal = null;

document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal(document.getElementById("resultadoModal"));
    carregarPokemon();
});

function carregarPokemon() {
    modal.hide()
    const id = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            pokemon = data;

            document.getElementById("poke-img").src =
                data.sprites.other["official-artwork"].front_default;

            document.getElementById("poke-img").classList.add("silhueta");

            document.getElementById("input-nome").value = "";
            document.getElementById("input-tipo").value = "";
        });
}

document.getElementById("btn-enviar").addEventListener("click", () => {
    let pontos = 0;

    const nomeDigitado = document.getElementById("input-nome").value.toLowerCase();
    if (nomeDigitado === pokemon.name) pontos++;

    const tipoDigitado = document.getElementById("input-tipo").value;
    const tipos = pokemon.types.map(t => t.type.name);
    if (tipos.includes(tipoDigitado)) pontos++;

    document.getElementById("poke-img").classList.remove("silhueta");

    document.getElementById("modal-body").innerHTML = `
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" width="140">
        <h4 class="mt-3">${pokemon.name.toUpperCase()}</h4>
        <p class="mt-3">Pontuação: <strong>${pontos}/2</strong></p>
      `;

    modal.show();
});

document.getElementById("btn-novo").addEventListener("click", carregarPokemon);
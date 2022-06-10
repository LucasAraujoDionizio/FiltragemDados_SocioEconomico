var entrada = document.getElementById("arquivo");
var opcao = document.getElementById("opcao");
entrada.addEventListener("change", ler_csv);
opcao.addEventListener("change", opcao_selecionada);
var ray_respostas = [];
var ray_perguntas = [];
function opcao_selecionada() {
  var opcao_contada = contador(opcao.value);
  desenhar_grafico(Object.entries(opcao_contada), ray_perguntas[opcao.value]);
  console.log(opcao_contada);
}

function contador(indice) {
  var questao = ray_respostas.map((resposta) => {
    return resposta[indice];
  });
  var contagem = questao.reduce((valor_anterior, elemento_atual) => {
    valor_anterior[elemento_atual] = (valor_anterior[elemento_atual] || 0) + 1;
    return valor_anterior;
  }, {});
  return contagem;
}

function filtro_perguntas(perguntas) {
  var perguntas_invalidas = [0, 3, 7, 35, 82];
  return perguntas.filter((pergunta, indice) => {
    if (perguntas_invalidas.includes(indice)) {
      return false;
    } else {
      return true;
    }
  });
}
function filtro_respostas(array_resposta) {
  return array_resposta.map((array) => {
    return filtro_perguntas(array);
  });
}
function ler_csv() {
  var arquivo = entrada.files[0];
  Papa.parse(arquivo, {
    complete: function (arquivo_lido) {
      var perguntas = filtro_perguntas(arquivo_lido.data[0]);
      var respostas = filtro_respostas(arquivo_lido.data.slice(1));
      console.log(perguntas);
      console.log(respostas);

      var opcoes_geradas = perguntas.map((pergunta, indice) => {
        return `<option value="${indice}">${pergunta}</option>`;
      });
      opcao.innerHTML = opcoes_geradas.join("");

      ray_respostas = respostas;
      ray_perguntas = perguntas;
      opcao_selecionada();
    },
  });
}

// Load Charts and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Callback that draws the pie chart for Sarah's pizza.
function desenhar_grafico(info, titulo) {
  // Create the data table for Sarah's pizza.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows(info);

  // Set options for Sarah's pie chart.
  var options = {
    title: titulo,
    width: 400,
    height: 300,
  };

  // Instantiate and draw the chart for Sarah's pizza.
  var chart = new google.visualization.PieChart(
    document.getElementById("Sarah_chart_div")
  );
  chart.draw(data, options);
}

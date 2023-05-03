const createElement = (tag) => document.createElement(tag);
(() => {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s `;
    }
    function Patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            const row = createElement('tr');
            const tbody = $('#patio');
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                <button class="delete" data-placa="${veiculo.placa}">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
                </td>
            `;
            row.querySelector('.delete').addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
            if (salva) {
                salvar([...ler(), veiculo]);
            }
        }
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu estacionado por ${tempo} Deseja encerrar?`)) {
                return;
            }
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    Patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        const entrada = new Date().toISOString();
        if (!nome || !placa) {
            alert('Os campos "NOME" e "PLACA" são obrigatorios');
            return;
        }
        Patio().adicionar({ nome, placa, entrada }, true);
    });
})();

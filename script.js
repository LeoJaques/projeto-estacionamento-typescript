// import { HTMLInputElement } from 'dom'
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var createElement = function (tag) { return document.createElement(tag); };
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    function calTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return "".concat(min, "m e ").concat(sec, "s ");
    }
    function Patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var row = createElement('tr');
            var tbody = $('#patio');
            row.innerHTML = "\n                <td>".concat(veiculo.nome, "</td>\n                <td>").concat(veiculo.placa, "</td>\n                <td>").concat(veiculo.entrada, "</td>\n                <td>\n                <button class=\"delete\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n                </td>\n            ");
            row.querySelector('.delete').addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
            if (salva) {
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
            }
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calTempo(new Date().getTime() - entrada.getTime());
            if (!confirm("O veiculo ".concat(nome, " permaneceu estacionado por ").concat(tempo, " Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return adicionar(veiculo); }));
        }
        function render() {
            $('#patio').innerHTML = '';
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    Patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        var entrada = new Date();
        if (!nome || !placa) {
            alert('Os campos "NOME" e "PLACA" são obrigatorios');
            return;
        }
        Patio().adicionar({ nome: nome, placa: placa, entrada: entrada }, true);
    });
})();

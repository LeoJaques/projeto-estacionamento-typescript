
interface IVeiculo {
    nome: string,
    placa: string,
    entrada: Date | string
}

const createElement = (tag: string) => document.createElement(tag)


    ; (() => {
        const $ = (query: string): HTMLInputElement | null => document.querySelector(query)

        function calTempo(mil: number) {
            const min = Math.floor(mil / 60000)
            const sec = Math.floor((mil % 60000) / 1000)

            return `${min}m e ${sec}s `
        }

        function Patio() {
            function ler(): IVeiculo[] {
                return localStorage.patio ? JSON.parse(localStorage.patio) : []
            }

            function salvar(veiculos: IVeiculo[]) {
                localStorage.setItem('patio', JSON.stringify(veiculos))
            }

            function adicionar(veiculo: IVeiculo, salva?: boolean) {
                const row = createElement('tr')
                const tbody = $('#patio')

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
            `

                row.querySelector('.delete').addEventListener('click', function(){
                    remover(this.dataset.placa)
                })

                tbody?.appendChild(row)

                if (salva) {
                    salvar([...ler(), veiculo])
                }

            }

            function remover(placa: string) {
                const {entrada, nome} = ler().find((veiculo) => veiculo.placa === placa)

                const tempo = calTempo(new Date().getTime() - new Date(entrada).getTime())

                if(!confirm(`O veiculo ${nome} permaneceu estacionado por ${tempo} Deseja encerrar?`)){
                    return 

                }
                

                salvar(ler().filter((veiculo) => veiculo.placa !== placa))
                render()
            }


            function render() {
                $('#patio')!.innerHTML = ''
                const patio = ler()

                if (patio.length) {
                    patio.forEach(veiculo => adicionar(veiculo))
                }
            }

            return { ler, adicionar, remover, salvar, render }
        }

        Patio().render()

        $('#cadastrar')?.addEventListener('click', () => {
            const nome = $('#nome')?.value
            const placa = $('#placa')?.value
            const entrada = new Date().toISOString()

            if (!nome || !placa) {
                alert('Os campos "NOME" e "PLACA" são obrigatorios')
                return
            }

            Patio().adicionar({ nome, placa, entrada }, true)


        })


    })()



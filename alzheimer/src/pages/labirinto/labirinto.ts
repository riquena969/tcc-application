import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ToastController,
    AlertController
} from 'ionic-angular';

import {
    HttpClient
} from '@angular/common/http';

import {
    ServiceComponent
} from '../../services/service.component';

@IonicPage()
@Component({
    selector: 'page-labirinto',
    templateUrl: 'labirinto.html',
})
export class LabirintoPage {

    public rows = [];
    private tentativas = [];
    private quantidadeTentativas = 0;
    public timer = 3;
    public interval;
    public jogoIniciado = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController, public http: HttpClient, public services: ServiceComponent) {
        for (var r = 0; r < 12; r++) {
            this.rows.push([]);
            for (var c = 0; c < 5; c++) {
                this.rows[r].push(new Cell(r, c));
            }
        }

        this.rows[0][0].checked = true;
        this.tentativas.push(this.rows[0][0]);

        let colunas = this.rows[0].length;
        let linhas = this.rows.length;

        let colunaPerigo = 0;
        let linhaPerigo = 0;
        for (var i = 0; i < colunas - 1; ++i) {
            colunaPerigo = Math.floor((Math.random() * colunas));
            linhaPerigo = Math.floor((Math.random() * linhas));

            this.rows[linhaPerigo][colunaPerigo].danger = true;
            console.log(this.rows[linhaPerigo][colunaPerigo].danger);
        }

        this.rows[linhas - 1][colunas - 1].end = true;

        this.presentToast('Atente-se aos quadrados vermelhos!', 3000);

        this.interval = setInterval(() => {
            if (this.jogoIniciado) {
                this.timer++;
            } else {
                this.timer--;
            }

            if (this.timer == 0) {
                this.jogoIniciado = true;
                this.presentToast('Marque o caminho!', 2500);
            }
        }, 1000);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LabirintoPage');
    }

    public tentativaUsuario(cell) {
        if (!this.jogoIniciado) return;

        if (cell.checked) {
            let posicaoCelula = 0; // Armazena a posição da célula no array para set utilizada para remover os itens do array de tentativas

            for (var i = 0; i < this.tentativas.length; ++i) {
                if (this.tentativas[i] == cell) {
                    posicaoCelula = i;
                }
            }
            for (var i = this.tentativas.length - 1; i >= posicaoCelula; i--) {
                this.rows[this.tentativas[i].x][this.tentativas[i].y].checked = false;
                this.tentativas.splice(i, 1);
            }

            if (this.tentativas.length == 0) {
                this.rows[0][0].checked = true;
                this.tentativas.push(this.rows[0][0]);
            }
        } else {
            let ultimaTentativa = this.tentativas.length > 0 ? this.tentativas[this.tentativas.length - 1] : cell;

            if ((ultimaTentativa.x == cell.x && (ultimaTentativa.y - 1 == cell.y || ultimaTentativa.y + 1 == cell.y)) ||
                (ultimaTentativa.y == cell.y && (ultimaTentativa.x - 1 == cell.x || ultimaTentativa.x + 1 == cell.x))) {
                this.quantidadeTentativas++;

                this.tentativas.push(cell);
                cell.checked = true;

                if (cell.end) {
                    this.gameOver();
                }
            }

        }
    }

    private presentToast(message, duration = 2000) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    public gameOver() {
        clearInterval(this.interval);
        this.jogoIniciado = false;

        let tempoMedio = Math.round((this.timer / this.quantidadeTentativas) * 10) / 10;

        let erros = 0;
        for (var i = this.tentativas.length - 1; i >= 0; i--) {
            if (this.tentativas[i].danger) {
                erros++;
            }
        }

        let url = this.services.getConfigs().url + 'game-2/setScore.php?tempo=' + this.timer +
                                                                       '&velocidade_media=' + tempoMedio +
                                                                       '&eficiencia=' + (100 - ((erros/this.tentativas.length) * 100)) +
                                                                       '&cliques=' + this.quantidadeTentativas +
                                                                       '&tamanho_caminho=' + this.tentativas.length;
        new Promise(resolve => {
            this.http.get(url).subscribe((retorno: RetornoSetScore) => {
            }, err => {
                console.log(err);
            });
        });

        const alert = this.alertCtrl.create({
            title: 'Tempo esgotado!',
            subTitle: `Tempo gasto: ${this.timer} segundos!\n
                       Velocidade média: ${tempoMedio} seg/item\n
                       Eficiência: ${100 - ((erros/this.tentativas.length) * 100)}%`,
            buttons: ['OK']
        });

        alert.present();
    }


}

class Cell {
    public x;
    public y;
    public checked = false;
    public danger = false;
    public end = false;

    public constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

interface RetornoSetScore {
    sucesso: boolean
}
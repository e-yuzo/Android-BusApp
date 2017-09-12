import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
  "name": "Terminal | UTFPR",
  "profilePic": "assets/img/bus.jpg",
  "about": "Burt is a Bear."
};


  constructor(public http: Http) {
    let items = [
      {
        "name": "Terminal | UTFPR",
        "profilePic": "assets/img/bus.jpg",
        "rota": "assets/img/bus/to_utfpr.png",
        "about": "Segunda-Sabado.(13)",
        "semana":   [	
            { hora: "06:45"
            },
            { hora:"07:20"
            },
            { hora:"07:55"
            },
            { hora:"09:00"
            },
            { hora:"10:10"
            },
            { hora:"11:50"
            },
            { hora:"12:45"
            },
            { hora:"13:15"
            },
            { hora:"13:40"
            },
            { hora:"15:35"
            },
            { hora:"17:15"
            },
            { hora:"17:30"
            },
            { hora:"18:30"
            },
            { hora:"18:50"
            },
            { hora:"19:15"
            },
            { hora:"20:00"
            },
            { hora:"21:10"
            }
                    ],
        "sabado": [
            { hora: "06:45"
            },
            { hora:"07:15"
            },
            { hora:"07:55"
            },
            { hora:"09:10"
            },
            { hora:"10:10"
            }
		]
      },
	  {
        "name": "UTFPR | Terminal",
        "profilePic": "assets/img/bus.jpg",
        "rota": "assets/img/bus/to_utfpr.png",
        "about": "Segunda-Sabado.(13)",
        "semana":   [	
            { hora: "07:00"
            },
            { hora:"07:25"
            },
            { hora:"09:20"
            },
            { hora:"10:20"
            },
            { hora:"12:05"
            },
            { hora:"13:00"
            },
            { hora:"14:00"
            },
            { hora:"15:50"
            },
            { hora:"16:50"
            },
            { hora:"17:40"
            },
            { hora:"18:00"
            },
            { hora:"18:45"
            },
            { hora:"20:10"
            },
            { hora:"21:25"
            },
            { hora:"22:05"
            },
            { hora:"23:10"
            }
                ],
        "sabado": [{ hora: "07:00"
            },
            { hora:"07:25"
            },
            { hora:"09:20"
            },
            { hora:"10:20"
            },
            { hora:"12:10"
            }
		]
      },
      {
        "name": "Terminal | Jardim Gutierrez",
        "profilePic": "assets/img/bus.jpg",
        "about": "Segunda-Sabado(13)"
      },
      {
        "name": "Terminal | JBS | Rodoviaria",
        "profilePic": "assets/img/bus.jpg",
        "about": "Segunda-Sabado(10)"
      },
      {
        "name": "JARDIM CIDADE NOVA | CONJ. FORTUNATO PERDONCINI | VILA URUPÃŠS | TERMINAL",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(09)"
      },
      {
        "name": "PARQUE INDUSTRIAL II | TERMINAL",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(08)"
      },
      {
        "name": "CONJ.MORADIAS CONDOR | JD.AEROPORTO | JD.PAULISTA | CONJ. PARIGOT DE SOUZA | JARDIM F.F ALBUQUERQUE | TERMINAL",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(07)"
      },
      {
        "name": "CONJ. AVELINO PIACENTINI | JD.TROPICAL | CONJ. DIAMANTE AZUL | DETRAN - CEMITÃ‰RIO | TERMINAL",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(06)"
      },
      {
        "name": "JD. MODELO - PERIM. TANCREDO NEVES | TERMINAL.",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(05)"
      },
      {
        "name": "JARDIM SANTA CRUZ | JARDIM N. SRA. APARECIDA | TERMINAL.",
        "profilePic": "assets/img/bus.jpg",
        "about": "Segunda-Sabado.(04)"
      },
      {
        "name": "CONJ. DRÂº MILTON LUIS PEREIRA | ( COHAPAR ) | RUA DAS PALMEIRAS | TERMINAL.",
        "profilePic": "assets/img/bus.jpg",
        "about": "Segunda-Sabado.(03)"
      },
      {
        "name": "PARQUE INDUSTRIAL I | ( SESI ) LAR | PARANÃ� | TERMINAL ",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(02)"
      },
      {
        "name": "JARDIM ALVORADA | PARANÃ� DIESEL | TERMINAL ",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(02)"
      },
      {
        "name": "COHAPAR | TERMINAL ",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(01)"
      },
      {
        "name": "LOJA DE PEÃ‡AS | TERMINAL ",
        "profilePic": "assets/img/bus.jpg",
        "about": "Todos os dias.(01)"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

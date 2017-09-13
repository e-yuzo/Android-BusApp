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
        "origem": "Terminal",
        "destino": "UTFPR",
        "profilePic": "assets/img/bus.jpg",
        "rota": "assets/img/bus/to_utfpr.png",
        "about": "Terminal | ARCAM | UTFPR/CEFET",
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
        "origem": "UTFPR",
        "destino": "Terminal",
		"profilePic": "assets/img/bus.jpg",
        "rota": "assets/img/bus/to_utfpr.png",
        "about": "ARCAM | UTFPR/CEFET | Terminal",
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
        "origem": "Terminal",
        "destino": "Jardim Gutierrez",
		"profilePic": "assets/img/bus.jpg",
        "about": "Terminal | Jardim Gutierrez",
		"semana":   [	
            { hora: "06:20"
            },
            { hora:"06:50"
            },
            { hora:"07:20"
            },
            { hora:"07:50"
            },
            { hora:"09:50"
            },
            { hora:"10:50"
            },
            { hora:"11:20"
            },
            { hora:"11:50"
            },
            { hora:"12:20"
            },
            { hora:"12:50"
            },
            { hora:"13:20"
            },
            { hora:"13:50"
            },
            { hora:"16:50"
            },
            { hora:"17:50"
            },
            { hora:"18:25"
            },
            { hora:"18:55"
            }	
                    ],
		"sabado":   [	
            { hora: "06:20"
            },
            { hora:"06:50"
            },
            { hora:"07:20"
            },
            { hora:"07:50"
            },
            { hora:"09:50"
            },
            { hora:"10:50"
            },
            { hora:"11:20"
            },
            { hora:"11:50"
            },
            { hora:"12:20"
            },
            { hora:"12:50"
            },
            { hora:"13:40"
            }	
                    ]
	
      },
	  {
        "destino": "Terminal",
        "origem": "Jardim Gutierrez",
		"profilePic": "assets/img/bus.jpg",
        "about": "Jardim Gutierrez | Terminal",
		"semana":   [	
            { hora: "06:30"
            },
            { hora:"07:00"
            },
            { hora:"08:00"
            },
            { hora:"10:00"
            },
            { hora:"11:00"
            },
            { hora:"10:30"
            },
            { hora:"12:00"
            },
            { hora:"12:30"
            },
            { hora:"13:00"
            },
            { hora:"13:30"
            },
            { hora:"14:00"
            },
            { hora:"17:00"
            },
            { hora:"18:00"
            },
            { hora:"18:35"
            },
            { hora:"19:05"
            }	
                    ],
		"sabado":   [	
            { hora: "06:30"
            },
            { hora:"07:00"
            },
            { hora:"07:30"
            },
            { hora:"08:00"
            },
            { hora:"10:00"
            },
            { hora:"11:00"
            },
            { hora:"11:30"
            },
            { hora:"12:00"
            },
            { hora:"12:30"
            },
            { hora:"13:05"
            },
            { hora:"13:50"
            }	
                    ]
	
      },
	  {
        "origem": "Vila Rural",
        "destino": "Terminal",
		"profilePic": "assets/img/bus.jpg",
        "about": "Vila Rural | Terminal",
		"semana":   [	
            { hora:"07:00"
            },
            { hora:"11:05"
            },
            { hora:"13:30"
            },
            { hora:"19:00"
            }	
                    ],
		"sabado":   [	
            { hora:"07:00"
            },
            { hora:"11:30"
            },
            { hora:"13:30"
            },
            { hora:"19:00"
            }	
                    ],
		"domingo":   [	
            { hora:"08:50"
            },
            { hora:"18:50"
            }	
                    ]
	
      },{
        "origem": "Terminal",
        "destino": "Vila Rural",
		"profilePic": "assets/img/bus.jpg",
        "about": "Terminal | Vila Rural",
		"semana":   [	
            { hora:"06:50"
            },
            { hora:"10:50"
            },
            { hora:"13:15"
            },
            { hora:"18:45"
            }	
                    ],
		"sabado":   [	
            { hora:"06:45"
            },
            { hora:"11:15"
            },
            { hora:"13:15"
            },
            { hora:"18:40"
            }	
                    ],
		"domingo":   [	
            { hora:"06:40"
            },
            { hora:"18:40"
            }	
                    ]
	
      },{
        "destino": "Terminal",
        "origem": "Vila Guarujá",
		"profilePic": "assets/img/bus.jpg",
        "about": "Vila Guarujá | Terminal",
		"semana":   [	
            { hora:"07:30"
            },
            { hora:"08:00"
            },
            { hora:"12:00"
            },
            { hora:"13:30"
            },
            { hora:"17:00"
            },
            { hora:"19:00"
            }	
                    ],
		"sabado":   [	
            { hora:"08:00"
            },
            { hora:"11:45"
            },
            { hora:"19:00"
            }
                    ],
		"domingo":   [	
            { hora:"08:15"
            },
            { hora:"11:40"
            },
            { hora:"19:00"
            }
                    ]
	
      },{
        "origem": "Terminal",
        "destino": "Vila Guarujá",
		"profilePic": "assets/img/bus.jpg",
        "about": "Vila Guarujá | Terminal | Colégio Agricola",
		"semana":   [	
            { hora:"07:15", via:"Colégio Agricola"
            },
            { hora:"07:30"
            },
            { hora:"11:45", via:"Colégio Agricola"
            },
            { hora:"13:15"
            },
            { hora:"16:40", via:"Colégio Agricola"
            },
            { hora:"18:40"
            }	
                    ],
		"sabado":   [	
            { hora:"07:40"
            },
            { hora:"11:30"
            },
            { hora:"18:40"
            }
                    ],
		"domingo":   [	
            { hora:"08:05"
            },
            { hora:"11:30"
            },
            { hora:"18:40"
            }
                    ]
	
      },
      {
        "name": "Terminal | JBS | Rodoviaria",
        "profilePic": "assets/img/bus.jpg",
        "about": "Terminal | JBS | Rodoviaria"
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

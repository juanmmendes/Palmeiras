// src/fifa/players.ts

export type Position =
  | "Goleiro"
  | "Zagueiro"
  | "Lateral-direito"
  | "Lateral-esquerdo"
  | "Meio-campista"
  | "Atacante";

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  photo: string; // ex.: "/players/21-weverton.webp"
}

export const players: Player[] = [
  // GOLEIROS
  { id: "21-weverton",     name: "Weverton",           number: 21, position: "Goleiro",         photo: "/players/21-weverton.webp" },
  { id: "1-carlos-miguel", name: "Carlos Miguel",      number: 1,  position: "Goleiro",         photo: "/players/1-carlos-miguel.webp" },
  { id: "14-marcelo-lomba",name: "Marcelo Lomba",      number: 14, position: "Goleiro",         photo: "/players/14-marcelo-lomba.webp" },

  // DEFENSORES
  { id: "15-gustavo-gomez",name: "Gustavo Gómez",      number: 15, position: "Zagueiro",        photo: "/players/15-gustavo-gomez.webp" },
  { id: "26-murilo",       name: "Murilo",             number: 26, position: "Zagueiro",        photo: "/players/26-murilo.webp" },
  { id: "3-bruno-fuchs",   name: "Bruno Fuchs",        number: 3,  position: "Zagueiro",        photo: "/players/3-bruno-fuchs.webp" },
  { id: "13-micael",       name: "Micael",             number: 13, position: "Zagueiro",        photo: "/players/13-micael.webp" },
  { id: "43-benedetti",    name: "Benedetti",          number: 43, position: "Zagueiro",        photo: "/players/43-benedetti.webp" },

  // LATERAIS
  { id: "4-agustin-giay",  name: "Agustín Giay",       number: 4,  position: "Lateral-direito",  photo: "/players/4-agustin-giay.webp" },
  { id: "24-khellven",     name: "Khellven",           number: 24, position: "Lateral-direito",  photo: "/players/24-khellven.webp" },
  { id: "22-piquerez",     name: "Joaquín Piquerez",   number: 22, position: "Lateral-esquerdo", photo: "/players/22-piquerez.webp" },
  { id: "6-jefte",         name: "Jefté",              number: 6,  position: "Lateral-esquerdo", photo: "/players/6-jefte.webp" },

  // MEIO-CAMPISTAS
  { id: "40-allan",        name: "Allan",              number: 40, position: "Meio-campista",    photo: "/players/40-allan.webp" },
  { id: "5-anibal-moreno", name: "Aníbal Moreno",      number: 5,  position: "Meio-campista",    photo: "/players/5-anibal-moreno.webp" },
  { id: "23-raphael-veiga",name: "Raphael Veiga",      number: 23, position: "Meio-campista",    photo: "/players/23-raphael-veiga.webp" },
  { id: "18-mauricio",     name: "Mauricio",           number: 18, position: "Meio-campista",    photo: "/players/18-mauricio.webp" },
  { id: "32-felipe-anderson", name: "Felipe Anderson", number: 32, position: "Meio-campista",    photo: "/players/32-felipe-anderson.webp" },
  { id: "8-andreas-pereira",  name: "Andreas Pereira", number: 8,  position: "Meio-campista",    photo: "/players/8-andreas-pereira.webp" },
  { id: "30-lucas-evangelista", name: "Lucas Evangelista", number: 30, position: "Meio-campista", photo: "/players/30-lucas-evangelista.webp" },
  { id: "38-emiliano-martinez", name: "Emiliano Martínez", number: 38, position: "Meio-campista", photo: "/players/38-emiliano-martinez.webp" },
  { id: "31-luighi",       name: "Luighi",             number: 31, position: "Meio-campista",    photo: "/players/31-luighi.webp" },
  { id: "19-figueiredo",   name: "Figueiredo",         number: 19, position: "Meio-campista",    photo: "/players/19-figueiredo.webp" },

  // ATACANTES
  { id: "9-vitor-roque",   name: "Vitor Roque",        number: 9,  position: "Atacante",         photo: "/players/9-vitor-roque.webp" },
  { id: "10-paulinho",     name: "Paulinho",           number: 10, position: "Atacante",         photo: "/players/10-paulinho.webp" },
  { id: "17-facundo-torres", name: "Facundo Torres",   number: 17, position: "Atacante",         photo: "/players/17-facundo-torres.webp" },
  { id: "42-lopez",        name: "López",              number: 42, position: "Atacante",         photo: "/players/42-lopez.webp" },
  { id: "11-bruno-rodrigues", name: "Bruno Rodrigues", number: 11, position: "Atacante",         photo: "/players/11-bruno-rodrigues.webp" },
  { id: "19-ramon-sosa",   name: "Ramón Sosa",         number: 19, position: "Atacante",         photo: "/players/19-ramon-sosa.webp" },
];

export default players;

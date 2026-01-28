


import NivelOne from "../assets/NivelOne.jpeg";
import NivelTwo from "../assets/NivelTwo.jpeg";
import NivelThree from "../assets/NivelThree.jpeg";
import NivelFour from "../assets/NivelFour.jpeg";
import EstacionOne from "../assets/EstacionOne.jpeg";
import TripodeOne from "../assets/TripodeOne.jpeg";
import TripodeTwo from "../assets/TripodeTwo.jpeg";
import TripodeThree from "../assets/TripodeThree.jpeg";
import TripodeFour from "../assets/TripodeFour.jpeg";
import TripodeFive from "../assets/TripodeFive.jpeg";
import TripodeSix from "../assets/TripodeSix.jpeg";
import PrismaOne from "../assets/PrismaOne.jpeg";
import PrismaTwo from "../assets/PrismaTwo.jpeg";
import PrismaThree from "../assets/PrismaThree.jpeg";
import PrismaFour from "../assets/PrismaFour.jpeg";
import PrismaFive from "../assets/PrismaFive.jpeg";
import PrismaSix from "../assets/PrismaSix.jpeg";
import JalonOne from "../assets/JalonOne.jpeg";
import JalonTwo from "../assets/JalonTwo.jpeg";
import JalonThree from "../assets/JalonThree.jpeg";
import JalonFour from "../assets/JalonFour.jpeg";

//Nota para las plantillas: los ids de cada elemento deben de ser unicos.
//Ultimo id usado: 22 

export const productos = {
  
  niveles: [
    {
      id: 1,
      nombre: "Nivel laser de 16 líneas",
      precio: "RD$8,260 con impuestos incluidos",
      imagen: NivelOne,
    },
    {
      id: 2,
      nombre: "Nivel laser rotativo SP100 CDI",
      precio: "RD$31,860 con ITBIS incluidos",
      imagen: NivelTwo,
    },

    {
      id: 6,
      nombre: "Nivel automático CDI 32x",
      precio: "RD$21,240 con ITBIS incluidos",
      imagen: NivelThree, 
    },

    {
      id: 7,
      nombre: "Nivel automático AT-B4 TOPCON",
      precio: "RD$33,040 conITBIS incluidos",
      imagen: NivelFour, 
    },

    /*
    Plantilla para agregar un nuevo nivel a la venta:

    {
      id: 6,
      nombre: "Nivel automático AT-B3",
      precio: "RD$18,500",
      imagen: NivelAutomatico, //(asumiendo que se hizo el import arriba)
    }
    */
  ],

  
  estaciones: [
    {
      id: 3,
      nombre: "Estación Total RTS102 CDI",
      precio: "RD$150,000",
      imagen: EstacionOne,
    },

    {
      id: 8,
      nombre: "Estación Total Topcon GM-52",
      precio: "RD$290,000",
      imagen: EstacionOne,
    },

    /*
    Plantilla para agregar una nueva estacion:

    {
      id: 7,
      nombre: "Estación Total Topcon GM-55",
      precio: "RD$420,000",
      imagen: EstacionGM55,
    }
    */
  ],

  
  accesorios: {
    

    tripodes: [
      {
        id: 4,
        nombre: "Tripode de Aluminio AT-20 CDI",
        precio: "RD$10,500 Con ITBIS Incluido",
        imagen: TripodeOne,
      },

      {
        id: 9,
        nombre: "Tripode de Madera y Fibra TRW1-1 Heavy Duty CDI",
        precio: "RD$7,000 Con ITBIS Incluido",
        imagen: TripodeTwo,
      },

      {
        id: 10,
        nombre: "Tripode de Aluminio TRA-13",
        precio: "RD$8,000 Con ITBIS incluido",
        imagen: TripodeThree,
      },

      {
        id: 11,
        nombre: "Tripode de Madera y Fibra S-19 (Doble Seguro) CDI",
        precio: "RD$12,200 Con ITBIS incluido",
        imagen: TripodeFour,
      },

      {
        id: 12,
        nombre: "Tripode de Elevacion Aluminio JE-1 CDI",
        precio: "RD$11,500 Con ITBIS incluido",
        imagen: TripodeFive,
      },

      {
        id: 13,
        nombre: "Mini Tripode de Elevacion Aluminio CDI",
        precio: "RD$3,739 Con ITBIS incluido",
        imagen: TripodeSix,
      },

      /*
      Plantilla para agregar un nuevo tripode:

      {
        id: 8,
        nombre: "Tripode de Madera Pesado",
        precio: "RD$14,800",
        imagen: TripodeMadera,
      }
      */
    ],

    
    prismas: [
      {
        id: 5,
        nombre: "Set de Prisma Topcon",
        precio: "RD$8,075",
        imagen: PrismaOne,
      },

      {
        id: 14,
        nombre: "Prisma C/Porta prisma AK-16 (-34.4)",
        precio: "RD$6,850 Con ITBIS incluido",
        imagen: PrismaTwo,
      },

      {
        id: 15,
        nombre: "Prisma C/Porta prisma AK-17 (-30.00)",
        precio: "RD$6,850 Con ITBIS incluido.",
        imagen: PrismaThree,
      },

      {
        id: 16,
        nombre: "PORTAPRISMA TRIPLE modelo OFFSET",
        precio: "RD$13,387 Con ITBIS incluido",
        imagen: PrismaFour,
      },

      {
        id: 17,
        nombre: "PRISMA LEICA",
        precio: "RD$14,160 Con ITBIS incluido",
        imagen: PrismaFive,
      },

      {
        id: 18,
        nombre: "Mini Prisma Con Mini Baston en Aluminio -30 CDI",
        precio: "RD$12,083 Con ITBIS incluido",
        imagen: PrismaSix,
      },

      /*
      Plantilla para agregar un nuevo prisma:

      {
        id: 9,
        nombre: "Prisma Mini Leica",
        precio: "RD$6,900",
        imagen: PrismaMini,
      }
      */
    ],

    

    jalon: [
      
      {
        id: 19,
        nombre: "Jalon de 5.2 aluminio CDI",
        precio: "RD$14,160 Con ITBIS incluido",
        imagen: JalonOne,
      },

      {
        id: 20,
        nombre: "Jalon de 4.6 aluminio CDI",
        precio: "RD$14,042 Con ITBIS incluido",
        imagen: JalonTwo,
      },

      {
        id: 21,
        nombre: "Jalon de 8m aluminio CDI",
        precio: "RD$14,042 Con ITBIS incluido",
        imagen: JalonThree,
      },

      {
        id: 22,
        nombre: "Jalon de 3.6m aluminio",
        precio: "RD$14,042 Con ITBIS incluido",
        imagen: JalonFour,
      },
      
      
        /*
      Plantilla para agregar un nuevo jalon
      {
        id: 10,
        nombre: "Jalón Telescópico 5m",
        precio: "RD$3,200",
        imagen: JalonTelescopico,
      }
      */
    ],
  },
};

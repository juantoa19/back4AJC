import { config } from "dotenv";
import { DataSource } from "typeorm";

// Definir el entorno, por defecto será 'development'
const env = process.env.NODE_ENV || 'development';

// Cargar las variables de entorno desde el archivo .env correspondiente
config({
    override: true,
    path: `.env.${env}`, // Corrección para interpolar correctamente el valor de env
});

export default new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.PORT, // Convertir la variable PORT a número
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE, // Asegúrate que DATABASE sea 'back_nest_angular_IV' en el .env
    entities: ['src/**/*.entity.ts'], // Ruta a las entidades
    migrations: ['src/database/migrations/*.ts'], // Ruta a las migraciones
});

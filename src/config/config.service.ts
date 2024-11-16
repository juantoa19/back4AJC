import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV || 'development';
    const envFilePath = `${process.cwd()}/.env.${env}`;

    console.log(`Buscando archivo de entorno en: ${envFilePath}`);
    
    if (!fs.existsSync(envFilePath)) {
      console.error(`Archivo .env.${env} no existe en la ruta: ${envFilePath}`);
      
      // Fallback a un archivo genérico `.env`
      const fallbackFilePath = `${process.cwd()}/.env`;
      if (fs.existsSync(fallbackFilePath)) {
        console.warn(`Usando archivo de configuración genérico en: ${fallbackFilePath}`);
        this.envConfig = parse(fs.readFileSync(fallbackFilePath));
      } else {
        console.error('No se encontró ningún archivo de configuración válido. Finalizando la aplicación.');
        process.exit(0);
      }
    } else {
      // Carga el archivo específico del entorno
      this.envConfig = parse(fs.readFileSync(envFilePath));
    }

    console.log('Variables de entorno cargadas correctamente:', this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

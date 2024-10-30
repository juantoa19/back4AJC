import { DataSource } from "typeorm"

export const databaseProvider=[
    {
        provide: "DATABASE_CONNECTION",
        useFactory:()=>{
            const DataSourse= new DataSource(
                {
                    type:'postgres',
                    host:'localhost',
                    port: 5432,
                    username:'postgres',
                    password: 'postgres',
                    database: 'back_nest_angular_IV'

                }
            );

            return DataSourse.initialize();
        }
    }
]
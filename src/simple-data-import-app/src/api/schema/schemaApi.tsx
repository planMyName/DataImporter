import { DataMigrationDetails } from "../../models/DataMigrationDetails"
import axios from 'axios';
import { baseApiUrl } from "../constants";

export interface SchemaHeader {
    name: string,
    type: string,
    required: boolean,
}

export interface ImportSchemaModel {
    inputHeaders?: SchemaHeader[],
    schemaHeaders?: SchemaHeader[]
}

export const ProcessInputFileForSchems = async (migrationDetails?: DataMigrationDetails): Promise<ImportSchemaModel | undefined> => {
    if (!migrationDetails) {
        return undefined
    }

    const schema: any = await axios.get<ImportSchemaModel>(`${baseApiUrl}/api/v1/schema/importschemamodel`, {
        params: {
            fileId: migrationDetails.id,
            migrationType: migrationDetails.type
        }
    })

    return schema.data
}
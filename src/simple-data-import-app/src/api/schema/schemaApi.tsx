import { DataMigrationDetails } from "../../models/DataMigrationDetails"
import axios from 'axios';

type GetSchemaResponse = {
}

export const ProcessInputFileForSchems = async (migrationDetails: DataMigrationDetails): Promise<any> => {
    const schema: any = await axios.post<GetSchemaResponse>(`https://localhost:44361/api/v1/schema`,
                                             migrationDetails)
    return schema
}
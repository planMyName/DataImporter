import { SchemaHeader } from "../api/schema/schemaApi";

export interface DataMigrationDetails {
    id?: string;
    type?: string;
    fileName?: string;
    file?: File;
    fieldMappings?: InputToSchemaMap[];
}

export interface InputToSchemaMap {
    inputHeader: SchemaHeader,
    schemaHeader: SchemaHeader
    index: number
  }
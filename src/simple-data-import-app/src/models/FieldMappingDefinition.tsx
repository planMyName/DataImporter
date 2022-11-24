export interface FieldMappingDefinition {
    fileId?: string;
    sourceFields?: string[];
    targetFields?: string[];
    mappings?: FieldMapping[];
}

export interface FieldMapping {
    sourceField?: string;
    targetField?: string;
}
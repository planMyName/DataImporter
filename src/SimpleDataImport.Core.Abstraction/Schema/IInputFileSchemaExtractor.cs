namespace SimpleDataImport.Core.Abstraction.Schema
{
    public interface IInputFileSchemaExtractor
    {
        ICollection<SchemaHeader> ExtractSchema(Stream inputFileStream);
    }
}
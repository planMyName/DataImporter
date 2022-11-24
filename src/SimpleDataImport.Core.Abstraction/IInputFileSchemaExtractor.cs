namespace SimpleDataImport.Core.Abstraction
{
    public interface IInputFileSchemaExtractor
    {
        SchemaDetail ExtractSchema(Stream inputFileStream);
    }

    public class SchemaDetail
    {
    }
}
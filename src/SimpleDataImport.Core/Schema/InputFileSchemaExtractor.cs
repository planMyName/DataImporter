using IronXL;
using SimpleDataImport.Core.Abstraction.Schema;

namespace SimpleDataImport.Core.Schema;

public class InputFileSchemaExtractor : IInputFileSchemaExtractor
{
    public ICollection<SchemaHeader> ExtractSchema(Stream inputFileStream)
    {
        var workbook = WorkBook.Load(inputFileStream);
        var worksheet = workbook.WorkSheets.First();

        var inputHeaders = worksheet.Rows[0].Select(cell => cell.Value.ToString()).ToList();

        return inputHeaders.Select(x => new SchemaHeader { Name = x, Type = "string" }).ToList();
    }

}
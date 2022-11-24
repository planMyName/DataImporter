namespace SimpleDataImport.Core.Abstraction.Schema;

public class SchemaDetail
{
    public ICollection<SchemaHeader> InputHeaders { get; set; }
    public ICollection<SchemaHeader> SchemaHeaders { get; set; }
}
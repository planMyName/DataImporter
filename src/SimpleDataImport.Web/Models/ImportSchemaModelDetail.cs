namespace SimpleDataImport.Web.Models;

public class ImportSchemaModelDetail
{
    public ICollection<InputHeader> InputHeaders { get; set; }
    public ICollection<SchemaHeader> SchemaHeaders { get; set; }
}
﻿namespace SimpleDataImport.Web.Models;

public class ImportSchemaModelDetail
{
    public ICollection<SchemaHeader> InputHeaders { get; set; }
    public ICollection<SchemaHeader> SchemaHeaders { get; set; }
}
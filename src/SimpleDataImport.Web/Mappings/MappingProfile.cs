using AutoMapper;
using SimpleDataImport.Core.Abstraction.Schema;

namespace SimpleDataImport.Web.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SchemaHeader, Models.SchemaHeader>().ReverseMap();
        }
    }
}

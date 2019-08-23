using AutoMapper;
using Nm.Lib.Mapper.AutoMapper;
using Nm.Module.IDCard.Application.IDCARDService.ViewModels;
using Nm.Module.IDCard.Domain.IDCARD;

namespace Nm.Module.IDCard.Application.IDCARDService
{
    public class MapperConfig : IMapperConfig
    {
        public void Bind(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<IDCARDAddModel, IDCARDEntity>();
            cfg.CreateMap<IDCARDEntity, IDCARDUpdateModel>();
            cfg.CreateMap<IDCARDUpdateModel, IDCARDEntity>();
        }
    }
}

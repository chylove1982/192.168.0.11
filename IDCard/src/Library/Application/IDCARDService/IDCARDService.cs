using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Nm.Lib.Utils.Core.Result;
using Nm.Module.IDCard.Application.IDCARDService.ViewModels;
using Nm.Module.IDCard.Domain.IDCARD;
using Nm.Module.IDCard.Domain.IDCARD.Models;

namespace Nm.Module.IDCard.Application.IDCARDService
{
    public class IDCARDService : IIDCARDService
    {
        private readonly IMapper _mapper;
        private readonly IIDCARDRepository _repository;
        public IDCARDService(IMapper mapper, IIDCARDRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IResultModel> Query(IDCARDQueryModel model)
        {
            var result = new QueryResultModel<IDCARDEntity>
            {
                Rows = await _repository.Query(model),
                Total = model.TotalCount
            };
            return ResultModel.Success(result);
        }

        public async Task<IResultModel> Add(IDCARDAddModel model)
        {
            var entity = _mapper.Map<IDCARDEntity>(model);
            //if (await _repository.Exists(entity))
            //{
                //return ResultModel.HasExists;
            //}

            var result = await _repository.AddAsync(entity);
            return ResultModel.Result(result);
        }

        public async Task<IResultModel> Delete(Guid id)
        {
            var result = await _repository.DeleteAsync(id);
            return ResultModel.Result(result);
        }

        public async Task<IResultModel> Edit(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            if (entity == null)
                return ResultModel.NotExists;

            var model = _mapper.Map<IDCARDUpdateModel>(entity);
            return ResultModel.Success(model);
        }

        public async Task<IResultModel> Update(IDCARDUpdateModel model)
        {
            var entity = await _repository.GetAsync(model.Id);
            if (entity == null)
                return ResultModel.NotExists;

            _mapper.Map(model, entity);

            //if (await _repository.Exists(entity))
            //{
                //return ResultModel.HasExists;
            //}

            var result = await _repository.UpdateAsync(entity);

            return ResultModel.Result(result);
        }
    }
}

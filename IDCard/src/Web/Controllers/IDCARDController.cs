using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Nm.Lib.Utils.Core.Result;
using Nm.Module.IDCard.Application.IDCARDService;
using Nm.Module.IDCard.Application.IDCARDService.ViewModels;
using Nm.Module.IDCard.Domain.IDCARD.Models;

namespace Nm.Module.IDCard.Web.Controllers
{
    [Description("IDCARD管理")]
    public class IDCARDController : ModuleController
    {
        private readonly IIDCARDService _service;

        public IDCARDController(IIDCARDService service)
        {
            _service = service;
        }

        [HttpGet]
        [Description("查询")]
        public Task<IResultModel> Query([FromQuery]IDCARDQueryModel model)
        {
            return _service.Query(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("添加")]
        public Task<IResultModel> Add(IDCARDAddModel model)
        {
            return _service.Add(model);
        }

        [HttpDelete]
        [Description("删除")]
        public Task<IResultModel> Delete([BindRequired]Guid id)
        {
            return _service.Delete(id);
        }

        [HttpGet]
        [Description("编辑")]
        public Task<IResultModel> Edit([BindRequired]Guid id)
        {
            return _service.Edit(id);
        }

        [HttpPost]
        [Description("修改")]
        public Task<IResultModel> Update(IDCARDUpdateModel model)
        {
            return _service.Update(model);
        }
    }
}

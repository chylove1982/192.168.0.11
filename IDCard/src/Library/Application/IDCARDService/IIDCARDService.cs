using System;
using System.Threading.Tasks;
using Nm.Lib.Utils.Core.Result;
using Nm.Module.IDCard.Application.IDCARDService.ViewModels;
using Nm.Module.IDCard.Domain.IDCARD.Models;

namespace Nm.Module.IDCard.Application.IDCARDService
{
    /// <summary>
    /// IDCARD服务
    /// </summary>
    public interface IIDCARDService
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<IResultModel> Query(IDCARDQueryModel model);

        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<IResultModel> Add(IDCARDAddModel model);

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id">编号</param>
        /// <returns></returns>
        Task<IResultModel> Delete(Guid id);

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<IResultModel> Edit(Guid id);

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<IResultModel> Update(IDCARDUpdateModel model);

    }
}

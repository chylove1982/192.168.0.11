using System.Collections.Generic;
using System.Threading.Tasks;
using Nm.Lib.Data.Abstractions;
using Nm.Lib.Data.Abstractions.Pagination;
using Nm.Module.IDCard.Domain.IDCARD.Models;

namespace Nm.Module.IDCard.Domain.IDCARD
{
    /// <summary>
    /// IDCARD仓储
    /// </summary>
    public interface IIDCARDRepository : IRepository<IDCARDEntity>
    {
        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<IList<IDCARDEntity>> Query(IDCARDQueryModel model);
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nm.Lib.Data.Abstractions;
using Nm.Lib.Data.Core;
using Nm.Lib.Data.Query;
using Nm.Module.Admin.Domain.Account;
using Nm.Module.IDCard.Domain.IDCARD;
using Nm.Module.IDCard.Domain.IDCARD.Models;

namespace Nm.Module.IDCard.Infrastructure.Repositories.SqlServer
{
    public class IDCARDRepository : RepositoryAbstract<IDCARDEntity>, IIDCARDRepository
    {
        public IDCARDRepository(IDbContext context) : base(context)
        {
        }

        public async Task<IList<IDCARDEntity>> Query(IDCARDQueryModel model)
        {
            var paging = model.Paging();

            var query = Db.Find(m => m.ProjectId.Contains(model.ProjectId)&& m.CardNum.Contains(model.CardNum) );

            if (!paging.OrderBy.Any())
            {
                query.OrderByDescending(m => m.Id);
            }

            var result = await query.LeftJoin<AccountEntity>((x, y) => x.CreatedBy == y.Id)
                .Select((x, y) => new { x, Creator = y.Name })
                .PaginationAsync(paging);

            model.TotalCount = paging.TotalCount;

            return result;
        }
    }
}

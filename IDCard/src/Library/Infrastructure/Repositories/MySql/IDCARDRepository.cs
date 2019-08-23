using Nm.Lib.Data.Abstractions;

namespace Nm.Module.IDCard.Infrastructure.Repositories.MySql
{
    public class IDCARDRepository : SqlServer.IDCARDRepository
    {
        public IDCARDRepository(IDbContext dbContext) : base(dbContext)
        {
        }
    }
}
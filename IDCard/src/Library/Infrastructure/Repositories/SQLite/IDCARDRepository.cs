using Nm.Lib.Data.Abstractions;

namespace Nm.Module.IDCard.Infrastructure.Repositories.SQLite
{
    public class IDCARDRepository : SqlServer.IDCARDRepository
    {
        public IDCARDRepository(IDbContext dbContext) : base(dbContext)
        {
        }
    }
}

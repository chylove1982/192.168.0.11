using Nm.Lib.Data.Abstractions;
using Nm.Lib.Data.Core;

namespace Nm.Module.IDCard.Infrastructure.Repositories
{
    public class IDCardDbContext : DbContext
    {
        public IDCardDbContext(IDbContextOptions options) : base(options)
        {
        }
    }
}

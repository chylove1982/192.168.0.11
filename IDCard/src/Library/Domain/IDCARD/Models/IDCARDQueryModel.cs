using System;
using  Nm.Lib.Data.Query;

namespace  Nm.Module.IDCard.Domain.IDCARD.Models
{
    public class IDCARDQueryModel : QueryModel
    {
        /// <summary>
        /// 项目ID
        /// </summary>
        public string ProjectId { get; set; }


        /// <summary>
        /// 身份证号码
        /// </summary>
        public string CardNum { get; set; }


    }
}

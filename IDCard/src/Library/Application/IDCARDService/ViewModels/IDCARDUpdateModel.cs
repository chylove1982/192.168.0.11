using System;
using System.ComponentModel.DataAnnotations;
using Nm.Module.IDCard.Domain.IDCARD;

namespace Nm.Module.IDCard.Application.IDCARDService.ViewModels
{
    /// <summary>
    /// IDCARD添加模型
    /// </summary>
    public class IDCARDUpdateModel
    {
        [Required(ErrorMessage = "请选择要修改的IDCARD")]
        public Guid Id { get; set; }

            /// <summary>
        /// 项目ID
        /// </summary>
        public string ProjectId { get; set; }

            /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

            /// <summary>
        /// 性别
        /// </summary>
        public string Sex { get; set; }

            /// <summary>
        /// 民族
        /// </summary>
        public string Minzu { get; set; }

            /// <summary>
        /// 生日
        /// </summary>
        public DateTime BarthDay { get; set; }

            /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }

            /// <summary>
        /// 身份证号码
        /// </summary>
        public string CardNum { get; set; }

            /// <summary>
        /// 签发机关
        /// </summary>
        public string Govement { get; set; }

            /// <summary>
        /// 签发日期
        /// </summary>
        public DateTime ExplaintS { get; set; }

            /// <summary>
        /// 截止日期
        /// </summary>
        public DateTime ExplaintE { get; set; }

            /// <summary>
        /// 照片
        /// </summary>
        public string Photo { get; set; }

    
    }
}

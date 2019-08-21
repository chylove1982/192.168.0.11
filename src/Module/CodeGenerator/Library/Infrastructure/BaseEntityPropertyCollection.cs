using System.Collections.Generic;
using Nm.Lib.Utils.Core.Attributes;
using Nm.Module.CodeGenerator.Domain.Class;
using Nm.Module.CodeGenerator.Domain.Property;

namespace Nm.Module.CodeGenerator.Infrastructure
{
    /// <summary>
    /// 基类实体属性集合
    /// </summary>
    [Singleton]

    public class BaseEntityPropertyCollection
    {
        private List<PropertyEntity> GetEntityProperties(PropertyType primaryKeyPropertyType)
        {
            return new List<PropertyEntity>
            {
                new PropertyEntity
                {
                    Name = "Id",
                    IsPrimaryKey = true,
                    IsInherit = true,
                    Remarks = "主键",
                    Type = primaryKeyPropertyType,
                    ShowInList = true,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                }
            };
        }

        private List<PropertyEntity> GetEntityBaseProperties(PropertyType primaryKeyPropertyType)
        {
            return new List<PropertyEntity>
            {
                new PropertyEntity
                {
                    Name = "ID",
                    IsPrimaryKey = true,
                    IsInherit = true,
                    Remarks = "主键",
                    Type = primaryKeyPropertyType,
                    ShowInList = true,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "CreatedBy",
                    IsInherit = true,
                    Remarks = "创建人",
                    Type = PropertyType.String,
                    ShowInList = true,
                    Sort = 1000,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "CreatedTime",
                    IsInherit = true,
                    Remarks = "创建时间",
                    Type = PropertyType.DateTime,
                    ShowInList = true,
                    Sort = 1001
                },
                new PropertyEntity
                {
                    Name = "ModifiedBy",
                    IsInherit = true,
                    Remarks = "修改人",
                    Type = PropertyType.String,
                    Sort = 1002,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "ModifiedTime",
                    IsInherit = true,
                    Remarks = "修改时间",
                    Type = PropertyType.DateTime,
                    Sort = 1003
                },
                new PropertyEntity
                {
                    Name = "PID",
                    IsInherit = true,
                    Remarks = "父级ID",
                    Type = PropertyType.String,
                    Sort = 1004,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0,
                    Nullable=true
                },
                new PropertyEntity
                {
                    Name = "CID",
                    IsInherit = true,
                    Remarks = "所属公司",
                    Type = PropertyType.String,
                    Sort = 1005,
                    Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "IsDeleted",
                    IsInherit = true,
                    Remarks = "是否删除",
                    Type = PropertyType.Bool,
                    Sort = 1006
                },
            };
        }

        private List<PropertyEntity> GetEntityWithSoftDeleteProperties(PropertyType primaryKeyPropertyType)
        {
            return new List<PropertyEntity>
            {
                new PropertyEntity
                {
                    Name = "Id", IsPrimaryKey = true, IsInherit = true, Remarks = "主键",Type = primaryKeyPropertyType,
                    ShowInList = true, Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "Deleted", IsInherit = true, Remarks = "已删除",Type = PropertyType.Bool, Sort = 1000
                },
                new PropertyEntity
                {
                    Name = "DeletedTime",IsInherit = true, Remarks = "删除时间",Type = PropertyType.DateTime, Sort = 1001
                },
                new PropertyEntity
                {
                    Name = "DeletedBy", IsInherit = true, Remarks = "删除人",Type = PropertyType.Guid, Sort = 1002
                }
            };
        }

        private List<PropertyEntity> GetEntityBaseWithSoftDeleteProperties(PropertyType primaryKeyPropertyType)
        {
            return new List<PropertyEntity>
            {
                new PropertyEntity
                {
                    Name = "Id", IsPrimaryKey = true, IsInherit = true, Remarks = "主键", Type = primaryKeyPropertyType,
                    ShowInList = true, Length=(primaryKeyPropertyType==PropertyType.String)?50:0
                },
                new PropertyEntity
                {
                    Name = "CreatedBy", IsInherit = true, Remarks = "创建人", Type = PropertyType.Guid, Sort = 1000
                },
                new PropertyEntity
                {
                    Name = "CreatedTime", IsInherit = true, Remarks = "创建时间", Type = PropertyType.DateTime, Sort = 1001
                },
                new PropertyEntity
                {
                    Name = "ModifiedBy", IsInherit = true, Remarks = "修改人", Type = PropertyType.Guid, Sort = 1002
                },
                new PropertyEntity
                {
                    Name = "ModifiedTime", IsInherit = true, Remarks = "修改时间", Type = PropertyType.DateTime, Sort = 1003
                },
                new PropertyEntity
                {
                    Name = "Deleted", IsInherit = true, Remarks = "已删除",Type = PropertyType.Bool, Sort = 1004
                },
                new PropertyEntity
                {
                    Name = "DeletedTime",IsInherit = true, Remarks = "删除时间",Type = PropertyType.DateTime, Sort = 1005
                },
                new PropertyEntity
                {
                    Name = "DeletedBy", IsInherit = true, Remarks = "删除人",Type = PropertyType.Guid, Sort = 1006
                }
            };
        }

        /// <summary>
        /// 获取指定基类实体的属性字典
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<PropertyEntity> Get(BaseEntityType type)
        {
            switch (type)
            {

                case BaseEntityType.EntityBaseString:
                    return GetEntityBaseProperties(PropertyType.String);

            }

            return new List<PropertyEntity>();
        }
    }
}

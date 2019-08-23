/**************************IDCARD*****************************/
CREATE TABLE [dbo].[IDCARD](
    [Id] [UNIQUEIDENTIFIER] PRIMARY KEY  NOT NULL,
    [ProjectId] [NVARCHAR](50)   NOT NULL,
    [Name] [NVARCHAR](50)   NOT NULL,
    [Sex] [NVARCHAR](50)   NOT NULL,
    [Minzu] [NVARCHAR](50)   NOT NULL,
    [BarthDay] [DATETIME]   NOT NULL,
    [Address] [NVARCHAR](50)   NOT NULL,
    [CardNum] [NVARCHAR](50)   NOT NULL,
    [Govement] [NVARCHAR](50)   NOT NULL,
    [ExplaintS] [DATETIME]   NOT NULL,
    [ExplaintE] [DATETIME]   NOT NULL,
    [Photo] [NVARCHAR](4000)   NOT NULL,
    [CreatedBy] [UNIQUEIDENTIFIER]   NOT NULL,
    [CreatedTime] [DATETIME]   NOT NULL,
    [ModifiedBy] [UNIQUEIDENTIFIER]   NOT NULL,
    [ModifiedTime] [DATETIME]   NOT NULL
)
GO
ALTER TABLE [dbo].[IDCARD] ADD CONSTRAINT [DF_IDCARD_BarthDay]  DEFAULT (GETDATE()) FOR [BarthDay]
GO

ALTER TABLE [dbo].[IDCARD] ADD CONSTRAINT [DF_IDCARD_ExplaintS]  DEFAULT (GETDATE()) FOR [ExplaintS]
GO

ALTER TABLE [dbo].[IDCARD] ADD CONSTRAINT [DF_IDCARD_ExplaintE]  DEFAULT (GETDATE()) FOR [ExplaintE]
GO

ALTER TABLE [dbo].[IDCARD] ADD CONSTRAINT [DF_IDCARD_CreatedTime]  DEFAULT (GETDATE()) FOR [CreatedTime]
GO

ALTER TABLE [dbo].[IDCARD] ADD CONSTRAINT [DF_IDCARD_ModifiedTime]  DEFAULT (GETDATE()) FOR [ModifiedTime]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主键' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'项目ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'ProjectId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性别' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Sex'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'民族' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Minzu'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'BarthDay'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Address'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身份证号码' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'CardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'签发机关' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Govement'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'签发日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'ExplaintS'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'截止日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'ExplaintE'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'照片' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'Photo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'CreatedBy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'创建时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'CreatedTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'ModifiedBy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改时间' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'IDCARD', @level2type=N'COLUMN',@level2name=N'ModifiedTime'
GO



-- ----------------------------
-- IDCARD
-- ----------------------------
CREATE TABLE `IDCARD`  (
  `Id` CHAR(36) PRIMARY KEY NOT NULL   COMMENT '主键',
  `ProjectId` VARCHAR(50)  NOT NULL   COMMENT '项目ID',
  `Name` VARCHAR(50)  NOT NULL   COMMENT '姓名',
  `Sex` VARCHAR(50)  NOT NULL   COMMENT '性别',
  `Minzu` VARCHAR(50)  NOT NULL   COMMENT '民族',
  `BarthDay` DATETIME  NOT NULL   COMMENT '生日',
  `Address` VARCHAR(50)  NOT NULL   COMMENT '地址',
  `CardNum` VARCHAR(50)  NOT NULL   COMMENT '身份证号码',
  `Govement` VARCHAR(50)  NOT NULL   COMMENT '签发机关',
  `ExplaintS` DATETIME  NOT NULL   COMMENT '签发日期',
  `ExplaintE` DATETIME  NOT NULL   COMMENT '截止日期',
  `Photo` VARCHAR(4000)  NOT NULL   COMMENT '照片',
  `CreatedBy` CHAR(36)  NOT NULL   COMMENT '创建人',
  `CreatedTime` DATETIME  NOT NULL   COMMENT '创建时间',
  `ModifiedBy` CHAR(36)  NOT NULL   COMMENT '修改人',
  `ModifiedTime` DATETIME  NOT NULL   COMMENT '修改时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;


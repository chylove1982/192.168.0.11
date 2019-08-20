﻿using System.IO;
using System.Linq;
using Nm.Module.CodeGenerator.Infrastructure.Templates.Models;

namespace Nm.Module.CodeGenerator.Infrastructure.Templates.Default.T4.src.WebHost.Controllers
{
    public partial class Controller  :ITemplateHandler
    {
        private readonly TemplateBuildModel _model;
        private readonly string _prefix;
        private ClassBuildModel _class;

        public Controller (TemplateBuildModel model)
        {
            _model = model;
            _prefix = model.Project.Prefix;
        }

        public void Save()
        {
            var dir = Path.Combine(_model.RootPath, _model.Project.Code, "src/WebHost/Controllers");
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);

            if (_model.Project.ClassList != null && _model.Project.ClassList.Any())
            {
                foreach (var classModel in _model.Project.ClassList)
                {
                    _class = classModel;

                    //清空
                    GenerationEnvironment.Clear();

                    var content = TransformText();

                    var filePath = Path.Combine(dir, $"{_class.Name}Controller.cs");
                    File.WriteAllText(filePath, content);
                }
            }
        }
    }
}

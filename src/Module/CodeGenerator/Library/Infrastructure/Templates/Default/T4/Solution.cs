﻿// ------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本: 16.0.0.0
//  
//     对此文件的更改可能导致不正确的行为，如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
// ------------------------------------------------------------------------------
namespace Nm.Module.CodeGenerator.Infrastructure.Templates.Default.T4
{
    using System;
    
    /// <summary>
    /// Class to produce the template output
    /// </summary>
    
    #line 1 "C:\vsCode\NetModular\src\Module\CodeGenerator\Library\Infrastructure\Templates\Default\T4\Solution.tt"
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.TextTemplating", "16.0.0.0")]
    public partial class Solution : SolutionBase
    {
#line hidden
        /// <summary>
        /// Create the template output
        /// </summary>
        public virtual string TransformText()
        {
            this.Write("Microsoft Visual Studio Solution File, Format Version 12.00\r\n# Visual Studio Vers" +
                    "ion 16\r\nVisualStudioVersion = 16.0.28803.156\r\nMinimumVisualStudioVersion = 10.0." +
                    "40219.1\r\nProject(\"{2150E333-8FDC-42A3-9474-1A3956D46DE8}\") = \"src\", \"src\", \"{B4D" +
                    "3AF99-D551-4B7A-82F3-CE0950FCAA08}\"\r\nEndProject\r\nProject(\"{2150E333-8FDC-42A3-94" +
                    "74-1A3956D46DE8}\") = \"build\", \"build\", \"{9C10C55A-E7D4-45D0-B23D-39BE8BF8DE4A}\"\r" +
                    "\n\tProjectSection(SolutionItems) = preProject\r\n\t\tsrc\\Directory.Build.props = src\\" +
                    "Directory.Build.props\r\n\t\tbuild\\module.build.targets = build\\module.build.targets" +
                    "\r\n\tEndProjectSection\r\nEndProject\r\nProject(\"{2150E333-8FDC-42A3-9474-1A3956D46DE8" +
                    "}\") = \"Library\", \"Library\", \"{E58182FC-0950-453F-8C3A-ABCB477C8A28}\"\r\nEndProject" +
                    "\r\nProject(\"{9A19103F-16F7-4668-BE54-9A1E7A4F7556}\") = \"Domain\", \"src\\Library\\Dom" +
                    "ain\\Domain.csproj\", \"{851F1CBB-A081-40C7-844F-842E0FAE0DF0}\"\r\nEndProject\r\nProjec" +
                    "t(\"{9A19103F-16F7-4668-BE54-9A1E7A4F7556}\") = \"Web\", \"src\\Web\\Web.csproj\", \"{C2D" +
                    "01E40-4038-4527-9AAF-323359CD5CF0}\"\r\nEndProject\r\nProject(\"{9A19103F-16F7-4668-BE" +
                    "54-9A1E7A4F7556}\") = \"WebHost\", \"src\\WebHost\\WebHost.csproj\", \"{CEAE0B43-438D-47" +
                    "78-BF3A-8665246EF718}\"\r\nEndProject\r\nProject(\"{9A19103F-16F7-4668-BE54-9A1E7A4F75" +
                    "56}\") = \"Application\", \"src\\Library\\Application\\Application.csproj\", \"{792B8CBF-" +
                    "AB02-4A87-AB5E-A6CB8E9DE39C}\"\r\nEndProject\r\nProject(\"{2150E333-8FDC-42A3-9474-1A3" +
                    "956D46DE8}\") = \"Solution Items\", \"Solution Items\", \"{9BD68FC4-FDB1-42F6-892A-0E7" +
                    "52711A5BF}\"\r\n\tProjectSection(SolutionItems) = preProject\r\n\t\tREADME.md = README.m" +
                    "d\r\n\tEndProjectSection\r\nEndProject\r\nGlobal\r\n\tGlobalSection(SolutionConfigurationP" +
                    "latforms) = preSolution\r\n\t\tDebug|Any CPU = Debug|Any CPU\r\n\t\tRelease|Any CPU = Re" +
                    "lease|Any CPU\r\n\tEndGlobalSection\r\n\tGlobalSection(ProjectConfigurationPlatforms) " +
                    "= postSolution\r\n\t\t{851F1CBB-A081-40C7-844F-842E0FAE0DF0}.Debug|Any CPU.ActiveCfg" +
                    " = Debug|Any CPU\r\n\t\t{851F1CBB-A081-40C7-844F-842E0FAE0DF0}.Debug|Any CPU.Build.0" +
                    " = Debug|Any CPU\r\n\t\t{851F1CBB-A081-40C7-844F-842E0FAE0DF0}.Release|Any CPU.Activ" +
                    "eCfg = Release|Any CPU\r\n\t\t{851F1CBB-A081-40C7-844F-842E0FAE0DF0}.Release|Any CPU" +
                    ".Build.0 = Release|Any CPU\r\n\t\t{2277E74A-AE69-4392-A173-8ED4BD6EB11E}.Debug|Any C" +
                    "PU.ActiveCfg = Debug|Any CPU\r\n\t\t{2277E74A-AE69-4392-A173-8ED4BD6EB11E}.Debug|Any" +
                    " CPU.Build.0 = Debug|Any CPU\r\n\t\t{2277E74A-AE69-4392-A173-8ED4BD6EB11E}.Release|A" +
                    "ny CPU.ActiveCfg = Release|Any CPU\r\n\t\t{2277E74A-AE69-4392-A173-8ED4BD6EB11E}.Rel" +
                    "ease|Any CPU.Build.0 = Release|Any CPU\r\n\t\t{C2D01E40-4038-4527-9AAF-323359CD5CF0}" +
                    ".Debug|Any CPU.ActiveCfg = Debug|Any CPU\r\n\t\t{C2D01E40-4038-4527-9AAF-323359CD5CF" +
                    "0}.Debug|Any CPU.Build.0 = Debug|Any CPU\r\n\t\t{C2D01E40-4038-4527-9AAF-323359CD5CF" +
                    "0}.Release|Any CPU.ActiveCfg = Release|Any CPU\r\n\t\t{C2D01E40-4038-4527-9AAF-32335" +
                    "9CD5CF0}.Release|Any CPU.Build.0 = Release|Any CPU\r\n\t\t{CEAE0B43-438D-4778-BF3A-8" +
                    "665246EF718}.Debug|Any CPU.ActiveCfg = Debug|Any CPU\r\n\t\t{CEAE0B43-438D-4778-BF3A" +
                    "-8665246EF718}.Debug|Any CPU.Build.0 = Debug|Any CPU\r\n\t\t{CEAE0B43-438D-4778-BF3A" +
                    "-8665246EF718}.Release|Any CPU.ActiveCfg = Release|Any CPU\r\n\t\t{CEAE0B43-438D-477" +
                    "8-BF3A-8665246EF718}.Release|Any CPU.Build.0 = Release|Any CPU\r\n\t\t{792B8CBF-AB02" +
                    "-4A87-AB5E-A6CB8E9DE39C}.Debug|Any CPU.ActiveCfg = Debug|Any CPU\r\n\t\t{792B8CBF-AB" +
                    "02-4A87-AB5E-A6CB8E9DE39C}.Debug|Any CPU.Build.0 = Debug|Any CPU\r\n\t\t{792B8CBF-AB" +
                    "02-4A87-AB5E-A6CB8E9DE39C}.Release|Any CPU.ActiveCfg = Release|Any CPU\r\n\t\t{792B8" +
                    "CBF-AB02-4A87-AB5E-A6CB8E9DE39C}.Release|Any CPU.Build.0 = Release|Any CPU\r\n\tEnd" +
                    "GlobalSection\r\n\tGlobalSection(SolutionProperties) = preSolution\r\n\t\tHideSolutionN" +
                    "ode = FALSE\r\n\tEndGlobalSection\r\n\tGlobalSection(NestedProjects) = preSolution\r\n\t\t" +
                    "{E58182FC-0950-453F-8C3A-ABCB477C8A28} = {B4D3AF99-D551-4B7A-82F3-CE0950FCAA08}\r" +
                    "\n\t\t{851F1CBB-A081-40C7-844F-842E0FAE0DF0} = {E58182FC-0950-453F-8C3A-ABCB477C8A2" +
                    "8}\r\n\t\t{2277E74A-AE69-4392-A173-8ED4BD6EB11E} = {E58182FC-0950-453F-8C3A-ABCB477C" +
                    "8A28}\r\n\t\t{C2D01E40-4038-4527-9AAF-323359CD5CF0} = {B4D3AF99-D551-4B7A-82F3-CE095" +
                    "0FCAA08}\r\n\t\t{CEAE0B43-438D-4778-BF3A-8665246EF718} = {B4D3AF99-D551-4B7A-82F3-CE" +
                    "0950FCAA08}\r\n\t\t{792B8CBF-AB02-4A87-AB5E-A6CB8E9DE39C} = {E58182FC-0950-453F-8C3A" +
                    "-ABCB477C8A28}\r\n\tEndGlobalSection\r\n\tGlobalSection(ExtensibilityGlobals) = postSo" +
                    "lution\r\n\t\tSolutionGuid = {1A6F430A-4015-48B1-BD5B-32C30485B34D}\r\n\tEndGlobalSecti" +
                    "on\r\nEndGlobal\r\n\r\n");
            return this.GenerationEnvironment.ToString();
        }
    }
    
    #line default
    #line hidden
    #region Base class
    /// <summary>
    /// Base class for this transformation
    /// </summary>
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.TextTemplating", "16.0.0.0")]
    public class SolutionBase
    {
        #region Fields
        private global::System.Text.StringBuilder generationEnvironmentField;
        private global::System.CodeDom.Compiler.CompilerErrorCollection errorsField;
        private global::System.Collections.Generic.List<int> indentLengthsField;
        private string currentIndentField = "";
        private bool endsWithNewline;
        private global::System.Collections.Generic.IDictionary<string, object> sessionField;
        #endregion
        #region Properties
        /// <summary>
        /// The string builder that generation-time code is using to assemble generated output
        /// </summary>
        protected System.Text.StringBuilder GenerationEnvironment
        {
            get
            {
                if ((this.generationEnvironmentField == null))
                {
                    this.generationEnvironmentField = new global::System.Text.StringBuilder();
                }
                return this.generationEnvironmentField;
            }
            set
            {
                this.generationEnvironmentField = value;
            }
        }
        /// <summary>
        /// The error collection for the generation process
        /// </summary>
        public System.CodeDom.Compiler.CompilerErrorCollection Errors
        {
            get
            {
                if ((this.errorsField == null))
                {
                    this.errorsField = new global::System.CodeDom.Compiler.CompilerErrorCollection();
                }
                return this.errorsField;
            }
        }
        /// <summary>
        /// A list of the lengths of each indent that was added with PushIndent
        /// </summary>
        private System.Collections.Generic.List<int> indentLengths
        {
            get
            {
                if ((this.indentLengthsField == null))
                {
                    this.indentLengthsField = new global::System.Collections.Generic.List<int>();
                }
                return this.indentLengthsField;
            }
        }
        /// <summary>
        /// Gets the current indent we use when adding lines to the output
        /// </summary>
        public string CurrentIndent
        {
            get
            {
                return this.currentIndentField;
            }
        }
        /// <summary>
        /// Current transformation session
        /// </summary>
        public virtual global::System.Collections.Generic.IDictionary<string, object> Session
        {
            get
            {
                return this.sessionField;
            }
            set
            {
                this.sessionField = value;
            }
        }
        #endregion
        #region Transform-time helpers
        /// <summary>
        /// Write text directly into the generated output
        /// </summary>
        public void Write(string textToAppend)
        {
            if (string.IsNullOrEmpty(textToAppend))
            {
                return;
            }
            // If we're starting off, or if the previous text ended with a newline,
            // we have to append the current indent first.
            if (((this.GenerationEnvironment.Length == 0) 
                        || this.endsWithNewline))
            {
                this.GenerationEnvironment.Append(this.currentIndentField);
                this.endsWithNewline = false;
            }
            // Check if the current text ends with a newline
            if (textToAppend.EndsWith(global::System.Environment.NewLine, global::System.StringComparison.CurrentCulture))
            {
                this.endsWithNewline = true;
            }
            // This is an optimization. If the current indent is "", then we don't have to do any
            // of the more complex stuff further down.
            if ((this.currentIndentField.Length == 0))
            {
                this.GenerationEnvironment.Append(textToAppend);
                return;
            }
            // Everywhere there is a newline in the text, add an indent after it
            textToAppend = textToAppend.Replace(global::System.Environment.NewLine, (global::System.Environment.NewLine + this.currentIndentField));
            // If the text ends with a newline, then we should strip off the indent added at the very end
            // because the appropriate indent will be added when the next time Write() is called
            if (this.endsWithNewline)
            {
                this.GenerationEnvironment.Append(textToAppend, 0, (textToAppend.Length - this.currentIndentField.Length));
            }
            else
            {
                this.GenerationEnvironment.Append(textToAppend);
            }
        }
        /// <summary>
        /// Write text directly into the generated output
        /// </summary>
        public void WriteLine(string textToAppend)
        {
            this.Write(textToAppend);
            this.GenerationEnvironment.AppendLine();
            this.endsWithNewline = true;
        }
        /// <summary>
        /// Write formatted text directly into the generated output
        /// </summary>
        public void Write(string format, params object[] args)
        {
            this.Write(string.Format(global::System.Globalization.CultureInfo.CurrentCulture, format, args));
        }
        /// <summary>
        /// Write formatted text directly into the generated output
        /// </summary>
        public void WriteLine(string format, params object[] args)
        {
            this.WriteLine(string.Format(global::System.Globalization.CultureInfo.CurrentCulture, format, args));
        }
        /// <summary>
        /// Raise an error
        /// </summary>
        public void Error(string message)
        {
            System.CodeDom.Compiler.CompilerError error = new global::System.CodeDom.Compiler.CompilerError();
            error.ErrorText = message;
            this.Errors.Add(error);
        }
        /// <summary>
        /// Raise a warning
        /// </summary>
        public void Warning(string message)
        {
            System.CodeDom.Compiler.CompilerError error = new global::System.CodeDom.Compiler.CompilerError();
            error.ErrorText = message;
            error.IsWarning = true;
            this.Errors.Add(error);
        }
        /// <summary>
        /// Increase the indent
        /// </summary>
        public void PushIndent(string indent)
        {
            if ((indent == null))
            {
                throw new global::System.ArgumentNullException("indent");
            }
            this.currentIndentField = (this.currentIndentField + indent);
            this.indentLengths.Add(indent.Length);
        }
        /// <summary>
        /// Remove the last indent that was added with PushIndent
        /// </summary>
        public string PopIndent()
        {
            string returnValue = "";
            if ((this.indentLengths.Count > 0))
            {
                int indentLength = this.indentLengths[(this.indentLengths.Count - 1)];
                this.indentLengths.RemoveAt((this.indentLengths.Count - 1));
                if ((indentLength > 0))
                {
                    returnValue = this.currentIndentField.Substring((this.currentIndentField.Length - indentLength));
                    this.currentIndentField = this.currentIndentField.Remove((this.currentIndentField.Length - indentLength));
                }
            }
            return returnValue;
        }
        /// <summary>
        /// Remove any indentation
        /// </summary>
        public void ClearIndent()
        {
            this.indentLengths.Clear();
            this.currentIndentField = "";
        }
        #endregion
        #region ToString Helpers
        /// <summary>
        /// Utility class to produce culture-oriented representation of an object as a string.
        /// </summary>
        public class ToStringInstanceHelper
        {
            private System.IFormatProvider formatProviderField  = global::System.Globalization.CultureInfo.InvariantCulture;
            /// <summary>
            /// Gets or sets format provider to be used by ToStringWithCulture method.
            /// </summary>
            public System.IFormatProvider FormatProvider
            {
                get
                {
                    return this.formatProviderField ;
                }
                set
                {
                    if ((value != null))
                    {
                        this.formatProviderField  = value;
                    }
                }
            }
            /// <summary>
            /// This is called from the compile/run appdomain to convert objects within an expression block to a string
            /// </summary>
            public string ToStringWithCulture(object objectToConvert)
            {
                if ((objectToConvert == null))
                {
                    throw new global::System.ArgumentNullException("objectToConvert");
                }
                System.Type t = objectToConvert.GetType();
                System.Reflection.MethodInfo method = t.GetMethod("ToString", new System.Type[] {
                            typeof(System.IFormatProvider)});
                if ((method == null))
                {
                    return objectToConvert.ToString();
                }
                else
                {
                    return ((string)(method.Invoke(objectToConvert, new object[] {
                                this.formatProviderField })));
                }
            }
        }
        private ToStringInstanceHelper toStringHelperField = new ToStringInstanceHelper();
        /// <summary>
        /// Helper to produce culture-oriented representation of an object as a string
        /// </summary>
        public ToStringInstanceHelper ToStringHelper
        {
            get
            {
                return this.toStringHelperField;
            }
        }
        #endregion
    }
    #endregion
}

const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "create-react-component.createReactComponentHere",
    function (param) {
      vscode.window
        .showInputBox({
          prompt: "Component name: ",
          placeHolder: "Component Name",
        })
        .then((componentName) => {
          if (!componentName) return;

          const className = componentName
            .split(/[^a-zA-Z\d]/)
            .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
            .join("");

          const tplDir = path.resolve(__dirname, "__tpl__");
          const destDir = path.join(param.fsPath || "./", className);

          vscode.window.showInformationMessage(destDir);
          fs.mkdirSync(destDir);

          fs.readdirSync(tplDir).forEach((tpl) => {
            let content = fs.readFileSync(path.join(tplDir, tpl), {
              encoding: "utf-8",
            });

            fs.writeFileSync(
              path.join(destDir, tpl.replace("__tpl__", className)),
              content.replace(/__tpl__/g, className)
            );
          });

          vscode.window.showInformationMessage(
            `Component ${className} created successfully!`
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

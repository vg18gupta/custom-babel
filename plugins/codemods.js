export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      ImportDefaultSpecifier(path) {
        if (path.node.local.name !== "Button") {
          return;
        }

        const uses = path.scope.getBinding("Button").referencePaths;

        path.node.local.name = "Boop";

        uses.forEach((refPath) => {
          if (t.isJSXIdentifier(refPath) || t.isIdentifier(refPath)) {
            refPath.node.name = "Boop";
          }
        });
      },
      //ImportDefaultSpecifier(path) {
      //  path.node.name = "Boop";

      //   const uses = path.scope.getBinding('Button').referencePaths;

      //   path.node.local.name = 'Boop';

      //	uses.forEach((refPath) => {
      //    if (t.isJSXIdentifier(refPath) || t.isIdentifier(refPath)) {
      //   	refPath.node.name = 'Boop';
      //    }
      //   })
      // },
      //JSXElement(path) {
      //  if(path.node.openingElement.name.name !== "Button") {
      //  	return;
      //   }

      //   path.node.openingElement.name.name = "BOOP"
      // }
    },
  };
}

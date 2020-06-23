import Plugin from "./Plugin";

export default function ({ type }) {
  // TODO:这里除了type 还有什么别的属性

  let plugins = null;

  // 将插件作用到节点上
  function applyInstance(method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context]);
      }
    }
  }

  const Program = {
    // ast 入口
    enter(path, { opts = {} }) {
      // 先触发 enter
      // 初始化插件实例
      if (!plugins) {
        plugins = [
          new Plugin(
            opts.libraryName,
            opts.libraryDirectory,
            opts.style,
            types
          ),
        ];
      }
      // ProgramEnter 会早于 ImportDeclaration 和 CallExpression 方法
      applyInstance('ProgramEnter', arguments, this);
    },
    // ast 出口
    exit() {
      applyInstance("ProgramExit", arguments, this);
    },
  };

  const ret = {
    visitor: {
      // 里面是各种type
      Program,
      // 这里面还会有 ImportDeclaration 和 CallExpression
    },
  };

  // 插件只作用在 ImportDeclaration 和 CallExpression 上
  ["ImportDeclaration", "CallExpression"].forEach((method) => {
    ret.visitor[method] = () => {
      applyInstance(method, arguments, ret.visitor);
    };
  });

  return ret;
}

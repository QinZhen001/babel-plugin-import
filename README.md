# babel-plugin-import
仿造 babel-plugin-import 



## 补充



```js
import { Button } from 'antd';
import  View  from 'antd';
import * as Swiper  from 'antd';
```



*  Button 为 ImportSpecifier 
* View 为  ImportDefaultSpecifier 
* `*`  as Swiper 为 ImportNamespaceSpecifier 





----



```js
import('./dialogBox.js')
```



* 这是CallExpression
* 其中里面的callee 为 Import








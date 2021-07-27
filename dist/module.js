/*! For license information please see module.js.LICENSE.txt */
define(["react","@grafana/data","@grafana/ui"],(function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=3)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(1),a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var u=function(){return(u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function i(e,t,n,r){return new(n||(n=Promise))((function(a,o){function u(e){try{s(r.next(e))}catch(e){o(e)}}function i(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,i)}s((r=r.apply(e,t||[])).next())}))}function s(e,t){var n,r,a,o,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,r=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!(a=u.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=t.call(e,u)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}var c=function(e){function t(t,n){var r=e.call(this,t)||this;return r.backendSrv=n,r.backendServerPort=t.jsonData.backendServerPort||80,r.backendServerURL=t.url||"https://api-ms.server-eye.de/grafana-plugin",r.backendSrv=n,r}return t.$inject=["instanceSettings","backendSrv"],o(t,e),t.prototype.query=function(e){return i(this,void 0,Promise,(function(){var t,n,a,o=this;return s(this,(function(u){switch(u.label){case 0:return t=e.range,n=(null==t?void 0:t.from.valueOf())||0,a=(null==t?void 0:t.to.valueOf())||0,[4,Promise.all(e.targets.map((function(e){var t=e;return t.hide?new r.MutableDataFrame:o.doQuery(e.agentid,e.selectedAgentTarget.value||"",n,a).then((function(n){if(!n.values)return new r.MutableDataFrame;var a=[],o=[];n.values.forEach((function(e){a.push(e.msDate),o.push(e.value)}));var u=[{type:"time",values:a},{name:t.selectedAgentTarget.value,type:"number",values:o}];return new r.MutableDataFrame({name:e.selectedAgentTarget.value,refId:t.refId,fields:u})}))})))];case 1:return[2,{data:u.sent()}]}}))}))},t.prototype.doQuery=function(e,t,n,r){return i(this,void 0,Promise,(function(){return s(this,(function(a){return[2,this.backendSrv.datasourceRequest({url:this.backendServerURL+"/"+e+"/"+t+"/"+n+"/"+r}).then((function(e){return e.data})).catch((function(e){return e}))]}))}))},t.prototype.retrieveTargetsForAgent=function(e){return i(this,void 0,Promise,(function(){return s(this,(function(t){return[2,this.backendSrv.datasourceRequest({url:this.backendServerURL+"/"+e+"/targets",method:"GET"}).then((function(e){return e.data})).catch((function(e){return e}))]}))}))},t.prototype.testDatasource=function(){return i(this,void 0,void 0,(function(){return s(this,(function(e){return[2,{status:"success",message:"Success"}]}))}))},t}(r.DataSourceApi),l=n(0),f=n.n(l),p=n(2),d=p.LegacyForms.SecretFormField,g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onAPIKeyChange=function(e){var n=t.props,r=n.onOptionsChange,a=n.options;r(u(u({},a),{secureJsonData:{apiKey:e.target.value}}))},t.onResetAPIKey=function(){var e=t.props,n=e.onOptionsChange,r=e.options;n(u(u({},r),{secureJsonFields:u(u({},r.secureJsonFields),{apiKey:!1}),secureJsonData:u(u({},r.secureJsonData),{apiKey:""})}))},t}return o(t,e),t.prototype.render=function(){var e=this.props.options,t=e.secureJsonFields,n=e.secureJsonData||{};return f.a.createElement("div",{className:"gf-form-group"},f.a.createElement("div",{className:"gf-form-inline"},f.a.createElement("div",{className:"gf-form"},f.a.createElement(d,{isConfigured:t&&t.apiKey,value:n.apiKey,label:"API Key",placeholder:"Your API key from Server-Eye",labelWidth:6,inputWidth:24,onReset:this.onResetAPIKey,onChange:this.onAPIKeyChange}))))},t}(l.PureComponent),h=p.LegacyForms.FormField,v=/[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}/g,y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onAgentTargetChange=function(e){var n=t.props,r=n.onChange,a=n.query;r(u(u({},a),{selectedAgentTarget:e}))},t.onAgentIDChange=function(e){var n=t.props,r=n.onChange,a=n.query;r(u(u({},a),{agentid:e.target.value})),e.target.value.match(v)&&t.refreshPossibleAgentTargets(e.target.value)},t}return o(t,e),t.prototype.refreshPossibleAgentTargets=function(e){return i(this,void 0,void 0,(function(){var t,n=this;return s(this,(function(r){return t=function(){return e||n.props.query.agentid},this.props.datasource.retrieveTargetsForAgent(t()).then((function(e){var t=e.map((function(e){return{label:e.saveName,value:e.saveName,description:e.name}})),r=n.props,a=r.onChange,o=r.query;a(u(u({},o),{possibleAgentTargets:t}))})),[2]}))}))},t.prototype.render=function(){var e=this.props.query,t=e.agentid,n=e.possibleAgentTargets,r=e.selectedAgentTarget;return f.a.createElement("div",{className:"gf-form"},f.a.createElement(h,{width:100,value:t,onChange:this.onAgentIDChange,label:"AgentID",type:"string"}),f.a.createElement(p.Select,{value:r,placeholder:"Select Agent Target",options:n,onChange:this.onAgentTargetChange}))},t}(l.PureComponent);n.d(t,"plugin",(function(){return b}));var b=new r.DataSourcePlugin(c).setConfigEditor(g).setQueryEditor(y)}])}));
//# sourceMappingURL=module.js.map
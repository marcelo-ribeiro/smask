var e={d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{Z:()=>g});const r={d:{test:e=>/\d/.test(e),transform:e=>e},a:{test:e=>/[a-z]/i.test(e),transform:e=>e.toLowerCase()},A:{test:e=>/[a-z]/i.test(e),transform:e=>e.toUpperCase()},w:{test:e=>/\w/.test(e),transform:e=>e.toLowerCase()},W:{test:e=>/\w/.test(e),transform:e=>e.toUpperCase()}},a=(e,t)=>e?(e=e.replace(/\W/gi,""),t?e.slice(0,t.replace(/\W/gi,"").length):e):e,n=(e,t)=>{if(!e||!t)return"";const n=[...a(e,t)],l=[...a(t)];for(let e=0,a=t.length;e<a&&n[e];e++)r[l[e]].test(n[e])?/\W/.test(t[e])?n.splice(e,0,t[e])&&l.splice(e,0,t[e]):n.splice(e,1,r[l[e]].transform(n[e])):n.splice(e,1);return n.join("")},l=(e,t)=>{let r=e.replace(/\D/g,"");return r&&"currency"===t&&(r/=100),r||0},s=(e,t)=>{const r=t.find((e=>"group"===e.type)).value,a=t.find((e=>"decimal"===e.type)).value;let n=e.replaceAll(r,"").replace(a,".");return Number.isNaN(n)?NaN:+n},c=(e,t,{...r}={},a)=>(r={...r,...u(a||"pt-BR")[t]},new Intl.NumberFormat(a,r).format(e)),o=new Map([["en-US","USD"],["pt-BR","BRL"],["fr-CA","CAD"]]),u=e=>({currency:{style:"currency",currency:o.get(e)},decimal:{},percent:{}}),i=(e,t="currency",{...r}={},a)=>c(parseFloat(e),t,r,a),p=e=>new Intl.DateTimeFormat(e).formatToParts(),m="01/01/1970".replace(/\D/g,""),d=(e,t)=>{const r=e.split("/"),{month:a,day:n,year:l}={[p(t)[0].type]:r[0],[p(t)[2].type]:r[1],[p(t)[4].type]:r[2]};return new Date(`${a}/${n}/${l}`)},y=(e,t)=>{if(!Array.isArray(t))throw ReferenceError("Pattern is not array");if(!t)throw ReferenceError("Missing second parameter pattern.");"string"==typeof e&&(e=document.querySelector(e));let[r,a]=t,s=()=>{};switch(e.addEventListener("keydown",(e=>{[32,37,38,39,40].includes(e.keyCode)&&e.preventDefault()})),e.addEventListener("focus",(()=>e.setSelectionRange(-1,-1))),e.addEventListener("click",(()=>e.setSelectionRange(-1,-1))),r){case"currency":s=()=>e.value=i(l(e.value,r),r);break;case"date":{const t=(e=>{let t="";return p(void 0).forEach((({type:e,value:r})=>{"month"===e||"day"===e?t+="dd":"year"===e?t+="dddd":"literal"===e&&(t+=r)})),t})();e.minLength=e.maxLength=t.length,e.pattern=`.{${t.length},${t.length}}`,s=()=>e.value=((e,t,r)=>{const a=d(((e,t)=>n(e,t))((e=>(e=e.replace(/\D/g,""))+m.slice(e.length))(e),t),r);return n(isNaN(a.valueOf())?e.slice(0,-1):e,t)})(e.value,t);break}default:t.sort(((e,t)=>e.length-t.length)),e.minLength=r.length,e.maxLength=a?.length||e.minLength,e.pattern=`.{${r.length},${a?.length||r.length}}`,s=a?()=>e.value=n(e.value,e.value.length<=e.minLength?r:a):()=>e.value=n(e.value,r)}e.value&&s(),e.addEventListener("input",s)},g={mask:n,unmask:a,input:y,prepareMaskInputs:()=>{[...document.querySelectorAll("[data-mask]")].forEach((e=>{return y(e,(t=e.dataset.mask,JSON.parse(t.replace(/'/g,'"'))));var t}))},number:c,currency:i,date:d,unmaskNumber:l,reverseNumberFormat:(e,t)=>{const r=new Intl.NumberFormat(t).formatToParts(1111.1);return s(e,r)},reverseCurrencyFormat:(e,t,r)=>{const a=new Intl.NumberFormat(t,{style:"currency",currency:r}).formatToParts(1111.1),n=a.find((e=>"currency"===e.type)).value,l=e.replace(n,"");return s(l,a)}};var f=t.Z;export{f as default};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFzay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbWFzay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc21hc2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvdW5tYXNrLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL21hc2suanMiLCJ3ZWJwYWNrOi8vc21hc2svLi9zcmMvdW5tYXNrTnVtYmVyLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly9zbWFzay8uL3NyYy9kYXRlLmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3NtYXNrLy4vc3JjL3ByZXBhcmVNYXNrSW5wdXRzLmpzIl0sIm5hbWVzIjpbIl9fd2VicGFja19yZXF1aXJlX18iLCJleHBvcnRzIiwiZGVmaW5pdGlvbiIsImtleSIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJvYmoiLCJwcm9wIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwidG9rZW5zIiwiZCIsInRlc3QiLCJ2IiwidHJhbnNmb3JtIiwiYSIsInRvTG93ZXJDYXNlIiwiQSIsInRvVXBwZXJDYXNlIiwidyIsIlciLCJ1bm1hc2siLCJ2YWx1ZSIsInBhdHRlcm4iLCJyZXBsYWNlIiwic2xpY2UiLCJsZW5ndGgiLCJtYXNrIiwib3V0cHV0IiwidW5tYXNrZWQiLCJpIiwibCIsInNwbGljZSIsImpvaW4iLCJ1bm1hc2tOdW1iZXIiLCJyZXZlcnNlRm9ybWF0IiwicGFydHMiLCJncm91cCIsImZpbmQiLCJwYXJ0IiwidHlwZSIsImRlY2ltYWwiLCJyZXZlcnNlZFZhbCIsInJlcGxhY2VBbGwiLCJOdW1iZXIiLCJpc05hTiIsIk5hTiIsIm51bWJlciIsInN0eWxlIiwib3B0aW9ucyIsImxvY2FsZSIsImdldE9wdGlvbnMiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwiZm9ybWF0IiwiY3VycmVuY3lUb0xvY2FsZSIsIk1hcCIsImN1cnJlbmN5IiwicGVyY2VudCIsInBhcnNlRmxvYXQiLCJkYXRlUGFydHMiLCJEYXRlVGltZUZvcm1hdCIsImZvcm1hdFRvUGFydHMiLCJpbml0aWFsRGF0ZSIsImRhdGUiLCJ2YWx1ZUFycmF5Iiwic3BsaXQiLCJtb250aCIsImRheSIsInllYXIiLCJEYXRlIiwiaW5wdXQiLCJlbGVtZW50IiwicGF0dGVybnMiLCJBcnJheSIsImlzQXJyYXkiLCJSZWZlcmVuY2VFcnJvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImR5bmFtaWNQYXR0ZXJuIiwibGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImluY2x1ZGVzIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0Iiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJnZXREYXRlUGF0dGVybiIsImZvckVhY2giLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJkYXRlT2JqZWN0IiwiZ2V0TWFza2VkRGF0ZSIsImdldENvbXB1dGVkRGF0ZSIsInZhbHVlT2YiLCJtYXNrRGF0ZSIsInNvcnQiLCJiIiwicHJlcGFyZU1hc2tJbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJkYXRhc2V0IiwiSlNPTiIsInBhcnNlIiwicmV2ZXJzZU51bWJlckZvcm1hdCIsInJldmVyc2VDdXJyZW5jeUZvcm1hdCIsInN5bWJvbCJdLCJtYXBwaW5ncyI6IkFBQ0EsSUFBSUEsRUFBc0IsQ0NBMUIsRUFBd0IsQ0FBQ0MsRUFBU0MsS0FDakMsSUFBSSxJQUFJQyxLQUFPRCxFQUNYRixFQUFvQkks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QixTQUFTc0IsaUJBQWlCLGdCQUFnQlgsU0FBU1ksSUFDckQ3QixTQUFNNkIsR0FJZTlFLEVBSks4RSxFQUFHQyxRQUFRMUUsS0FJTjJFLEtBQUtDLE1BQU1qRixFQUFNRSxRQUFRLEtBQU0sUUFBMUMsSUFBQ0YsTURPdkJ5QixPQUFNLEVBQ05VLFNBQVEsRUFDUk8sS0FBSSxFQUNKOUIsYUFBWSxFQUNac0Usb0JMTGlDLENBQUNsRixFQUFPNEIsS0FDekMsTUFBTWQsRUFBUSxJQUFJZ0IsS0FBS0MsYUFBYUgsR0FBUVksY0FBYyxRQUMxRCxPQUFPM0IsRUFBY2IsRUFBT2MsSUtJNUJxRSxzQkxNbUMsQ0FBQ25GLEVBQU80QixFQUFRTyxLQUNuRCxNQUFNckIsRUFBUSxJQUFJZ0IsS0FBS0MsYUFBYUgsRUFBUSxDQUMxQ0YsTUFBTyxXQUNQUyxhQUNDSyxjQUFjLFFBQ1g0QyxFQUFTdEUsRUFBTUUsTUFBTUMsR0FBdUIsYUFBZEEsRUFBS0MsT0FBcUJsQixNQUN4RG9CLEVBQWNwQixFQUFNRSxRQUFRa0YsRUFBUSxJQUMxQyxPQUFPdkUsRUFBY08sRUFBYU4sSyIsImZpbGUiOiJzbWFzay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiZXhwb3J0IGNvbnN0IHRva2VucyA9IHtcbiAgZDogeyB0ZXN0OiAodikgPT4gL1xcZC8udGVzdCh2KSwgdHJhbnNmb3JtOiAodikgPT4gdiB9LFxuICBhOiB7IHRlc3Q6ICh2KSA9PiAvW2Etel0vaS50ZXN0KHYpLCB0cmFuc2Zvcm06ICh2KSA9PiB2LnRvTG93ZXJDYXNlKCkgfSxcbiAgQTogeyB0ZXN0OiAodikgPT4gL1thLXpdL2kudGVzdCh2KSwgdHJhbnNmb3JtOiAodikgPT4gdi50b1VwcGVyQ2FzZSgpIH0sXG4gIHc6IHsgdGVzdDogKHYpID0+IC9cXHcvLnRlc3QodiksIHRyYW5zZm9ybTogKHYpID0+IHYudG9Mb3dlckNhc2UoKSB9LFxuICBXOiB7IHRlc3Q6ICh2KSA9PiAvXFx3Ly50ZXN0KHYpLCB0cmFuc2Zvcm06ICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkgfSxcbn07XG4iLCIvKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtwYXR0ZXJuPVwiXCJdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgdW5tYXNrID0gKHZhbHVlLCBwYXR0ZXJuKSA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiB2YWx1ZTtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFcvZ2ksIFwiXCIpO1xuICByZXR1cm4gcGF0dGVybiA/IHZhbHVlLnNsaWNlKDAsIHBhdHRlcm4ucmVwbGFjZSgvXFxXL2dpLCBcIlwiKS5sZW5ndGgpIDogdmFsdWU7XG59O1xuIiwiaW1wb3J0IHsgdG9rZW5zIH0gZnJvbSBcIi4vdG9rZW5zLmpzXCI7XG5pbXBvcnQgeyB1bm1hc2sgfSBmcm9tIFwiLi91bm1hc2suanNcIjtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgbWFzayA9ICh2YWx1ZSwgcGF0dGVybikgPT4ge1xuICBpZiAoIXZhbHVlIHx8ICFwYXR0ZXJuKSByZXR1cm4gXCJcIjtcbiAgY29uc3Qgb3V0cHV0ID0gWy4uLnVubWFzayh2YWx1ZSwgcGF0dGVybildLFxuICAgIHVubWFza2VkID0gWy4uLnVubWFzayhwYXR0ZXJuKV07XG4gIGZvciAobGV0IGkgPSAwLCBsID0gcGF0dGVybi5sZW5ndGg7IGkgPCBsICYmIG91dHB1dFtpXTsgaSsrKVxuICAgICF0b2tlbnNbdW5tYXNrZWRbaV1dLnRlc3Qob3V0cHV0W2ldKVxuICAgICAgPyBvdXRwdXQuc3BsaWNlKGksIDEpXG4gICAgICA6IC9cXFcvLnRlc3QocGF0dGVybltpXSlcbiAgICAgID8gb3V0cHV0LnNwbGljZShpLCAwLCBwYXR0ZXJuW2ldKSAmJiB1bm1hc2tlZC5zcGxpY2UoaSwgMCwgcGF0dGVybltpXSlcbiAgICAgIDogb3V0cHV0LnNwbGljZShpLCAxLCB0b2tlbnNbdW5tYXNrZWRbaV1dLnRyYW5zZm9ybShvdXRwdXRbaV0pKTtcbiAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpO1xufTtcbiIsIi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhdHRlcm49dW5kZWZpbmVkXVxuICogQHJldHVybnMge3N0cmluZ3xpbnR9XG4gKi9cbmV4cG9ydCBjb25zdCB1bm1hc2tOdW1iZXIgPSAodmFsdWUsIHBhdHRlcm4pID0+IHtcbiAgbGV0IG91dHB1dCA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgaWYgKG91dHB1dCAmJiBcImN1cnJlbmN5XCIgPT09IHBhdHRlcm4pIG91dHB1dCA9IG91dHB1dCAvIDEwMDtcbiAgcmV0dXJuIG91dHB1dCB8fCAwO1xufTtcblxuLyoqXG4gKiBSZXZlcnNlIE51bWJlciBGb3JtYXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJldmVyc2VOdW1iZXJGb3JtYXQgPSAodmFsdWUsIGxvY2FsZSkgPT4ge1xuICBjb25zdCBwYXJ0cyA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUpLmZvcm1hdFRvUGFydHMoMTExMS4xKTtcbiAgcmV0dXJuIHJldmVyc2VGb3JtYXQodmFsdWUsIHBhcnRzKTtcbn07XG5cbi8qKlxuICogUmV2ZXJzZSBDdXJyZW5jeSBGb3JtYXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZVxuICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbmN5XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgcmV2ZXJzZUN1cnJlbmN5Rm9ybWF0ID0gKHZhbHVlLCBsb2NhbGUsIGN1cnJlbmN5KSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3ksXG4gIH0pLmZvcm1hdFRvUGFydHMoMTExMS4xKTtcbiAgY29uc3Qgc3ltYm9sID0gcGFydHMuZmluZCgocGFydCkgPT4gcGFydC50eXBlID09PSBcImN1cnJlbmN5XCIpLnZhbHVlO1xuICBjb25zdCByZXZlcnNlZFZhbCA9IHZhbHVlLnJlcGxhY2Uoc3ltYm9sLCBcIlwiKTtcbiAgcmV0dXJuIHJldmVyc2VGb3JtYXQocmV2ZXJzZWRWYWwsIHBhcnRzKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge2FycmF5fSBwYXJ0c1xuICogQHJldHVybnMge251bWJlcnxudW1iZXJ9XG4gKi9cbmNvbnN0IHJldmVyc2VGb3JtYXQgPSAodmFsdWUsIHBhcnRzKSA9PiB7XG4gIGNvbnN0IGdyb3VwID0gcGFydHMuZmluZCgocGFydCkgPT4gcGFydC50eXBlID09PSBcImdyb3VwXCIpLnZhbHVlO1xuICBjb25zdCBkZWNpbWFsID0gcGFydHMuZmluZCgocGFydCkgPT4gcGFydC50eXBlID09PSBcImRlY2ltYWxcIikudmFsdWU7XG4gIGxldCByZXZlcnNlZFZhbCA9IHZhbHVlLnJlcGxhY2VBbGwoZ3JvdXAsIFwiXCIpLnJlcGxhY2UoZGVjaW1hbCwgXCIuXCIpO1xuICByZXR1cm4gTnVtYmVyLmlzTmFOKHJldmVyc2VkVmFsKSA/IE5hTiA6ICtyZXZlcnNlZFZhbDtcbn07XG4iLCIvKipcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3R5bGVdXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZV1cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBudW1iZXIgPSAodmFsdWUsIHN0eWxlLCB7IC4uLm9wdGlvbnMgfSA9IHt9LCBsb2NhbGUpID0+IHtcbiAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgLi4uZ2V0T3B0aW9ucyhsb2NhbGUgfHwgXCJwdC1CUlwiKVtzdHlsZV0gfTtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG4vKiBUbyBiZSB1cGRhdGVkIGJhc2VkIG9uIG5lZWQgLSBGcmVuY2ggLSBDYW5hZGEgYW5kIFVTIGxvY2FsZSBoYW5kbGVkICAqL1xuY29uc3QgY3VycmVuY3lUb0xvY2FsZSA9IG5ldyBNYXAoW1xuICBbXCJlbi1VU1wiLCBcIlVTRFwiXSxcbiAgW1wicHQtQlJcIiwgXCJCUkxcIl0sXG4gIFtcImZyLUNBXCIsIFwiQ0FEXCJdLFxuXSk7XG5cbmNvbnN0IGdldE9wdGlvbnMgPSAobG9jYWxlKSA9PiAoe1xuICBjdXJyZW5jeToge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IGN1cnJlbmN5VG9Mb2NhbGUuZ2V0KGxvY2FsZSksXG4gIH0sXG4gIGRlY2ltYWw6IHt9LFxuICBwZXJjZW50OiB7fSxcbn0pO1xuIiwiaW1wb3J0IHsgbnVtYmVyIH0gZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8aW50fSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IFtzdHlsZT1cImN1cnJlbmN5XCJdXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZV1cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyZW5jeSA9IChcbiAgdmFsdWUsXG4gIHN0eWxlID0gXCJjdXJyZW5jeVwiLFxuICB7IC4uLm9wdGlvbnMgfSA9IHt9LFxuICBsb2NhbGVcbikgPT4ge1xuICByZXR1cm4gbnVtYmVyKHBhcnNlRmxvYXQodmFsdWUpLCBzdHlsZSwgb3B0aW9ucywgbG9jYWxlKTtcbn07XG4iLCJpbXBvcnQgeyBtYXNrIH0gZnJvbSBcIi4vbWFzay5qc1wiO1xuXG5jb25zdCBkYXRlUGFydHMgPSAobG9jYWxlKSA9PiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUpLmZvcm1hdFRvUGFydHMoKTtcbmNvbnN0IGluaXRpYWxEYXRlID0gXCIwMS8wMS8xOTcwXCIucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuY29uc3QgZ2V0TWFza2VkRGF0ZSA9ICh2YWx1ZSwgcGF0dGVybikgPT4gbWFzayh2YWx1ZSwgcGF0dGVybik7XG5jb25zdCBnZXRDb21wdXRlZERhdGUgPSAodmFsdWUpID0+IHtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gIHJldHVybiB2YWx1ZSArIGluaXRpYWxEYXRlLnNsaWNlKHZhbHVlLmxlbmd0aCk7XG59O1xuXG4vKipcbiAqIEdldCBEYXRlIE1hc2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0dGVyblxuICogQHBhcmFtIHtzdHJpbmd9IFtsb2NhbGU9dW5kZWZpbmVkXVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0gKHZhbHVlLCBwYXR0ZXJuLCBsb2NhbGUgPSB1bmRlZmluZWQpID0+IHtcbiAgY29uc3QgZGF0ZU9iamVjdCA9IGRhdGUoXG4gICAgZ2V0TWFza2VkRGF0ZShnZXRDb21wdXRlZERhdGUodmFsdWUpLCBwYXR0ZXJuKSxcbiAgICBsb2NhbGVcbiAgKTtcbiAgcmV0dXJuIG1hc2soXG4gICAgaXNOYU4oZGF0ZU9iamVjdC52YWx1ZU9mKCkpID8gdmFsdWUuc2xpY2UoMCwgLTEpIDogdmFsdWUsXG4gICAgcGF0dGVyblxuICApO1xufTtcblxuLyoqXG4gKiBHZXQgRGF0ZSBQYXR0ZXJuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2xvY2FsZT11bmRlZmluZWRdXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZ2V0RGF0ZVBhdHRlcm4gPSAobG9jYWxlID0gdW5kZWZpbmVkKSA9PiB7XG4gIGxldCBwYXR0ZXJuID0gXCJcIjtcbiAgZGF0ZVBhcnRzKGxvY2FsZSkuZm9yRWFjaCgoeyB0eXBlLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHR5cGUgPT09IFwibW9udGhcIiB8fCB0eXBlID09PSBcImRheVwiKSBwYXR0ZXJuICs9IFwiZGRcIjtcbiAgICBlbHNlIGlmICh0eXBlID09PSBcInllYXJcIikgcGF0dGVybiArPSBcImRkZGRcIjtcbiAgICBlbHNlIGlmICh0eXBlID09PSBcImxpdGVyYWxcIikgcGF0dGVybiArPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiBwYXR0ZXJuO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbG9jYWxlPXVuZGVmaW5lZF1cbiAqIEByZXR1cm5zIHtEYXRlfVxuICovXG5leHBvcnQgY29uc3QgZGF0ZSA9ICh2YWx1ZSwgbG9jYWxlID0gdW5kZWZpbmVkKSA9PiB7XG4gIGNvbnN0IHZhbHVlQXJyYXkgPSB2YWx1ZS5zcGxpdChcIi9cIik7XG4gIGNvbnN0IHsgbW9udGgsIGRheSwgeWVhciB9ID0ge1xuICAgIFtkYXRlUGFydHMobG9jYWxlKVswXS50eXBlXTogdmFsdWVBcnJheVswXSxcbiAgICBbZGF0ZVBhcnRzKGxvY2FsZSlbMl0udHlwZV06IHZhbHVlQXJyYXlbMV0sXG4gICAgW2RhdGVQYXJ0cyhsb2NhbGUpWzRdLnR5cGVdOiB2YWx1ZUFycmF5WzJdLFxuICB9O1xuICBjb25zdCBkYXRlRm9ybWF0ID0gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGVGb3JtYXQpO1xufTtcbiIsImltcG9ydCB7IG1hc2sgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XG5pbXBvcnQgeyB1bm1hc2tOdW1iZXIgfSBmcm9tIFwiLi91bm1hc2tOdW1iZXIuanNcIjtcbmltcG9ydCB7IGN1cnJlbmN5IH0gZnJvbSBcIi4vY3VycmVuY3kuanNcIjtcbmltcG9ydCB7IGdldERhdGVQYXR0ZXJuLCBtYXNrRGF0ZSB9IGZyb20gXCIuL2RhdGUuanNcIjtcblxuLyoqXG4gKiBtYXNrSW5wdXRcbiAqIEBwYXJhbSB7c3RyaW5nfEhUTUxJbnB1dEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCBTZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdHRlcm5zIGRlY2ltYWx8Y3VycmVuY3lcbiAqL1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gKGVsZW1lbnQsIHBhdHRlcm5zKSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShwYXR0ZXJucykpIHRocm93IFJlZmVyZW5jZUVycm9yKFwiUGF0dGVybiBpcyBub3QgYXJyYXlcIik7XG4gIGlmICghcGF0dGVybnMpIHRocm93IFJlZmVyZW5jZUVycm9yKFwiTWlzc2luZyBzZWNvbmQgcGFyYW1ldGVyIHBhdHRlcm4uXCIpO1xuXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gIGxldCBbcGF0dGVybiwgZHluYW1pY1BhdHRlcm5dID0gcGF0dGVybnM7XG4gIGxldCBsaXN0ZW5lciA9ICgpID0+IHt9O1xuXG4gIC8vIERpc2FibGUgaW5wdXQga2V5Ym9hcmQgYXJyb3cgYW5kIHBvaW50IGNsaWNrXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICBbMzIsIDM3LCAzOCwgMzksIDQwXS5pbmNsdWRlcyhlLmtleUNvZGUpICYmIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsICgpID0+IGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoLTEsIC0xKSk7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoLTEsIC0xKSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBpbnB1dCBsaXN0ZW5lciBieSBtYXNrXG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJjdXJyZW5jeVwiOiB7XG4gICAgICBsaXN0ZW5lciA9ICgpID0+XG4gICAgICAgIChlbGVtZW50LnZhbHVlID0gY3VycmVuY3koXG4gICAgICAgICAgdW5tYXNrTnVtYmVyKGVsZW1lbnQudmFsdWUsIHBhdHRlcm4pLFxuICAgICAgICAgIHBhdHRlcm5cbiAgICAgICAgKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcImRhdGVcIjoge1xuICAgICAgY29uc3QgcGF0dGVybiA9IGdldERhdGVQYXR0ZXJuKCk7XG4gICAgICBlbGVtZW50Lm1pbkxlbmd0aCA9IGVsZW1lbnQubWF4TGVuZ3RoID0gcGF0dGVybi5sZW5ndGg7XG4gICAgICBlbGVtZW50LnBhdHRlcm4gPSBgLnske3BhdHRlcm4ubGVuZ3RofSwke3BhdHRlcm4ubGVuZ3RofX1gO1xuICAgICAgbGlzdGVuZXIgPSAoKSA9PiAoZWxlbWVudC52YWx1ZSA9IG1hc2tEYXRlKGVsZW1lbnQudmFsdWUsIHBhdHRlcm4pKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBwYXR0ZXJucy5zb3J0KChhLCBiKSA9PiBhLmxlbmd0aCAtIGIubGVuZ3RoKTtcbiAgICAgIGVsZW1lbnQubWluTGVuZ3RoID0gcGF0dGVybi5sZW5ndGg7XG4gICAgICBlbGVtZW50Lm1heExlbmd0aCA9IGR5bmFtaWNQYXR0ZXJuPy5sZW5ndGggfHwgZWxlbWVudC5taW5MZW5ndGg7XG4gICAgICBlbGVtZW50LnBhdHRlcm4gPSBgLnske3BhdHRlcm4ubGVuZ3RofSwke1xuICAgICAgICBkeW5hbWljUGF0dGVybj8ubGVuZ3RoIHx8IHBhdHRlcm4ubGVuZ3RoXG4gICAgICB9fWA7XG4gICAgICBsaXN0ZW5lciA9IGR5bmFtaWNQYXR0ZXJuXG4gICAgICAgID8gKCkgPT5cbiAgICAgICAgICAgIChlbGVtZW50LnZhbHVlID0gbWFzayhcbiAgICAgICAgICAgICAgZWxlbWVudC52YWx1ZSxcbiAgICAgICAgICAgICAgZWxlbWVudC52YWx1ZS5sZW5ndGggPD0gZWxlbWVudC5taW5MZW5ndGhcbiAgICAgICAgICAgICAgICA/IHBhdHRlcm5cbiAgICAgICAgICAgICAgICA6IGR5bmFtaWNQYXR0ZXJuXG4gICAgICAgICAgICApKVxuICAgICAgICA6ICgpID0+IChlbGVtZW50LnZhbHVlID0gbWFzayhlbGVtZW50LnZhbHVlLCBwYXR0ZXJuKSk7XG4gICAgfVxuICB9XG4gIGVsZW1lbnQudmFsdWUgJiYgbGlzdGVuZXIoKTtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgbGlzdGVuZXIpO1xufTtcbiIsImltcG9ydCB7IG1hc2sgfSBmcm9tIFwiLi9tYXNrLmpzXCI7XG5pbXBvcnQgeyB1bm1hc2sgfSBmcm9tIFwiLi91bm1hc2suanNcIjtcbmltcG9ydCB7IGlucHV0IH0gZnJvbSBcIi4vaW5wdXQuanNcIjtcbmltcG9ydCB7IHByZXBhcmVNYXNrSW5wdXRzIH0gZnJvbSBcIi4vcHJlcGFyZU1hc2tJbnB1dHMuanNcIjtcbmltcG9ydCB7XG4gIHVubWFza051bWJlcixcbiAgcmV2ZXJzZU51bWJlckZvcm1hdCxcbiAgcmV2ZXJzZUN1cnJlbmN5Rm9ybWF0LFxufSBmcm9tIFwiLi91bm1hc2tOdW1iZXIuanNcIjtcbmltcG9ydCB7IGRhdGUgfSBmcm9tIFwiLi9kYXRlLmpzXCI7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCB7IGN1cnJlbmN5IH0gZnJvbSBcIi4vY3VycmVuY3kuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtYXNrLFxuICB1bm1hc2ssXG4gIGlucHV0LFxuICBwcmVwYXJlTWFza0lucHV0cyxcbiAgbnVtYmVyLFxuICBjdXJyZW5jeSxcbiAgZGF0ZSxcbiAgdW5tYXNrTnVtYmVyLFxuICByZXZlcnNlTnVtYmVyRm9ybWF0LFxuICByZXZlcnNlQ3VycmVuY3lGb3JtYXQsXG59O1xuIiwiaW1wb3J0IHsgaW5wdXQgfSBmcm9tIFwiLi9pbnB1dC5qc1wiO1xuXG4vKipcbiAqIE1hc2sgYWxsIGlucHV0cyB3aGF0IGhhdmUgZGF0YS1pbmRleCBhdHRyaWJ1dGVcbiAqL1xuZXhwb3J0IGNvbnN0IHByZXBhcmVNYXNrSW5wdXRzID0gKCkgPT4ge1xuICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW1hc2tdXCIpXS5mb3JFYWNoKChlbCkgPT5cbiAgICBpbnB1dChlbCwgZGF0YXNldFRvT2JqZWN0KGVsLmRhdGFzZXQubWFzaykpXG4gICk7XG59O1xuXG5jb25zdCBkYXRhc2V0VG9PYmplY3QgPSAodmFsdWUpID0+IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvJy9nLCAnXCInKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9
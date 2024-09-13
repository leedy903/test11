import assert from "assert";
import { ArrayList } from "./ex10";
console.log("🚀  ArrayList:", ArrayList);

// 여기에 테스트코드를 작성하세요.
const alist = new ArrayList<number>([1, 2]);

console.log(alist.add(3));
console.log(alist.add(5, 1));
console.log(alist.remove(2));
console.log(alist.add(22, 1));
console.log(alist.add(33, 1));
console.log(alist.toString());
console.log(alist.set(1, 300));
console.log(alist.get(2));
console.log(alist.size());
console.log(alist.indexOf(300));
console.log(alist.contains(300));
console.log(alist.contains(301));
console.log(alist.isEmpty());
console.log(alist.peek());
console.log(alist.toArray());
console.log(alist.iterator().next());
console.log(alist.clear());

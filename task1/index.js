function atomsCount(code) {
  code = code.match(/[A-Z][a-z]*|\d+|[()]/g);
  let recur = {};
  let stack = [];

  for (let a = 0; a < code.length; a++) {
    if (code[a] == "(") {
      stack.push(recur);
      recur = {};
    } else if (code[a].match(/^\d+$/)) {
      // digits
      if (code[a - 1] == ")") {
        for (const p in recur) {
          recur[p] *= +code[a];
        }
        let last = stack.pop();
        for (const p in last) {
          recur[p] = recur[p] + last[p] || last[p];
        }
      } else {
        // because we added 1 to code[a-1]
        recur[code[a - 1]] += +code[a] - 1;
      }
    } else if (code[a] != ")") {
      recur[code[a]] = recur[code[a]] + 1 || 1;
    }
  }
  let ans = "";
  Object.keys(recur)
    .sort((ab, cd) => ab.localeCompare(cd))
    .map((p) => {
      ans += `${p}${recur[p] > 1 ? recur[p] : ""}`;
    });
  return ans;
}
console.log(atomsCount("K4(ON(SO3)2)2"));
console.log(atomsCount("Mg(OH)2"));

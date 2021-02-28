// CHANLLENGE 1 SOLUTION

function countOfAtoms(formula) {
  formula = formula.match(/[A-Z][a-z]*|\d+|[()]/g);
  let recur = {};
  let stack = [];

  for (let a = 0; a < formula.length; a++) {
    if (formula == '(') {
      stack.push(recur);
      recur = {};
    } else if (formula[a].match(/^\d+$/)) {
      // digits
      if (formula[a - 1] == ')') {
        for (const p in recur) {
          recur[p] *= +formula[a];
        }
        let last = stack.pop();
        for (const p in last) {
          recur[p] = recur[p] + last[p] || last[p];
        }
      } else {
        // because we added 1 to formula[a-1]
        recur[formula[a - 1]] += +formula[a] - 1;
      }
    } else if (formula[a] != ')') {
      recur[formula[a]] = recur[formula[a]] + 1 || 1;
    }
  }
  let ans = '';
  Object.keys(recur)
    .sort((ab, cd) => ab.localeCompare(cd))
    .map((p) => {
      ans += `${p}${recur[p] > 1 ? recur[p] : ''}`;
    });
  return ans;
}

console.log(countOfAtoms('K4(ON(SO3)2)2'));
console.log(countOfAtoms('Mg(OH)2'));

// CHANLLENGE 2 SOLUTION

(A = []), (B = []);

(A[0] = 4), (B[0] = 0);
(A[1] = 3), (B[1] = 1);
(A[2] = 2), (B[2] = 0);
(A[3] = 1), (B[3] = 0);
(A[4] = 5), (B[4] = 0);

function solution(A, B) {
  let downStream = [];
  let upStream = [];
  let direction;

  for (let i = 0; i < A.length; i++) {
    direction = B[i];

    if (direction === 0) {
      while (downStream.length > 0) {
        let d = downStream.pop();

        if (d > A[i]) {
          downStream.push(d);
          break;
        }
      }

      if (downStream.length === 0) {
        upStream.push(A[i]);
      }
    } else {
      downStream.push(A[i]);
    }
  }

  return downStream.length + upStream.length;
}
console.log(solution(A, B));

// CHANLLENGE 3 SOLUTION

function solution3(N, A) {
  assert(N >= 1 || N <= 100000, 'N is less than 1 or greater than 100,000');

  let result = [...A].sort(function (a, b) {
    return a - b;
  });

  assert(
    result[0] >= 1 && result[A.length - 1] <= N + 1,
    'one or more elements of A is less than 1 or greater than N + 1'
  );

  let X = new Array(N).fill(0);

  for (let i = 0; i < A.length; i++) {
    if (A[i] <= N && A[i] >= 1) {
      //increase X
      X[A[i] - 1] += 1;
      /* console.log(X) */
    } else if (A[i] == N + 1) {
      let max = Math.max(...X);
      X.fill(max);
      /* console.log(X) */
    }
  }

  return X;
}

console.log(solution3(5, [3, 4, 4, 6, 1, 4, 4]));

// CHANLLENGE 4  SOLUTION

function jump(nums) {
  let len = nums.length;

  if (len < 2) {
    return 0;
  }

  let now = nums[0];
  let step = 1;
  let max = nums[0];
  for (let i = 1; i < len; i++) {
    if (max < i) {
      step++;
      max = now;
    }
    now = Math.max(now, i + nums[i]);
  }
  return step;
}

console.log(jump([2, 3, 1, 1, 4]));

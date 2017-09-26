/**
 * Problem solution for Task Scheduler problem on LeetCode.
 * Description: https://leetcode.com/problems/task-scheduler/
**/

function reheap(order) {
  var ind = 0;
  if (order[0].count < order[ind+1].count) {
    while (order[0].count < order[ind+1].count) {
      ind++;
      if (ind+1 > order.length - 1) {
        break;
      }
    }
    var { name, count } = order[0];
    order[0].name = order[1].name;
    order[0].count = order[1].count;
    order[1].name = order[ind].name;
    order[1].count = order[ind].count;
    order[ind].name = name;
    order[ind].count = count;
  }
}

function findSlot(schedule, position, n) {
  position = position + n + 1;
  while (schedule[position]) {
    position++;
  }
  return position;
}

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks_arr, n) {
  var schedule = []; // final schedule answer.

  /* Generating a count of each task */
  var alphabet = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
  var tasks = { };
  var order = [];
  var totalTasks = 0;
  const initialPosition = -1 * n - 1;
  alphabet.split("").forEach((letter) => {
    tasks[letter] = {
      count: 0,
      position: initialPosition
    };
  });
  tasks_arr.forEach((task) => {
    totalTasks++;
    tasks[task].count++;
  })

  // establish max heap for remaining tasks
  for (task in tasks) {
    order.push({ name: task, count: tasks[task].count })
  }
  order = order.sort((a, b) => b.count - a.count);

  while(totalTasks > 0) {
    var taskName = order[0].name; // most busy task
    var task = tasks[taskName];
    var newPosition = findSlot(schedule, task.position, n);
    schedule[newPosition] = taskName;
    task.position = newPosition;
    order[0].count--;
    reheap(order);
    totalTasks--;
  }

  return schedule.length;
};


var input = [];
var alphabet = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';
for (var i = 0; i < 1000000; i++) {
  input.push(alphabet[Math.floor(Math.random() * 24)]);
}


// try {
//
// }
// catch(err) {
//
// }

console.time('leastInterval');
leastInterval(input, 5);
console.timeEnd('leastInterval');

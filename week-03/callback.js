function doJob(job, time, cb) {
  setTimeout(() => {
    // 在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
    let now = new Date();
    cb(`完成工作 ${job} at ${now.toISOString()}`);
  }, time);
}

// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
let now = new Date(); // Get the current time at the beginning
console.log(`開始工作 at ${now.toISOString()}`);

doJob("刷牙", 1000, function (data) {
  // Call the first job (刷牙)
  console.log(data); // Log 刷牙

  doJob("吃早餐", 3000, function (data) {
    // Call the second job (吃早餐) after 刷牙 is done
    console.log(data); // Log 吃早餐

    doJob("寫功課", 1000, function (data) {
      // Call the third job (寫功課) after 吃早餐 is done
      console.log(data); //Log 寫功課

      doJob("吃午餐", 2000, function (data) {
        // Cal the fourth job (吃午餐) after 寫功課 is done
        console.log(data); //Log 吃午餐
      });
    });
  });
});

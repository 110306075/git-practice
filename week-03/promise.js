function doJob(job, time) {
  // Return a Promise that resolves after the specified time
  return new Promise((resolve) => {
    setTimeout(() => {
      let now = new Date();
      // Resolve the promise with the job and current time
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, time);
  });
}

async function executeJobs() {
  let now = new Date(); // Get the current time at the beginning
  console.log(`開始工作 at ${now.toISOString()}`);

  // Wait for the 刷牙 before moving to the next job
  const brush = await doJob("刷牙", 1000);
  console.log(brush); // Log 刷牙

  // Wait for the 吃早餐 before moving to the next job
  const breakfast = await doJob("吃早餐", 3000);
  console.log(breakfast); // Log 吃早餐

  // Wait for the 寫功課 before moving to the next job
  const homework = await doJob("寫功課", 1000);
  console.log(homework); // Log 寫功課

  // Wait for the t 吃午餐 before moving to the next job
  const lunch = await doJob("吃午餐", 2000);
  console.log(lunch); // Log 吃午餐
}

executeJobs();

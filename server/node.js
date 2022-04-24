const { spawn, exec } = require("child_process");

const { once } = require("events"); // Added in Node 11.13.0

async function predict(
  dep_date_time,
  arr_date_time,
  stops,
  airline,
  source,
  destination
) {
  const py = spawn("python3", [
    // "-m",
    "../ai/flight_price/flight_price.py",
    "--dep_date_time=" + dep_date_time,
    "--arr_date_time=" + arr_date_time,
    "--stops=" + stops,
    "--airline=" + airline,
    "--source=" + source,
    "--destination=" + destination,
    // "--debug",
  ]);
  output = "";

  py.stdin.setEncoding = "utf-8";

  py.stdout.on("data", (data) => {
    output += data.toString();
    // console.log("output was generated: " + output);
  });
  // Handle error output
  py.stderr.on("data", (data) => {
    // As said before, convert the Uint8Array to a readable string.
    // console.log("error:" + data);
  });
  py.stdout.on("end", async function (code) {
    // console.log("output: " + output);
    // console.log(`Exit code is: ${code}`);
  });

  await once(py, "close");

  console.log("output: " + output);
  return output;
}

// const process = spawn("python3", [
//   // "-m",
//   "../ai/flight_price/flight_price.py",
//   "--dep_date_time=2022-07-12T19:30",
//   "--arr_date_time=2022-07-12T20:30",
//   "--stops=1",
//   "--airline=IndiGo",
//   "--source=Chennai",
//   "--destination=Hyderabad",
//   // "--debug",
// ]);

// process.on("close", (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// process.stdout.on("data", (data) => {
//   console.log(`${Number(data)}`);
// });

// process.stderr.on("data", (data) => {
//   console.log(`stderr: ${data}`);
// });

// const predict = async (req, res) => {
//   // const { dep_date_time, arr_date_time, stops, airline, source, destination } =
//   //   req.body;

//   // const child = exec("python3", [
//   //   "-m",
//   //   "flight_price",
//   //   "--dep_date_time=" + dep_date_time,
//   //   "--arr_date_time=" + arr_date_time,
//   //   "--stops=" + stops,
//   //   "--airline=" + airline,
//   //   "--source=" + source,
//   //   "--destination=" + destination,
//   //   // "--debug",
//   // ]);

//   const child = spawn("python3", [
//     // "-m",
//     "../ai/flight_price/flight_price.py",
//     "--dep_date_time=2022-07-12T19:30",
//     "--arr_date_time=2022-07-12T20:30",
//     "--stops=1",
//     "--airline=IndiGo",
//     "--source=Chennai",
//     "--destination=Hyderabad",
//     // "--debug",
//   ]);

//   child.stdout.removeAllListeners("data");
//   child.stderr.removeAllListeners("data");
//   child.stdout.pipe(process.stdout);
//   child.stderr.pipe(process.stderr);

//   child.on("end", (code) => {
//     console.log(`child process exited with code ${code}`);

//     // res.status(200).json({
//     //   status: "success",
//     //   data: {
//     //     price: Number(data),
//     //   },
//     // });
//     // return data;
//   });
// };

predict(
  "2022-07-12T19:30",
  "2022-07-12T20:30",
  "1",
  "IndiGo",
  "Chennai",
  "Hyderabad"
);

// module.exports = {
//   predict,
// };

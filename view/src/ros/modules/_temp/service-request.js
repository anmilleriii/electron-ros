// import rclnodejs from "rclnodejs";

// function serviceRequest(socket, { status }) {
//   const node = rclnodejs.createNode("service_client");

//   const client = node.createClient(
//     "std_srvs/srv/SetBool",
//     `/checkpoint_heartbeat_leader/set_${status}`
//   );
//   const request = {
//     data: true,
//   };

//   client.waitForService(1000).then((result) => {
//     if (!result) {
//       console.log("Error: service not available");
//       return;
//     }
//     console.log(`Sending: ${typeof request}`, request);
//     client.sendRequest(request, (response) => {
//       console.log(`Result: ${typeof response}`, response);
//     });
//   });

//   rclnodejs.spin(node);
// }

// export default serviceRequest;

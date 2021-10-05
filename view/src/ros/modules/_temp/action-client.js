// // action.js
// const rclnodejs = require("rclnodejs");

// // Specific Action definition for the Mower
// const MowerAction = rclnodejs.require("mystique_server_interfaces/action/Mystique");

// // Generic status messages for goals
// const GoalStatus = rclnodejs.require("action_msgs/msg/GoalStatus");

// // ActionClient
// class MowerActionClient {
//   // Each new MowerActionClient instance has _node & _actionClient
//   constructor(node) {
//     this._node = node;
//     this._actionClient = new rclnodejs.ActionClient(
//       node,
//       // TODO
//       "mystique_server_interfaces/action/Mystique", //
//       "recording", //? recording TODO poorly named
//     );
//     this._requestType = null;
//     this._goalHandler = null;
//     this._cancelAction = this.cancelGoalCallback;
//   }

//   //setter for the request type.
//   set requestType(requestType) {
//     this._requestType = requestType;
//   }

//   // Send the goal
//   async sendGoal() {
//     this._node.getLogger().info("Waiting for MowerActionServer...");
//     await this._actionClient.waitForServer();
//     const goal = new MowerAction.Goal();

//     // 0 / 1 / 2 enum of
//     // PAUSE / RECORD / PLAY
//     goal.action = this._requestType;
//     this._node.getLogger().info("Sending goal request...");

//     // Send goal and get feedback, promise waits for accepted
//     this._goalHandler = await this._actionClient.sendGoal(goal, (feedback) => {
//       this.feedbackCallback(feedback);
//     });

//     //checks to see if the goal has been rejected or accepted.
//     if (!this._goalHandler.accepted) {
//       this._node.getLogger().info("Goal rejected");
//       return;
//     }
//     this._node.getLogger().info("Goal accepted");

//     const result = await this._goalHandler.getResult();
//     const status = result.status;

//     if (status === GoalStatus.STATUS_SUCCEEDED) {
//       // TODO result from message
//       // this._node.getLogger().info(`Goal succeeded with result: ${result.result.status}`)
//     } else {
//       // TODO
//       this._node.getLogger().info(`Goal filed with status: ${status}`);
//     }
//   }

//   // Listen for feedback
//   // TODO
//   feedbackCallback(feedbackMessage) {
//     this._node.getLogger().info(`Received feedback: ${feedbackMessage.feedback.sequence}`);
//   }

//   //Sending the cancel goal to the action server
//   async cancelGoalCallback() {
//     this._node.getLogger().info("Canceling goal");
//     const response = await this._goalHandler.cancelGoal();

//     //checks to see if the gaol was canceled or not
//     if (response.goals_canceling.length > 0) {
//       this._node.getLogger().info("Goal successfully canceled");
//     } else {
//       this._node.getLogger().info("Goal failed to cancel");
//     }
//   }
// }

// module.exports = MowerActionClient;

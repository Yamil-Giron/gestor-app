const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteProject = functions.https.onCall(async (data) => {
  const { id } = data || {};
  if (!id) throw new functions.https.HttpsError("invalid-argument", "Falta ID");
  await admin.firestore().collection("projects").doc(id).delete();
  return { ok: true };
});

exports.deleteTask = functions.https.onCall(async (data) => {
  const { id } = data || {};
  if (!id) throw new functions.https.HttpsError("invalid-argument", "Falta ID");
  await admin.firestore().collection("tasks").doc(id).delete();
  return { ok: true };
});

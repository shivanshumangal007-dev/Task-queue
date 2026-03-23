import express from "express";
import { addTaskToQueue, getTaskInfo } from "./redisclient.js";
import { v4 as uuidv4 } from "uuid";
const app = express();
app.get("/", (req, res) => {
	res.json({ message: "Hello World!" });
});
class task {
	constructor(taskType, payload = {}) {
		this.task_id = uuidv4();
		this.task_type = taskType;
		this.payload = payload;
		this.created_at = new Date().toISOString();
		this.status = "";
	}
}
app.post("/tasks", (req, res) => {
	try {
		const { task_type, payload } = req.body;
		if (!task_type) {
			return res
				.status(400)
				.json({ message: "Task name and payload are required!" });
		}
		if (payload && typeof payload !== "object") {
			return res.status(400).json({ message: "Payload must be an object!" });
		}
		!payload && (payload = {});
		const t = new task(task_type, payload);
		addTaskToQueue(t, "task_queue");
		res.json({ message: "Task created!" });
	} catch (err) {
		console.error("Error adding task to queue:", err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

app.get("/task/:id", (req, res) => {
	const { id } = req.params;
	getTaskInfo(id)
		.then((task) => {
			if (task) {
				res.json(task);
			} else {
				res.status(404).json({ message: "Task not found!" });
			}
		})
		.catch((err) => {
			console.error("Error fetching task info:", err);
			res.status(500).json({ message: "Internal Server Error" });
		});
});

// {
//     "task_type" : "send_email",
//     "payload" : {
//         "to" : "shivanshu@gmail.com",
//         "regards" : "shivanshu",
//         "subject" : "Hello from Task Queue!"
//     }
// }

// Example tasks for testing:
// 1. Send Email
// {
//     "task_type": "send_email",
//     "payload": {
//         "to": "user@example.com",
//         "subject": "Welcome!",
//         "body": "Welcome to our platform"
//     }
// }

// 2. Generate Report
// {
//     "task_type": "generate_report",
//     "payload": {
//         "report_type": "monthly",
//         "month": "January",
//         "format": "pdf"
//     }
// }

// 3. Process Image
// {
//     "task_type": "process_image",
//     "payload": {
//         "image_url": "https://example.com/image.jpg",
//         "filters": ["blur", "grayscale"]
//     }
// }

// 4. Send SMS
// {
//     "task_type": "send_sms",
//     "payload": {
//         "phone": "+1234567890",
//         "message": "Your OTP is 1234"
//     }
// }

// 5. Database Backup
// {
//     "task_type": "database_backup",
//     "payload": {
//         "database": "main_db",
//         "backup_type": "full"
//     }
// }

// 6. Send Notification
// {
//     "task_type": "send_notification",
//     "payload": {
//         "user_id": "123",
//         "title": "New Message",
//         "message": "You have a new message"
//     }
// }

// 7. Video Transcoding
// {
//     "task_type": "video_transcode",
//     "payload": {
//         "video_id": "vid_456",
//         "output_format": "mp4",
//         "quality": "720p"
//     }
// }

// 8. Clean Cache
// {
//     "task_type": "clean_cache",
//     "payload": {
//         "cache_type": "redis",
//         "pattern": "user:*"
//     }
// }

// 9. Send Webhook
// {
//     "task_type": "send_webhook",
//     "payload": {
//         "url": "https://webhook.example.com/callback",
//         "event": "order_completed",
//         "data": {"order_id": "789"}
//     }
// }

// 10. Schedule Meeting
// {
//     "task_type": "schedule_meeting",
//     "payload": {
//         "title": "Team Standup",
//         "time": "2024-01-15T10:00:00Z",
//         "participants": ["user1@example.com", "user2@example.com"]
//     }
// }
export default app;

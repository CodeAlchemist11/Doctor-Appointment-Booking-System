const Notification = require("../models/Notification");

// Get all notifications for logged-in user
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user._id,
        })
            .populate("sender", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        // Ensure the notification belongs to the logged-in user
        if (notification.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notification,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getMyNotifications,
    markAsRead,
};
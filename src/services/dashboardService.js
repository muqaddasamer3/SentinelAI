import api from "../api/api";

export async function getDashboardStats() {
    const [
        cameras,
        persons,
        trackingLogs,
        incidents,
        alerts,
    ] = await Promise.all([
        api.get("/cameras/"),
        api.get("/persons/"),
        api.get("/tracking-logs/"),
        api.get("/incidents/"),
        api.get("/alerts/"),
    ]);

    return {
        cameras: cameras.data.length,
        persons: persons.data.length,
        trackingLogs: trackingLogs.data.length,
        incidents: incidents.data.length,
        alerts: alerts.data.length,
    };
}
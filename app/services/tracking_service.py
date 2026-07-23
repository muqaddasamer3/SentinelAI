tracking_logs = []


def save_tracking(data):

    tracking_logs.append(data)

    return {
        "message": "Tracking stored successfully"
    }


def get_tracking():

    return tracking_logs
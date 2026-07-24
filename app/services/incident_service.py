incidents = []


def save_incident(data):

    incidents.append(data)

    return {
        "message": "Incident saved successfully"
    }


def get_incidents():

    return incidents
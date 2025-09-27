from pymongo import MongoClient

# ----------------------------
# Connect to Mongo
# ----------------------------
client = MongoClient("mongodb://localhost:27017/")
db = client["agenda_db"]
sessions_col = db["sessions"]
ratings_col = db["ratings"]

# ----------------------------
# Helpers
# ----------------------------
def avg_rating(rating_list):
    return sum(rating_list) / len(rating_list) if rating_list else 0.0

def rebalance():
    # Get all sessions
    sessions = list(sessions_col.find({}, {"_id": 1, "title": 1, "slot": 1}))
    sessions.sort(key=lambda s: s["slot"])  # ensure order

    # Get ratings for first 3 sessions
    ratings_data = {r["session_id"]: r["ratings"] for r in ratings_col.find({})}

    for s in sessions:
        s["avg_rating"] = avg_rating(ratings_data.get(s["_id"], []))

    # First 3 fixed
    fixed = sessions[:3]
    rest = sessions[3:]

    # Dynamic reorder for rest: if first 3 avg < 3, push lighter topics earlier
    avg_first_three = sum(s["avg_rating"] for s in fixed) / 3
    if avg_first_three < 3:
        rest.sort(key=lambda s: s["title"])  # simple fallback sort by name
    else:
        rest.sort(key=lambda s: -s["slot"])  # reverse order (deep topics later)

    # Assign new slots
    for i, s in enumerate(rest, start=4):
        s["slot"] = i

    return fixed + rest


# ----------------------------
# Run Demo
# ----------------------------
if __name__ == "__main__":
    print("=== Agenda Before Rebalance ===")
    for s in sessions_col.find({}).sort("slot", 1):
        print(f"Slot {s['slot']}: {s['title']}")

    new_schedule = rebalance()

    print("\n=== Agenda After Rebalance ===")
    for s in new_schedule:
        print(f"Slot {s['slot']}: {s['title']} (avg={s['avg_rating']:.2f})")

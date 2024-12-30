Arsenal = {
    "Colours": {
        "Primary": "#FFFFFF",
        "Secondary": "#FFFFFF",
        "Tertiary": "#FFFFFF",
    },
    "Information": {
        "Icon": "xxx",
        "Recent_Transfers": {
            "In": ["PlayerOne", "PlayerTwo"],
            "Out": ["PlayerFour"]
        },
        "Current_Injuries": {
            "Injured": ["PlayerNine"]
        },
        "Current_Suspensions": {
            "Suspended": ["PlayerFive"]
        }
    },
    "Statistics": {
        "Total_Wins": 10,
        "Total_Losses": 2,
        "Total_Draws": 1,
        "Goals_Scored": 30,
        "Goals_Conceded": 8,
        "Average_xG": 1.2,
        "Average_xGA": 0.7,
        "Average_Possession": 55.6,
        "Won_Previous_Match": True
    }
}

# Print Average_xG
print("Average xG:", Arsenal["Statistics"]["Average_xG"])

# Print Currently Injured players
print("Currently Injured players:", Arsenal["Information"]["Current_Injuries"]["Injured"])

# Print Recent Transfers Out
print("Recent Transfers Out:", Arsenal["Information"]["Recent_Transfers"]["Out"])

# Print Icon
print("Icon:", Arsenal["Information"]["Icon"])

# Print all statistical information
print("All Statistical Information:")
for key, value in Arsenal["Statistics"].items():
    print(f"{key}: {value}")

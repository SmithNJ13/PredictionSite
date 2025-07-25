// const axios = require("axios")
// const cheerio = require("cheerio")

const Teams = () => {
    class Team {
        constructor(colours, information, statistics) {
            this.colours = colours,
            this.information = information,
            this.statistics = statistics
        }
    }
    const teams = {}
    teams["Arsenal"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Aston Villa"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Bournemouth"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Brentford"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Brighton"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Leicester City"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Chelsea"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Crystal Palace"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Everton"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Fulham"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Newcastle United"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Liverpool"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Manchester City"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Manchester United"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Ipswich Town"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Nottingham Forest"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Southampton"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Tottenham"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["West Ham"] = new Team({
        primary: "blue",
        secondary: "black",
        tertiary: "cyan"
    },
    {
        icon: "chelsea.icon",
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })
    teams["Wolves"] = new Team({
        primary: "red",
        secondary: "white",
        tertiary: "gold"
    },  
    {
        icon: "arsenal.icon", 
        transfers: {
            in: ["playerName"],
            out: ["playerName"]
        },
        injuries: ["playerName", "playerName"],
        suspensions: ["playerName"]
    },
    {
        wins: 13,
        draws: 6,
        losses: 4,
        goals_scored: 37,
        goals_conceded: 18,
        average_XG: 1.6,
        average_XGA: 0.9
    })

    return teams
}
Teams()

module.exports = Teams
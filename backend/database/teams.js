// const axios = require("axios")
// const cheerio = require("cheerio")

const SeasonalTeams = () => {
    class Season {
        constructor(year, teams = []) {
            this.year = year,
            this.teams = teams
        }
        addTeam(team) {
            this.teams.push(team)
        }
    }

    class Team {
        constructor(colours, information, statistics) {
            this.colours = colours,
            this.information = information,
            this.statistics = statistics
        }
    }

    class SeasonFactory {
        constructor() {
            this.seasons = []
        }
        addSeason(year, teamsData = []) {
            const teams = {}
            for (const [name, data] of Object.entries(teamsData)) {
                teams[name] = new Team(data.colours, data.information, data.statistics)
            }
            const season = new Season(year, teams)
            this.seasons.push(season)
            return season
        }
        clone(prev, current, {remove = [], add = {}} = {}) {
            const prevSeason = this.getSeason(prev)
            if(!prevSeason) throw new Error("Season not found.")

            const clones = JSON.parse(JSON.stringify(prevSeason.teams))
            remove.forEach(team => delete clones[team])
            for (const [name, data] of Object.entries(add)) {
                clones[name] = new Team(data.colours, data.information, data.statistics)
            }

            return this.addSeason(current, clones)
        }
        getSeason(year) {
            return this.seasons.find(season => season.year === year)
        } 
    }
    return {
        Season,
        Team,
        SeasonFactory
    }
}

const {SeasonFactory} = SeasonalTeams()
const factory = new SeasonFactory()
const teams24 = {
"Liverpool": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Arsenal": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Manchester City": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Chelsea": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Newcastle United": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Aston Villa": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Nottingham Forest": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Brighton": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Bournemouth": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Brentford": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Fulham": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Crystal Palace": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Everton": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"West Ham": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Manchester United": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Wolves": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Tottenham": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Leicester City": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Ipswich Town": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}},
"Southampton": {
    "colours": {primary: "Red", secondary: "White", tertiary: "Gold"},
    "information": {icon: "arsenal.icon", injuries: "None", suspensions: "None"},
    "statistics": {wins: 0, draws: 0, losses: 0}}
}
factory.addSeason(2024, teams24)
factory.clone(2024, 2025, {
    remove: ["Leicester City", "Ipswich Town", "Southampton"],
    add: {
        "Leeds United": {
            colours: {primary: "Black", secondary: "Beige", tertiary: "Silver"},
            information: {icon: "icon.ico", injuries: "none", suspensions: "none"},
            statistics: {wins: 0, draws: 10, losses: 5}
        },
        "Burnley": {
            colours: {primary: "Black", secondary: "Beige", tertiary: "Silver"},
            information: {icon: "icon.ico", injuries: "none", suspensions: "none"},
            statistics: {wins: 0, draws: 10, losses: 5}
        },
        "Sunderland": {
            colours: {primary: "Black", secondary: "Beige", tertiary: "Silver"},
            information: {icon: "icon.ico", injuries: "none", suspensions: "none"},
            statistics: {wins: 0, draws: 10, losses: 5}
        }
    }
})

module.exports = factory